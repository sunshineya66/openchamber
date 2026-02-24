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

export default i18n;
