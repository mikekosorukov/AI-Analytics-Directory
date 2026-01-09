import { client } from '@/sanity/lib/client'
import { postQuery, postSlugsQuery } from '@/sanity/lib/queries'
import { Post } from '@/app/types/blog'
import Header from '@/components/ui/header'
import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/sanity/lib/image'
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

// Generate static params for all posts
export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(postSlugsQuery)
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post: Post | null = await client.fetch(postQuery, { slug })

  if (!post) {
    return {
      title: 'Post Not Found | AI Analytics Hub',
    }
  }

  return {
    title: `${post.title} | AI Analytics Hub`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
    },
  }
}

// Calculate reading time
function calculateReadingTime(body: unknown[]): number {
  const wordsPerMinute = 200
  let wordCount = 0

  const extractText = (blocks: unknown[]): string => {
    return blocks
      .map((block) => {
        if (typeof block === 'object' && block !== null && 'children' in block) {
          const children = (block as { children?: unknown[] }).children
          if (Array.isArray(children)) {
            return children
              .map((child) => {
                if (typeof child === 'object' && child !== null && 'text' in child) {
                  return (child as { text: string }).text
                }
                return ''
              })
              .join(' ')
          }
        }
        return ''
      })
      .join(' ')
  }

  if (body) {
    const text = extractText(body)
    wordCount = text.split(/\s+/).filter(Boolean).length
  }

  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

// Format date
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Portable Text components for rendering rich content
const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => {
      const text = value.children?.[0]?.text || ''
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      return (
        <h2 id={id} className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-4 scroll-mt-24">
          {children}
        </h2>
      )
    },
    h3: ({ children, value }) => {
      const text = value.children?.[0]?.text || ''
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      return (
        <h3 id={id} className="text-xl sm:text-2xl font-semibold text-white mt-8 mb-3 scroll-mt-24">
          {children}
        </h3>
      )
    },
    h4: ({ children }) => (
      <h4 className="text-lg sm:text-xl font-semibold text-white mt-6 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-[#BFC5D7] leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#6366F1] pl-6 py-2 my-6 italic text-[#A7ABCB] bg-[#111827]/50 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-[#BFC5D7] ml-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-[#BFC5D7] ml-4">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-[#1a1f2e] text-[#E67F44] px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#6366F1] hover:text-[#818cf8] underline underline-offset-2 transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden">
            <Image
              src={urlForImage(value).width(1200).url()}
              alt={value.alt || 'Blog image'}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-[#777D8F] mt-3">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    code: ({ value }) => (
      <div className="my-6">
        {value.filename && (
          <div className="bg-[#1a1f2e] border border-white/10 border-b-0 rounded-t-lg px-4 py-2 text-sm text-[#777D8F] font-mono">
            {value.filename}
          </div>
        )}
        <pre
          className={`bg-[#0f1116] border border-white/10 p-4 overflow-x-auto text-sm ${
            value.filename ? 'rounded-b-lg' : 'rounded-lg'
          }`}
        >
          <code className="text-[#BFC5D7] font-mono whitespace-pre">{value.code}</code>
        </pre>
      </div>
    ),
  },
}

// Table of Contents component
function TableOfContents({ headings }: { headings: Post['headings'] }) {
  if (!headings || headings.length === 0) return null

  return (
    <nav className="bg-[#111827]/50 border border-white/10 rounded-xl p-6 mb-8">
      <h3 className="text-lg font-semibold text-white mb-4">Table of Contents</h3>
      <ul className="space-y-2">
        {headings.map((heading, index) => {
          const id = heading.text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
          return (
            <li
              key={index}
              className={`${heading.style === 'h3' ? 'ml-4' : ''}`}
            >
              <a
                href={`#${id}`}
                className="text-[#BFC5D7] hover:text-[#6366F1] transition-colors text-sm"
              >
                {heading.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export const revalidate = 60

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post: Post | null = await client.fetch(postQuery, { slug })

  if (!post) {
    notFound()
  }

  const readingTime = post.body ? calculateReadingTime(post.body) : 1

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1116] via-[#111827] to-[#0b0d14]">
      <Header />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#6366F1] hover:text-[#818cf8] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category) => (
                <span
                  key={category.slug.current}
                  className="text-xs px-3 py-1 rounded-full bg-[#6366F1]/20 text-[#6366F1] border border-[#6366F1]/30"
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-[#A7ABCB] mb-8">{post.excerpt}</p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-[#777D8F] pb-8 border-b border-white/10">
            {/* Author */}
            <div className="flex items-center gap-3">
              {post.author?.image ? (
                <Image
                  src={urlForImage(post.author.image).width(48).height(48).url()}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#6366F1]/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-[#6366F1]" />
                </div>
              )}
              <div>
                <p className="text-white font-medium">{post.author?.name}</p>
                {post.author?.bio && (
                  <p className="text-sm text-[#777D8F] line-clamp-1">{post.author.bio}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.mainImage && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-12">
            <Image
              src={urlForImage(post.mainImage).width(1200).height(675).url()}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Table of Contents */}
        <TableOfContents headings={post.headings} />

        {/* Content */}
        <div className="prose prose-lg prose-invert max-w-none">
          {post.body && (
            <PortableText value={post.body} components={portableTextComponents} />
          )}
        </div>

        {/* Author Bio (at bottom) */}
        {post.author?.bio && (
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex items-start gap-4 bg-[#111827]/50 border border-white/10 rounded-xl p-6">
              {post.author.image ? (
                <Image
                  src={urlForImage(post.author.image).width(80).height(80).url()}
                  alt={post.author.name}
                  width={64}
                  height={64}
                  className="rounded-full shrink-0"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-[#6366F1]/20 flex items-center justify-center shrink-0">
                  <User className="w-8 h-8 text-[#6366F1]" />
                </div>
              )}
              <div>
                <p className="text-sm text-[#6366F1] mb-1">Written by</p>
                <p className="text-xl font-semibold text-white mb-2">{post.author.name}</p>
                <p className="text-[#BFC5D7]">{post.author.bio}</p>
              </div>
            </div>
          </div>
        )}
      </article>
    </div>
  )
}

