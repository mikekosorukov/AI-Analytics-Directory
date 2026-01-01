import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // Use environment variable or fallback based on environment
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
    (process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : 'https://aidataanalytics.io')
  
  // Remove trailing slash if present to avoid double slashes
  const cleanBaseUrl = baseUrl.replace(/\/$/, '')
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${cleanBaseUrl}/sitemap.xml`,
  }
}

