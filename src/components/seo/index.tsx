import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql as gql } from 'gatsby'

interface SEOProps {
  title?: string
  description?: string
  url?: string
}

const query = gql`
  query siteMetadataQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
  }
`

export default function SEO(props: SEOProps) {
  const data = useStaticQuery(query)

  const defaults = data.site.siteMetadata

  const title = props.title || defaults.title
  const description = props.description || defaults.description
  const url = props.url || defaults.siteUrl

  return (
    <Helmet>
      <title>{title}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />

      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  )
}
