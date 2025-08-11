import {defineType} from 'sanity'

export default defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(100),
    },
    {
      name: 'focusTitle',
      title: 'Focus Title',
      type: 'string',

      validation: (Rule) => Rule.min(5).max(100),
    },
    {
      name: 'continueTitle',
      title: 'Continue Title',
      type: 'string',
      validation: (Rule) => Rule.min(5).max(100),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc: {title?: string; focusTitle?: string; continueTitle?: string}) => {
          const title = doc.title ?? ''
          const focus = doc.focusTitle ?? ''
          const cont = doc.continueTitle ?? ''
          return `${title} ${focus} ${cont}`
        },
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
    },
  ],
})
