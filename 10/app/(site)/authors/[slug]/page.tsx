import { notFound } from 'next/navigation'

export default async function AuthorPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  if (!slug) notFound()
  return (
    <div>
      <h1>Author page for {slug}</h1>
    </div>
  )
}
