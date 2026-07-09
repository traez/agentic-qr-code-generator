//src\collections\Projects.ts
import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      options: ['draft', 'published', 'archived'],
      defaultValue: 'draft',
    },
    {
      name: 'metadata',
      type: 'json',
    },
  ],
}