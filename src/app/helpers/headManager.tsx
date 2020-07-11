import React from 'react';
import config from '@utils/config';
import { allLocales, localeSelector } from '~/locales.json';

/**
 * Types to use when call the head component to indicate which meta
 * tags we would like to use;
 */
export type HeadTagType = 
  'basic' | // Get all the common meta tags like the title, the description, the viewport specs
  'social' | // Get the social meta tags
  'app' | // Meta tags for progressive web app
  'icon' | // Links for the favicons and ios image
  'alternate' | // To indicate the different locale version of the page
  'all';  // Get all the meta tags above

interface CommonProps {
  title: string;
  description: string;
  canonical?: string; // https://www.yakaferci.com/link-rel-canonical/
  indexAndFollow?: boolean; // https://developers.google.com/search/reference/robots_meta_tag
}

interface BasicProps extends CommonProps {
  viewport?: string;
  copyright?: string;
}

interface SocialProps extends CommonProps {
  type?: 'website' | 'article' | 'book' | 'profile';
  cardType?: 'summary_large_image' | 'app' | 'player'; // https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/abouts-cards
  image?: string;
  imageAlt?: string;
  imageWidth?: string;
  imageHeight?: string;
  locale: string;
  site?: string; // twitter site
  siteName?: string;
  profile?: { firstname: string; lastname: string; username: string; gender?: string };
  book?: { authors: string[]; isbn: string; releaseDate: string; tags?: string[] };
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    expirationTime?: string;
    author: string;
    section?: string;
    tag?: string;
  };
}

interface AppTagProps {
  appName?: string;
  webAppCapable?: string;
  themeColor?: string;
  statusBarStyle?: string;
  // https://developers.facebook.com/docs/applinks/metadata-reference/
  appIosLinks?: { url: string; appStoreId: string; appName: string };
  appAndroidLinks?: { url: string; package: string; appName: string };
}

interface IconTagProps {
  location?: string; // where the icons are
}

interface Props extends BasicProps, SocialProps, AppTagProps, IconTagProps {
  url: string;
  path: string; // next router
}

/* ----------------------------------------------------------------------------- */

/**
 * The default props used
 */
const defaultProps = {
  VIEWPORT: 'width=device-width, initial-scale=1.0, minimum-scale=1.0',
  COPYRIGHT: '__________',
  CARD_TYPE: 'summary_large_image',
  IMAGE: '__________',
  TWITTER_SITE: '__________', // @blipee
  SITE_NAME: config.APP_NAME,
  OG_TYPE: 'website',
  APP_NAME: config.APP_NAME,
  WEB_APP_CAPABLE: 'yes',
  STATUS_BAR_STYLE: '#fff',
  THEME_COLOR: '#fff',
  ICONS_LOCATION: config.ASSETS_PATH
}

/* ----------------------------------------------------------------------------- */

/**
 * Get the elementary meta tags
 */
function getBasicTags(props: Props) {
  return (
    <React.Fragment key='basic-tags'>
      <title>{`${props.appName || defaultProps.APP_NAME} | ${props.title}`}</title>
      <meta charSet='utf-8' />
      <meta name='description' content={props.description} />
      <meta name='viewport' content={props.viewport || defaultProps.VIEWPORT} />
      <meta name='copyright' content={props.copyright || defaultProps.COPYRIGHT} />
      <link rel='manifest' href='/manifest.json' />
      <meta name='google' content='notranslate' />
      <meta httpEquiv='x-ua-compatible' content='ie=edge' />
    </React.Fragment>
  );
};

/**
 * Get the social meta tags (Open Graph and Twitter)
 * @see https://ogp.me
 * @see https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/summary
 */
