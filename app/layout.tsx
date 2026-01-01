import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import PostHogProvider from './posthog-provider';

const inter = Inter({ subsets: ['latin'] });

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
	(process.env.NODE_ENV === 'development' 
		? 'http://localhost:3000' 
		: 'https://aidataanalytics.io')

export const metadata: Metadata = {
	title: 'Founder-curated AI data analytics hub',
	description:
		'Explore emerging AI tools and apps for data analysis, selected and moderated by a founder. No scrape, complete database of tools, updated bi-weekly.',
	authors: [{ name: 'AI Analytics Hub' }],
	keywords: [
		'AI tools',
		'Analytics',
		'Data analysis',
		'AI software',
		'Machine learning tools',
		'Data visualization',
		'Business intelligence',
		'Analytics software',
		'Artificial intelligence',
		'Predictive analytics',
		'Data insights',
		'AI analytics platform',
	],
	robots: 'index, follow',
	alternates: {
		canonical: baseUrl,
	},
	icons: {
		icon: [
			{ url: '/images/favicon.ico' },
			{ url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
		],
		shortcut: '/images/favicon.ico',
	},
	openGraph: {
		title: 'Founder-curated AI data analytics hub',
		description: 'Explore emerging AI tools and apps for data analysis, selected and moderated by a founder. No scrape, complete database of tools, updated bi-weekly.',
		url: baseUrl,
		siteName: 'AI Analytics Tools',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Founder-curated AI data analytics hub',
		description: 'Explore emerging AI tools and apps for data analysis, selected and moderated by a founder. No scrape, complete database of tools, updated bi-weekly.',
	},
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PostHogProvider>{children}</PostHogProvider>
        <Toaster />
      </body>
    </html>
  );
}