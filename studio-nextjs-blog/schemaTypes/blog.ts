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
      validation: (Rule) => Rule.min(1).max(100),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => {
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
      options: {hotspot: true},
    },
    {
      name: 'miniatureImage',
      title: 'Miniature Image',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      validation: (Rule) => Rule.max(500),
    },
    {
      name: 'audio',
      title: 'Archivo de audio',
      type: 'file',
      options: {accept: 'audio/mpeg'},
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'body', title: 'Body Text', type: 'text'},
            {name: 'asset', title: 'Image', type: 'image', options: {hotspot: true}},
          ],
        },
      ],
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
    },
    {
      name: 'relatedNews',
      title: 'Related News',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'blog'}]}],
    },
  ],
})