function getSocialTags(props: Props) {

  const twitterTags = (
    <React.Fragment key='twitter-tags'>
      <meta name='twitter:card' content={props.cardType || defaultProps.CARD_TYPE} />
      <meta name='twitter:description' content={props.description} />
      <meta name='twitter:site' content={props.site || defaultProps.TWITTER_SITE} />
      <meta name='twitter:title' content={props.title} />
      <meta name='twitter:image' content={props.image || defaultProps.IMAGE} />
    </React.Fragment>
  );

  const openGraphTags = (
    <React.Fragment key='open-graph-tags'>
      <meta property='og:description' content={props.description} />
      <meta property='og:image' content={props.image || defaultProps.IMAGE} />
      <meta property='og:site_name' content={props.siteName || defaultProps.SITE_NAME} />
      <meta property='og:title' content={`${config.APP_NAME} | ${props.title}`} />
      <meta property='og:type' content={props.type || defaultProps.OG_TYPE} />
      <meta property='og:url' content={props.path} />
      <meta property='og:locale' content={props.locale} />
    </React.Fragment>
  );

  const profileTags = props.profile && (
    <React.Fragment key='profile-tags'>
        <meta property='profile:first_name' content={props.profile.firstname} />
        <meta property='profile:last_name' content={props.profile.lastname} />
        <meta property='profile:username' content={props.profile.username} />
        {props.profile.gender && (
          <meta property='profile:gender' content={props.profile.gender} />
        )}
      </React.Fragment>
  );

  const bookTags = props.book && (
    <React.Fragment key='book-tags'>
      {props.book.authors.map(author => {
        <meta key={author} property='book:author' content={author} />;
      })}
      <meta property='book:isbn' content={props.book.isbn} />
      <meta property='book:release_date' content={props.book.releaseDate} />
      {props.book.tags.map(tag => {
        <meta key={tag} property='book:tag' content={tag} />;
      })}
    </React.Fragment>
  );

  const articleTags = props.article && (
    <React.Fragment key='article-tags'>
      <meta property='article:author' content={props.article.author} />
      <meta property='article:published_time' content={props.article.publishedTime} />
      {props.article.modifiedTime && (
        <meta property='article:modified_time' content={props.article.modifiedTime} />
      )}
      {props.article.expirationTime && (
        <meta property='article:expiration_time' content={props.article.expirationTime} />
      )}
      {props.article.section && (
        <meta property='article:section' content={props.article.section} />
      )}
      {props.article.tag && <meta property='article:tag' content={props.article.tag} />}
    </React.Fragment>
  );
    
  return [
    twitterTags,
    openGraphTags,
    props.profile && profileTags,
    props.book && bookTags,
    props.article && articleTags
  ]
};

/**
 * Get the meta tags indicating several app properties
 */
function getAppTags(props: Props) {
  return (
    <React.Fragment key='app-tags'>
      <meta name='mobile-web-app-capable' content={props.webAppCapable || defaultProps.WEB_APP_CAPABLE} />
      <meta name='apple-mobile-web-app-capable' content={props.webAppCapable || defaultProps.WEB_APP_CAPABLE} />
      <meta name='apple-mobile-web-app-status-bar-style' content={props.statusBarStyle || defaultProps.STATUS_BAR_STYLE} />
      <meta name='apple-mobile-web-app-title' content={props.appName || defaultProps.APP_NAME} />
      <meta name='application-name' content={props.appName || defaultProps.APP_NAME} />
      <meta name='theme-color' content={props.themeColor || defaultProps.THEME_COLOR} />
      {/* <meta property='al:ios:url' content={props.appIosLinks.appStoreId} /> */}
      {/* <meta property='al:ios:app_store_id' content={props.appIosLinks.appStoreId} /> */}
      {/* <meta property='al:ios:app_name' content={props.appIosLinks.appName} /> */}
      {/* <meta property='al:android:url' content={props.appAndroidLinks.url} /> */}
      {/* <meta property='al:android:app_name' content={props.appAndroidLinks.appName} /> */}
      {/* <meta property='al:android:package' content={props.appAndroidLinks.url} /> */}
    </React.Fragment>
  );
};

