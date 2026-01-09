import { groq } from 'next-sanity'

// Get all posts for the blog listing page
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    "author": author->{
      name,
      image
    },
    "categories": categories[]->{
      title,
      slug
    }
  }
`

// Get a single post by slug
export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    body,
    "author": author->{
      name,
      image,
      bio
    },
    "categories": categories[]->{
      title,
      slug
    },
    "headings": body[style in ["h2", "h3"]] {
      style,
      "text": children[0].text
    }
  }
`

// Get all post slugs for static generation
export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`

// Get posts by category
export const postsByCategoryQuery = groq`
  *[_type == "post" && $category in categories[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    "author": author->{
      name,
      image
    },
    "categories": categories[]->{
      title,
      slug
    }
  }
`

