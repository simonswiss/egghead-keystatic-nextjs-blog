import { notFound } from 'next/navigation'
import Image from 'next/image'
import { reader } from '../../../reader'

export default async function AuthorPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  if (!slug) notFound()
  const author = await reader.collections.authors.read(slug)
  if (!author) notFound()
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
                  <a href={item.value.url} target="_blank" rel="noopener noreferrer">
                    {item.value.label}
                  </a>
                )}
                {item.discriminant === 'youtubeVideoId' && (
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${item.value}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
