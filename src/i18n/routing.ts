import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en-US', 'es-ES'],

  // Used when no locale matches
  defaultLocale: 'en-US',
});

export type Locale = (typeof routing.locales)[number];

export const labels = {
  'en-US': 'English',
  'es-ES': 'Spanish',
};

export const localeFlags: Record<Locale, string> = {
  'en-US': '🇬🇧',
  'es-ES': '🇪🇸',
};

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
// ..., redirect, useRouter
export const { Link, usePathname, getPathname } = createNavigation(routing);
