import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    'https://dsa-magna.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/journey',
        '/practice',
        '/practice/*',
        '/interview',
        '/study-plan',
        '/design-system',
        '/login',
        '/signup',
      ],
      disallow: [
        '/dashboard',
        '/settings',
        '/profile',
        '/api/*',
        '/session-summary',
        '/auth/*',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
