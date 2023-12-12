import { config, collection, fields, component, singleton } from '@keystatic/core'
import { ShowcaseYouTubeVideo } from './components/showcase-youtube-video'

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: {
      name: 'Keystatic mini course',
      mark: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          height={24}
          width={24}
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
          />
        </svg>
      ),
    },
    navigation: {
      writing: ['posts', 'authors'],
      'Footer links': ['socialLinks'],
    },
  },
  collections: {
    posts: collection({
      label: 'Posts',
      entryLayout: 'content',
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
          componentBlocks: {
            'youtube-video': component({
              label: 'YouTube Video',
              schema: {
                youtubeVideoId: fields.text({
                  label: 'YouTube Video ID',
                  description: 'The ID of the YouTube video (not the full URL)',
                  validation: {
                    length: {
                      min: 1,
                    },
                  },
                }),
              },
              preview: (props) =>
                props.fields.youtubeVideoId.value ? (
                  <ShowcaseYouTubeVideo videoId={props.fields.youtubeVideoId.value} />
                ) : (
                  <p>Please enter a YouTube video ID</p>
                ),
            }),
          },
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
  singletons: {
    socialLinks: singleton({
      label: 'Social Links',
      path: 'content/social-links',
      schema: {
        twitter: fields.text({
          label: 'Twitter',
          description: 'The twitter handle (not full URL!)',
        }),
        github: fields.text({
          label: 'GitHub',
          description: 'The GitHub username (not full URL!)',
        }),
        linkedin: fields.text({
          label: 'LinkedIn',
          description: 'The LinkedIn ID (not full URL!)',
        }),
      },
    }),
  },
})
