/* eslint global-require: "off" */
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.tsx'],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
})

// preset-env config from https://bit.ly/2Pnlfg0
module.exports = {
  plugins: [
    require('tailwindcss')('./tailwind.config.js'),
    require('postcss-preset-env')({
      autoprefixer: { grid: true },
      features: {
        'nesting-rules': true
      },
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
    }),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : [])
  ]
}
