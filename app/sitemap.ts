import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    'https://dsa-magna.vercel.app';

  const lastModified = new Date();

  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/journey', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/practice', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/interview', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/study-plan', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/design-system', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/login', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/signup', priority: 0.6, changeFrequency: 'monthly' as const },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
