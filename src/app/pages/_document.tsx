import React from 'react';
import { URL } from 'url';
import Document, { DocumentContext, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';

import config from '@utils/config';
import { defaultLocale, localeSelector } from '~/locales.json';

interface Props {
  locale: string;
}

/**
 * Minify the styles in production
 */
let prefixer, cleanCSS;
if (process.env.NODE_ENV === 'production') {
  const postcss = require('postcss');
  const autoprefixer = require('autoprefixer');
  const CleanCSS = require('clean-css');

  prefixer = postcss([autoprefixer]);
  cleanCSS = new CleanCSS();
}

/**
 * Class used to extend the DOM (server side)
 */
export default class extends Document<Props> {
  /**
   * Render app and page and get the context of the page with collected side effects.
   * @param ctx - The document context
   * @see https://github.com/mui-org/material-ui/blob/24cdb5bbcb2015fadeea2de80266c66a7c2a3858/docs/pages/_document.js
   */
  static async getInitialProps(ctx: DocumentContext) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        // Wraps the React node in a provider element. It collects the style sheets during the
        // rendering so they can be later sent to the client.
        enhanceApp: App => props => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    const url = new URL(config.APP_PROTOCOL + '://' + config.APP_HOST + ctx.req.url);
    const locale = url.searchParams.get(localeSelector) || defaultLocale;

    let css = sheets.toString();
    // It might be undefined, e.g. after an error.
    if (css && process.env.NODE_ENV === 'production') {
      const result = await prefixer.process(css, { from: undefined });
      css = result.css;
      css = cleanCSS.minify(css).styles;
    }

    return {
      ...initialProps,
      locale,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [
        ...React.Children.toArray(initialProps.styles),
        <style
          id='jss-server-side'
          key='jss-server-side'
          dangerouslySetInnerHTML={{ __html: css }}
        />,
      ],
    };
  }

  render() {
    return (
      <html lang={this.props.locale}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
