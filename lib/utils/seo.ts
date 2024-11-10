import { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
}

export function generateSEO({
  title,
  description,
  keywords = [],
  image,
  noIndex = false,
}: SEOProps): Metadata {
  return {
    title,
    description,
    keywords: [
      'education',
      'school reviews',
      'courses',
      'learning',
      'community',
      'students',
      ...keywords,
    ],
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : undefined,
      type: 'website',
      locale: 'en_US',
      url: 'https://schoolsat.com',
      siteName: 'Schoolsat',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
      creator: '@schoolsat',
    },
  };
}