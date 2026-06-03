import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Artikel',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Tajuk' } }),
        date: fields.date({ label: 'Tarikh' }),
        excerpt: fields.text({ label: 'Ringkasan', multiline: true }),
        featuredImage: fields.url({ label: 'Gambar Featured' }),
        categories: fields.array(
          fields.text({ label: 'Kategori' }),
          { label: 'Kategori', itemLabel: props => props.value }
        ),
        author: fields.text({ label: 'Penulis' }),
        content: fields.markdoc({ label: 'Kandungan' }),
      },
    }),
  },
});