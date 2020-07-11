import { useContext } from 'react';
import { LocaleContext } from '@helpers/translation/context';
import strings from '@utils/locales';
import { defaultNamespaces } from '~/locales.json';

/**
 * Get the translation string providing a namespace, a locale, and a key
 * @param ns - A namespace
 * @param locale - The locale
 * @param key - A key to get the translation
 */
function getLocaleString(ns: string, locale: string, key: string) {
  const entry = ns + ':' + key;
  let string: string;
  if (key.includes('.')) {
    string = strings[locale][ns];
    if (string) {
      const tab = key.split('.');
      for (let i = 0; i < tab.length; i++) {
        string = string[tab[i]];
        if (!string) return entry;
      }
    }
    return string || entry;
  } else {
    return strings[locale][ns][key] || entry;
  }
}

/**
 * Hook to get translation fonction and the current locale
 */
export default function useTranslation() {
  const { locale } = useContext(LocaleContext);

  const t = (entry: string) => {
    if (!locale) {
      return entry;
    }
    const withNsFormat = /(\w+):(\w+)/;
    if (entry.match(withNsFormat)) {
      const [ns, key] = entry.split(':');
      return getLocaleString(ns, locale, key);
    }
    return getLocaleString(defaultNamespaces, locale, entry);
  };

  return { t, locale };
}