/**
 * Get the meta links for the icons
 * @see https://mediag.com/blog/popular-screen-resolutions-designing-for-all/
 */
function getIconLinks(props: Props, types: HeadTagType[]) {
  const location = props.location || defaultProps.ICONS_LOCATION;
  const commonIcons = (
    <React.Fragment key='common-icon'>
      <link rel='shortcut icon' href={`${location}/favicon.ico`} />
      <link
        rel='shortcut icon'
        type='image/png'
        href={`${location}/favicon-16x16.png`}
        sizes='16x16'
      />
      <link
        rel='shortcut icon'
        type='image/png'
        href={`${location}/favicon-32x32.png`}
        sizes='32x32'
      />
      <link
        rel='mask-icon'
        href={`${location}/safari-pinned-tab.svg`}
        color={props.themeColor || defaultProps.THEME_COLOR}
      />

      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href={`${location}/apple-touch-icon.png`}
      />
    </React.Fragment>
  );

  const iosStartupImage = (
    <React.Fragment key='ios-startup-image'>
      <link
        rel='apple-touch-startup-image'
        href={`${location}/iphone5_splash.png`}
        media='(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)'
      />
      {/* iPhone 6, 7, 8 */}
      <link
        rel='apple-touch-startup-image'
        href={`${location}/iphone6_splash.png`}
        media='(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)'
      />
      {/* iPhone 6S Plus, iPhone 7 Plus, iPhone 8 Plus */}
      <link
        rel='apple-touch-startup-image'
        href={`${location}/iphoneplus_splash.png`}
        media='(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)'
      />
      <link
        rel='apple-touch-startup-image'
        href={`${location}/iphonex_splash.png`}
        media='(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)'
      />
      <link
        rel='apple-touch-startup-image'
        href={`${location}/iphonexr_splash.png`}
        media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)'
      />
      <link
        rel='apple-touch-startup-image'
        href={`${location}/iphonexsmax_splash.png`}
        media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)'
      />
      <link
        rel='apple-touch-startup-image'
        href={`${location}/ipad_splash.png`}
        media='(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)'
      />
      <link
        rel='apple-touch-startup-image'
        href={`${location}/ipadpro1_splash.png`}
        media='(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)'
      />
      <link
        rel='apple-touch-startup-image'
        href={`${location}/ipadpro2_splash.png`}
        media='(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)'
      />
      <link
        rel='apple-touch-startup-image'
        href={`${location}/ipadpro3_splash.png`}
        media='(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)'
      />
    </React.Fragment>
  );

  return [
    commonIcons,
    types.some(t => t.match(/app|all/)) && iosStartupImage
  ];
};

/**
 * Get the Material links
 * https://material-ui.com/getting-started/installation/#roboto-font
 * https://material-ui.com/getting-started/installation/#font-icons
 */
function getMaterialLinks() {
  return (
    <React.Fragment key='material-links'>
      <link
        rel='stylesheet'
        href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
      />
      <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
    </React.Fragment>
  );
};

/**
 * Get the meta links to specify the url for each language
 */
function getAlternateLinks(props: Props) {
  return (
    <React.Fragment key='alternate-links'>
      {allLocales.map(locale => (
        <link
          key={locale}
          rel='alternate'
          hrefLang={locale}
          href={props.url.replace(`[${localeSelector}]`, locale)}
        />
      ))}
    </React.Fragment>
  );
};

/**
 * Get all the head meta tags and links according to the needs
 * @param props - An object that specify the props to use
 */
export const getHeadTags = (types: HeadTagType[], props: Props) => {
  return [
    types.some(t => t.match(/basic|all/)) && getBasicTags(props),
    types.some(t => t.match(/social|all/)) && getSocialTags(props),
    types.some(t => t.match(/app|all/)) && getAppTags(props),
    types.some(t => t.match(/icon|all/)) && getIconLinks(props, types),
    types.some(t => t.match(/alternate|all/)) && getAlternateLinks(props),
    getMaterialLinks()
  ];
}