import {defineField, defineType} from 'sanity'

export const home = defineType({name: 'home', title: 'Homepage', type: 'document', fields: [
  defineField({name: 'contactHeading', title: 'Contact heading', type: 'string'}),
  defineField({name: 'contactCopy', title: 'Contact copy', type: 'text', rows: 4}),
  defineField({name: 'contacts', title: 'Contact links', type: 'array', of: [{type: 'object', fields: [
    defineField({name: 'label', title: 'Label', type: 'string'}),
    defineField({name: 'url', title: 'URL', type: 'url'}),
    defineField({name: 'visible', title: 'Visible', type: 'boolean', initialValue: true})
  ]}]})
]})

export const caseStudy = defineType({name: 'caseStudy', title: 'Case study', type: 'document', fields: [
  defineField({name: 'title', title: 'Title', type: 'string'}),
  defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}}),
  defineField({name: 'role', title: 'Role', type: 'string'}),
  defineField({name: 'summary', title: 'Summary', type: 'text', rows: 4}),
  defineField({name: 'scope', title: 'Scope', type: 'string'}),
  defineField({name: 'image', title: 'Approved image', type: 'image', options: {hotspot: true}}),
  defineField({name: 'published', title: 'Published', type: 'boolean', initialValue: false})
]})

export const schemaTypes = [home, caseStudy]
