import { Entry } from '@keystatic/core/reader'
import keystaticConfig from '../keystatic.config'

type ShowcaseYouTubeVideoProps = {
  videoId: Extract<
    Entry<(typeof keystaticConfig)['collections']['authors']>['showcase'][number],
    { discriminant: 'youtubeVideoId' }
  >['value']
}

export function ShowcaseYouTubeVideo({ videoId }: ShowcaseYouTubeVideoProps) {
  return (
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    ></iframe>
  )
}
