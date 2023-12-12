import Link from 'next/link'
import { reader } from '../reader'
import './styles.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const socialLinks = await reader.singletons.socialLinks.read()
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <Link href="/">Home</Link>
          </nav>
        </header>
        {children}
        <hr />
        <footer>
          <h2>Find us on</h2>
          <ul>
            {socialLinks.twitter && (
              <li>
                <a
                  href={`https://twitter.com/${socialLinks.twitter}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Twitter
                </a>
              </li>
            )}

            {socialLinks.github && (
              <li>
                <a
                  href={`https://github.com/${socialLinks.github}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  GitHub
                </a>
              </li>
            )}

            {socialLinks.linkedin && (
              <li>
                <a
                  href={`https://linkedin.com/in/${socialLinks.linkedin}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </li>
            )}
          </ul>
        </footer>
      </body>
    </html>
  )
}
