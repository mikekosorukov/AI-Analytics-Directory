import { client } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'
import { Post } from '@/app/types/blog'
import Header from '@/components/ui/header'
import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'
import { Calendar, Clock, User } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | AI Analytics Hub',
  description: 'Insights, guides, and deep dives into AI analytics tools, data analysis, and the evolving landscape of AI-powered business intelligence.',
}

// Calculate reading time from word count
function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200
  const wordCount = text.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

// Format date
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const revalidate = 60 // Revalidate every minute

export default async function BlogPage() {
  const posts: Post[] = await client.fetch(postsQuery)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1116] via-[#111827] to-[#0b0d14]">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white">
            <span className="bg-[#6366F1] py-1 px-3">Blog</span>
          </h1>
          <p className="text-[#BFC5D7] text-lg sm:text-xl max-w-2xl mx-auto">
            Deep dives into AI analytics, industry insights, and practical guides 
            to help you navigate the evolving data landscape.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#111827] border border-white/10 flex items-center justify-center">
              <Calendar className="w-10 h-10 text-[#6366F1]" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-3">
              Coming Soon
            </h2>
            <p className="text-[#BFC5D7] max-w-md mx-auto">
              We&apos;re working on insightful content. Check back soon for our first articles!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group relative rounded-xl overflow-hidden bg-[#111827]/70 border border-white/10 hover:border-[#6366f1] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col"
              >
                {/* Featured Image */}
                <div className="relative h-48 w-full overflow-hidden bg-[#1a1f2e]">
                  {post.mainImage ? (
                    <Image
                      src={urlForImage(post.mainImage).width(600).height(400).url()}
                      alt={post.mainImage.alt || post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-[#6366F1]/20 flex items-center justify-center">
                        <span className="text-3xl">📊</span>
                      </div>
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Categories */}
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.categories.map((category) => (
                        <span
                          key={category.slug.current}
                          className="text-xs px-2 py-1 rounded-full bg-[#6366F1]/20 text-[#6366F1] border border-[#6366F1]/30"
                        >
                          {category.title}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#6366F1] transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-[#BFC5D7] text-sm mb-4 line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-[#777D8F] pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      {post.author?.image ? (
                        <Image
                          src={urlForImage(post.author.image).width(32).height(32).url()}
                          alt={post.author.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                      <span>{post.author?.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{calculateReadingTime(post.excerpt)} min read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

