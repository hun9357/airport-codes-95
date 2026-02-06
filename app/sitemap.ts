import { MetadataRoute } from 'next';
import airports from '@/data/airports.json';
import countries from '@/data/countries.json';

const SITE_URL = 'https://airport-codes-95.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const airportUrls = airports.map((airport) => ({
    url: `${SITE_URL}/airport/${airport.iata}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const countryUrls = countries.map((country) => ({
    url: `${SITE_URL}/country/${country.code}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...airportUrls,
    ...countryUrls,
  ];
}
