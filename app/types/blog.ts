import type { Image, PortableTextBlock } from 'sanity'

export interface Author {
  name: string
  image?: Image
  bio?: string
}

export interface Category {
  title: string
  slug: {
    current: string
  }
}

export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  mainImage?: Image & { alt?: string }
  excerpt: string
  publishedAt: string
  author: Author
  categories?: Category[]
  body?: PortableTextBlock[]
  headings?: {
    style: string
    text: string
  }[]
}

