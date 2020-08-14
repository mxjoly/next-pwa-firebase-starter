import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { localeSelector } from '~/locales.json';
import { getInitialLocale } from '@helpers/translation';

/**
 * We don't need error page, so we redirect the user to the home page
 */
const Error = () => {
  const router = useRouter();
  useEffect(() => {
    const { query } = router;
    if (query[localeSelector]) {
      router.replace(`/?${localeSelector}=${getInitialLocale()}`);
    } else {
      router.replace('/');
    }
  });
  return (
    <Head>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  );
};

export default Error;
