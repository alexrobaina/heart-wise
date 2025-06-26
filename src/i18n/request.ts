import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

type Locale = (typeof routing.locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = (await requestLocale) as Locale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  // Import messages for the determined locale
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
