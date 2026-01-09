'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: 'ai-analytics-blog',
  title: 'AI Analytics Blog',
  
  projectId,
  dataset,
  
  basePath: '/studio',
  
  plugins: [structureTool()],
  
  schema: {
    types: schemaTypes,
  },
})

