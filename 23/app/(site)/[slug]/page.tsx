import { DocumentRenderer } from '@keystatic/core/renderer'
import { notFound } from 'next/navigation'

import { reader } from '../../reader'
import Image from 'next/image'
import Link from 'next/link'
import { ShowcaseYouTubeVideo } from '../../../components/showcase-youtube-video'

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params

  const post = await reader.collections.posts.read(slug)

  if (!post) notFound()

  const authors = await Promise.all(
    post.authors.map(async (authorSlug) => ({
      ...(await reader.collections.authors.read(authorSlug)),
      slug: authorSlug,
    }))
  )

  return (
    <div>
      <h1>{post.title}</h1>
      <div>
        <DocumentRenderer
          document={await post.content()}
          componentBlocks={{
            'youtube-video': (props) => <ShowcaseYouTubeVideo videoId={props.youtubeVideoId} />,
          }}
        />
      </div>
      {authors.length > 0 && (
        <>
          <hr />
          <h2>Written by</h2>
          <ul>
            {authors.map((author) => (
              <li key={author.slug}>
                <h3>
                  <Link href={`/authors/${author.slug}`}>{author.name}</Link>
                </h3>
                <Image
                  src={author.avatar || '/images/avatars/placeholder.png'}
                  width={100}
                  height={100}
                  alt={`Avatar for ${author.name}`}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export async function generateStaticParams() {
  const slugs = await reader.collections.posts.list()

  return slugs.map((slug) => ({
    slug,
  }))
}
