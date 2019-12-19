/* eslint @typescript-eslint/camelcase: off */
module.exports = {
  siteMetadata: {
    title: 'Mr. Rubik',
    description: 'An easy game to no one',
    siteUrl: 'https://react-three-fiber-101.now.sh'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Mr. Rubik',
        short_name: 'Mr. Rubik',
        start_url: '/',
        background_color: '#000',
        theme_color: '#000',
        display: 'standalone',
        icon: 'static/favicon.svg'
      }
    },
    'gatsby-plugin-postcss',
    'gatsby-plugin-svgr-loader',
    'gatsby-plugin-typescript'
  ]
}
