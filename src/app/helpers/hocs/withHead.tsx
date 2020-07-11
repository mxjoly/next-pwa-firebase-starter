import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { localeSelector, pageKeys } from '~/locales.json';
import { HeadTagType, getHeadTags } from '@helpers/headManager';
import config from '@utils/config';
import useTranslation from '@helpers/hooks/useTranslation';

/**
 * Get the corresponding page key on the locale resources
 * @param pathname - The router pathname
 */
function getPageKeyInLocales(pathname: string) {
  try {
    let key = pageKeys[pathname];
    if (key === undefined)
      throw new Error();
    return key;
  } catch(err) {
    console.error(`No key was found for the pathname : ${pathname}`);
  };
};

/**
 * Wrap a page to add the document head data
 * @param WrappedPage - A next page
 * @param types - A tab that contains the types of tag we'll use
 */
export default (WrappedPage: NextPage<any>, types: HeadTagType[] = []) => {
  const WithHead: NextPage<any> = ({ pageProps }) => {
    const { t, locale } = useTranslation();
    const { pathname } = useRouter();

    const start = config.APP_PROTOCOL + '://' + config.APP_HOST;
    const key = getPageKeyInLocales(pathname);

    // we use [...] as generic name to alternate it in the different locales
    const url = start + pathname + `?${localeSelector}=[${localeSelector}]`;
    const path = start + pathname;
    const title = t(`common:${key}.meta.title`);
    const description = t(`common:${key}.meta.description`);

    return (
      <>
        <Head>
          {getHeadTags(types, { url, path, title, description, locale })}
        </Head>
        <WrappedPage {...pageProps} />
      </>
    )
  };

  WithHead.getInitialProps = async ctx => {
    // retrieve initial props of the wrapped component
    let pageProps = {};
    if (WrappedPage.getInitialProps) {
      pageProps = await WrappedPage.getInitialProps(ctx)
    }
    return { pageProps };
  }

  return WithHead;
};
