exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: ['src', 'static', 'node_modules']
    }
  })
}
