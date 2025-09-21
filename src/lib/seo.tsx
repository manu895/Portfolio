import { Helmet } from 'react-helmet-async'
type Props = { title: string; description?: string; path?: string }

export function Seo({ title, description, path }: Props) {
  const url = `https://example.com${path ?? ''}`
  const desc = description ?? 'Portfolio di Manuel Bologna – web app moderne, veloci e scalabili.'
  const fullTitle = `${title} • Manuel Bologna`
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={desc} />
    </Helmet>
  )
}