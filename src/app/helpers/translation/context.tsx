import React from 'react';
import { useRouter } from 'next/router';

import { defaultLocale, localeSelector } from '~/locales.json';
import { isSupportedLocale } from '@helpers/translation';

interface ContextProps {
  readonly locale: string;
  readonly setLocale: (locale: string) => void;
}

export const LocaleContext = React.createContext<ContextProps>({
  locale: defaultLocale,
  setLocale: () => null,
});

export const LocaleProvider: React.FC<{ locale: string }> = props => {
  const [locale, setLocale] = React.useState(props.locale);
  const { query } = useRouter();
  const curLocale = query[localeSelector] as string;

  // store the preference
  React.useEffect(() => {
    if (locale !== localStorage.getItem(localeSelector)) {
      localStorage.setItem(localeSelector, locale);
    }
  }, [locale]);

  // sync locale value on client-side route changes
  React.useEffect(() => {
    if (isSupportedLocale(curLocale) && locale !== curLocale) {
      setLocale(curLocale);
    }
  }, [curLocale, locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {props.children}
    </LocaleContext.Provider>
  );
};
