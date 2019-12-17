const path = require('path')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: ['node_modules', 'static'],
      alias: {
        '~': path.resolve('src')
      }
    }
  })
}
