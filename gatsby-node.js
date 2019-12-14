exports.resolvableExtensions = () => ['.ts', '.tsx']

exports.onCreateWebpackConfig = ({ actions, loaders }) => {
  const jsLoader = loaders.js()

  if (!jsLoader) {
    return
  }

  actions.setWebpackConfig({
    resolve: {
      modules: ['src', 'static', 'node_modules']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: jsLoader
        }
      ]
    }
  })
}
