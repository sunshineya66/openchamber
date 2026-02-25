import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import zhCN from './locales/zh-CN.json';

export const defaultNS = 'common';
export const supportedLanguages = ['en', 'zh-CN'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export const languageOptions: { value: SupportedLanguage; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'zh-CN', label: '简体中文' },
];

const reportedMissingKeys = new Set<string>();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { [defaultNS]: en },
      'zh-CN': { [defaultNS]: zhCN },
    },
    fallbackLng: 'en',
    defaultNS,
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    
    interpolation: {
      escapeValue: false,
    },
    
    react: {
      useSuspense: true,
    },
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const originalT = (i18n as any).t.bind(i18n);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(i18n as any).t = function (key: string, options?: any) {
  const result = originalT(key, options);
  if (result === key || (typeof result === 'string' && result.includes(key))) {
    const lng = i18n.language || 'en';
    const id = `${lng}:${key}`;
    if (!reportedMissingKeys.has(id)) {
      reportedMissingKeys.add(id);
      console.warn(`[i18n] Missing: ${key} (${lng})`);
    }
  }
  return result;
};

export default i18n;
