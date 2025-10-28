import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'AI Analytics Tools - Find the Right Tool for the Job',
	description:
		'Explore the emerging AI analytics landscape and discover the perfect tools for your data analysis needs.',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}