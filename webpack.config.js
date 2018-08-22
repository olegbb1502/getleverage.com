module.exports = {
  entry: `${__dirname}/src/client.js`,
  output: {
    filename: './static/bundle.js'
  },
  node: {
    __dirname: true,
    fs: 'empty'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  externals: {
    spin: true
  }
}
