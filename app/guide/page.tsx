import type { Metadata } from 'next';
import Header from '@/components/ui/header';
import HowTo from '@/components/ui/how-to';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
	(process.env.NODE_ENV === 'development' 
		? 'http://localhost:3000' 
		: 'https://aidataanalytics.io')

export const metadata: Metadata = {
	title: 'How to Use AI Analytics Directory | Guide & Best Practices',
	description:
		'Learn how to navigate the AI analytics landscape. Understand tool categorization, from AI Analysts and Semantic Layers to Data IDEs. Expert framework for evaluating AI data analytics tools.',
	keywords: [
		'AI analytics guide',
		'AI analyst tools',
		'Semantic layer',
		'AI spreadsheets',
		'Data IDEs',
		'Text to SQL',
		'AI analytics categorization',
		'Data analytics framework',
		'Business intelligence guide',
		'AI analytics best practices',
		'Qualitative AI analytics',
		'Data pipeline assistant',
	],
	robots: 'index, follow',
	alternates: {
		canonical: `${baseUrl}/guide`,
	},
	openGraph: {
		title: 'How to Use AI Analytics Directory | Guide & Best Practices',
		description: 'Learn how to navigate the AI analytics landscape. Understand tool categorization and expert framework for evaluating AI data analytics tools.',
		url: `${baseUrl}/guide`,
		siteName: 'AI Analytics Tools',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'How to Use AI Analytics Directory | Guide & Best Practices',
		description: 'Learn how to navigate the AI analytics landscape. Understand tool categorization and expert framework for evaluating AI data analytics tools.',
	},
};

export default function GuidePage() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-[#0f1116] via-[#111827] to-[#0b0d14]'>
			<Header />
			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20'>
				<HowTo />
			</main>
		</div>
	);
}


