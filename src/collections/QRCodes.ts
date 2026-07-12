//src\collections\QRCodes.ts
import type { CollectionConfig } from 'payload'

export const QRCodes: CollectionConfig = {
  slug: 'qr-codes',
  admin: {
    useAsTitle: 'inputText',
    defaultColumns: ['inputText', 'errorCorrectionLevel', 'createdAt', 'shareId'],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'shareId',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeValidate: [
          ({ value }) => value || crypto.randomUUID().slice(0, 8),
        ],
      },
    },
    {
      name: 'inputText',
      type: 'text',
      required: true,
      maxLength: 2000,
    },
    {
      name: 'style',
      type: 'group',
      fields: [
        {
          name: 'foregroundColor',
          type: 'text',
          defaultValue: '#000000',
          validate: (val: string | null | undefined) =>
            /^#([0-9A-Fa-f]{3}){1,2}$/.test(val || '') ||
            'Must be a valid hex color',
        },
        {
          name: 'backgroundColor',
          type: 'text',
          defaultValue: '#FFFFFF',
          validate: (val: string | null | undefined) =>
            /^#([0-9A-Fa-f]{3}){1,2}$/.test(val || '') ||
            'Must be a valid hex color',
        },
        {
          name: 'dotStyle',
          type: 'select',
          defaultValue: 'square',
          options: [
            { label: 'Square', value: 'square' },
            { label: 'Rounded', value: 'rounded' },
            { label: 'Diamond', value: 'diamond' },
          ],
        },
      ],
    },
    {
      name: 'errorCorrectionLevel',
      type: 'select',
      defaultValue: 'M',
      options: [
        { label: 'L (7%)', value: 'L' },
        { label: 'M (15%)', value: 'M' },
        { label: 'Q (25%)', value: 'Q' },
        { label: 'H (30%)', value: 'H' },
      ],
    },
    {
      name: 'transparentBackground',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        kind: { equals: 'logo' },
      },
    },
    {
      name: 'exportPng',
      type: 'upload',
      relationTo: 'media',
      admin: {
        readOnly: true,
      },
      filterOptions: {
        kind: { equals: 'qr-png' },
      },
    },
    {
      name: 'exportSvg',
      type: 'upload',
      relationTo: 'media',
      admin: {
        readOnly: true,
      },
      filterOptions: {
        kind: { equals: 'qr-svg' },
      },
    },
  ],
}
