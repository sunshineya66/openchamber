"use client"

import { useTranslation } from 'react-i18next';
import { languageOptions, type SupportedLanguage } from '@/i18n';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LanguageSelectorProps {
  className?: string;
}

export function LanguageSelector({ className }: LanguageSelectorProps) {
  const { i18n } = useTranslation();

  const handleChange = (value: string) => {
    const newLang = value as SupportedLanguage;
    i18n.changeLanguage(newLang);
  };

  return (
    <Select value={i18n.language} onValueChange={handleChange}>
      <SelectTrigger className={className}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languageOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
