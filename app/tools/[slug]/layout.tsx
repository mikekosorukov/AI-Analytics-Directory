import { Metadata } from 'next'
import { supabase } from '@/lib/supabaseClient'

type Props = {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  // Fetch tool data
  const { data: tool, error } = await supabase
    .from('tools_updated')
    .select('tool_name, long_description, url')
    .eq('slug', slug)
    .eq('rls', true)
    .single()

  if (error || !tool) {
    return {
      title: 'Tool Not Found',
      description: 'The requested tool could not be found.',
    }
  }

  // Get base URL from environment or fallback
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
    (process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : 'https://aidataanalytics.io')

  const canonicalUrl = `${baseUrl}/tools/${slug}`

  return {
    title: `${tool.tool_name} - AI Analytics Tool Review`,
    description: tool.long_description || `Explore ${tool.tool_name} and discover if it's the right AI analytics tool for your needs.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${tool.tool_name} - AI Analytics Tool Review`,
      description: tool.long_description || `Explore ${tool.tool_name} and discover if it's the right AI analytics tool for your needs.`,
      url: canonicalUrl,
      siteName: 'AI Analytics Tools',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.tool_name} - AI Analytics Tool Review`,
      description: tool.long_description || `Explore ${tool.tool_name} and discover if it's the right AI analytics tool for your needs.`,
    },
  }
}

export default function ToolLayout({ children }: Props) {
  return <>{children}</>
}

