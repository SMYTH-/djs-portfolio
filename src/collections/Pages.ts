import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'select',
      required: true,
      unique: true,
      options: [
        { label: 'Home', value: 'home' },
        { label: 'Work', value: 'work' },
        { label: 'About', value: 'about' },
        { label: 'Contact', value: 'contact' },
      ],
    },
    {
      name: 'heroHeadline',
      type: 'textarea',
      required: true,
    },
    {
      name: 'heroMetaName',
      type: 'text',
    },
    {
      name: 'heroMetaRole',
      type: 'text',
    },
    {
      name: 'heroMedia',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'body',
      type: 'richText',
    },
  ],
}
