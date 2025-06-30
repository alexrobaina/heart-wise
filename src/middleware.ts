// middleware.js
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en-US', 'es-ES'],
  defaultLocale: 'en-US',
  // localePrefix: 'always',
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
