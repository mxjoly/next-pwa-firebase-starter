import { defaultLocale, allLocales } from '~/locales.json';

/**
 * The key to use in the locale storage to store the preference of the user
 */
export const LOCALE_STORAGE_KEY = 'locale';

/**
 * Test if a given locale if supported
 * @param l - The locale tested
 */
export function isSupportedLocale(l: string) {
  return allLocales.some(locale => locale === l);
}

/**
 * Find the best language according by the browser of the client
 * @param ckeckAllSettings - Indicate whether to check all the user languages in the settings to get the best one
 */
function findNavigatorLocale(ckeckAllSettings = true) {
  if (typeof window !== 'undefined') {
    const userLangs = navigator.languages;
    if (ckeckAllSettings) {
      for (var i = 0; i < userLangs.length; i++) {
        let [lang] = userLangs[i].split('-');
        if (isSupportedLocale(lang)) return lang;
      }
    }
    if (isSupportedLocale(navigator.language)) {
      return navigator.language;
    }
  }
  return undefined;
}

/**
 * Find with the preference from the previous session
 */
function findLocalStoragelocale() {
  if (typeof window !== 'undefined') {
    const locale = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (locale && isSupportedLocale(locale)) {
      return locale;
    }
  }
  return undefined;
}

/**
 * Get the initial locale to use
 */
export function getInitialLocale() {
  // Modify this line to change the preference order to look for the locale
  return findNavigatorLocale() || findLocalStoragelocale() || defaultLocale;
}
