import { config, collection, fields } from '@keystatic/core'

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
        authors: fields.array(
          fields.relationship({
            label: 'Authors',
            collection: 'authors',
            validation: {
              isRequired: true,
            },
          }),
          {
            label: 'Authors',
            itemLabel: (item) => item.value || 'Please select an author',
          }
        ),
      },
    }),
    authors: collection({
      label: 'Authors',
      slugField: 'name',
      path: 'content/authors/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        avatar: fields.image({
          label: 'Avatar',
          directory: 'public/images/avatars',
          publicPath: '/images/avatars',
        }),
        showcase: fields.blocks(
          {
            link: {
              label: 'Link',
              schema: fields.object({
                label: fields.text({
                  label: 'Label',
                  validation: {
                    length: {
                      min: 1,
                    },
                  },
                }),
                url: fields.url({ label: 'URL' }),
              }),
              itemLabel: (item) => 'Link: ' + item.fields.label.value,
            },
            youtubeVideoId: {
              label: 'YouTube Video ID',
              schema: fields.text({
                label: 'YouTube Video ID',
                validation: {
                  length: {
                    min: 1,
                  },
                },
              }),
              itemLabel: (item) => 'YouTube ID: ' + item.value,
            },
          },
          {
            label: 'Showcase',
          }
        ),
      },
    }),
  },
})
