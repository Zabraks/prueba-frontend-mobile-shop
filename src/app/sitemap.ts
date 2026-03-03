import { phoneService } from '@/services/phone/phoneService';
import type { MetadataRoute } from 'next';
import { ROUTES } from '@/config/routes';
import { APP_CONFIG } from '@/config/app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const phones = await phoneService.getPhoneList();

  const phoneUrls = phones.map((phone) => ({
    url: `${APP_CONFIG.siteUrl}${ROUTES.phoneDetail(phone.id)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: APP_CONFIG.siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${APP_CONFIG.siteUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.5,
    },
    ...phoneUrls,
  ];
}
