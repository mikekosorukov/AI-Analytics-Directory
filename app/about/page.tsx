import type { Metadata } from 'next';
import Header from '@/components/ui/header';
import About from '@/components/ui/about';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
	(process.env.NODE_ENV === 'development' 
		? 'http://localhost:3000' 
		: 'https://aidataanalytics.io')

export const metadata: Metadata = {
	title: 'About AI Analytics Hub | Founder-Curated Directory',
	description:
		'Learn about our mission to create the most comprehensive, expert-curated directory of AI analytics tools. Founded by data analytics professionals Josh Harris and Mike Kosorukov.',
	keywords: [
		'AI analytics hub',
		'AI tools directory',
		'Founder-curated',
		'Josh Harris',
		'Mike Kosorukov',
		'AnswerLayer',
		'AI analytics curation',
		'Data analytics experts',
		'AI tools community',
		'Semantic layer startup',
	],
	robots: 'index, follow',
	alternates: {
		canonical: `${baseUrl}/about`,
	},
	openGraph: {
		title: 'About AI Analytics Hub | Founder-Curated Directory',
		description: 'Learn about our mission to create the most comprehensive, expert-curated directory of AI analytics tools. Founded by data analytics professionals.',
		url: `${baseUrl}/about`,
		siteName: 'AI Analytics Tools',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'About AI Analytics Hub | Founder-Curated Directory',
		description: 'Learn about our mission to create the most comprehensive, expert-curated directory of AI analytics tools. Founded by data analytics professionals.',
	},
};

export default function AboutPage() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-[#0f1116] via-[#111827] to-[#0b0d14]'>
			<Header />
			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20'>
				<About />
			</main>
		</div>
	);
}



