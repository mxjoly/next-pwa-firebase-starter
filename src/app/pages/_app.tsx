import React from 'react';
import { AppProps, AppContext } from 'next/app';
import { ThemeProvider, Theme, StyleRules, makeStyles } from '@material-ui/core/styles';

import { lightTheme } from '@utils/themes';
import { allLocales, defaultLocale, localeSelector } from '~/locales.json';
import { LocaleProvider } from '@helpers/translation/context';
import { isSupportedLocale, getInitialLocale } from '@helpers/translation';

/**
 * Common styles
 * @param theme - The mui theme used
 */
const useStyles = makeStyles(
  (theme: Theme): StyleRules => ({
    container: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);

interface Props extends AppProps {
  locale: string;
}

/**
 * Function used to :
 * - Persist layout between page changes
 * - Keeping state when navigating pages
 * - Custom error handling using `componentDidCatch`
 * - Inject additional data into pages
 * - Add global CSS
 */
const App = ({ Component, pageProps, router, locale }: Props) => {
  const classes = useStyles();

  React.useEffect(() => {
    checkLocale();
  }, []);

  /**
   * Check the current locale specified by the query
   */
  const checkLocale = () => {
    const { pathname, query } = router;

    if (!allLocales.includes(locale)) {
      // Add language attribute to query
      query[localeSelector] = getInitialLocale();

      // Convert json object query to string with query format
      let queryString = '';
      for (const att in query) {
        queryString = queryString.concat(
          queryString.length === 0 ? '?' : '&',
          att + '=',
          query[att] as string
        );
      }

      // Update the url with the lang parameter
      router.replace(pathname + queryString);
    }
  }

  return (
    <LocaleProvider locale={locale}>
      <ThemeProvider theme={lightTheme}>
        <div className={classes.container}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </LocaleProvider>
  );
};

/**
 * Detect the initial locale by checking the query
 */
App.getInitialProps = async ({ Component, ctx }: AppContext) => {
  // retrieve initial props of the wrapped component
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  let locale = ctx.query[localeSelector] as string;
  // if the locale
  if (locale !== '' && locale !== undefined) {
    if (!isSupportedLocale(locale)) {
      return { pageProps, locale: undefined };
    } else {
      return { pageProps, locale };
    }
  } else {
    // The case when there isn't a lang parameter defined in the query, and the case
    // when it's defined but the length of it value is zero.
    return { pageProps, locale: locale === undefined ? defaultLocale : undefined };
  }
};

export default App;
