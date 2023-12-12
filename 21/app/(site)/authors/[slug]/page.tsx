import { notFound } from 'next/navigation'
import Image from 'next/image'
import { reader } from '../../../reader'
import Link from 'next/link'
import { ShowcaseLink } from '../../../../components/showcase-link'
import { ShowcaseYouTubeVideo } from '../../../../components/showcase-youtube-video'

export default async function AuthorPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  if (!slug) notFound()
  const author = await reader.collections.authors.read(slug)
  if (!author) notFound()
  const allPosts = await reader.collections.posts.all()
  const authorPosts = allPosts.filter((post) => post.entry.authors.includes(slug))
  return (
    <div>
      <h1>{author.name}</h1>
      <Image
        src={author.avatar || '/images/avatars/placeholder.png'}
        width={180}
        height={180}
        alt={`Avatar for ${author.name}`}
      />
      {author.showcase.length > 0 && (
        <>
          <hr />
          <h2>Showcase</h2>
          <ul>
            {author.showcase.map((item, index) => (
              <li key={index}>
                {item.discriminant === 'link' && (
                  <ShowcaseLink url={item.value.url} label={item.value.label} />
                )}
                {item.discriminant === 'youtubeVideoId' && (
                  <ShowcaseYouTubeVideo videoId={item.value} />
                )}
              </li>
            ))}
          </ul>
        </>
      )}
      {authorPosts.length > 0 && (
        <>
          <hr />
          <h2>Posts written</h2>
          <ul>
            {authorPosts.map((post) => (
              <li key={post.slug}>
                <Link href={`/${post.slug}`}>{post.entry.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export async function generateStaticParams() {
  const authorSlugs = await reader.collections.authors.list()
  return authorSlugs.map((authorSlug) => ({ slug: authorSlug }))
}
