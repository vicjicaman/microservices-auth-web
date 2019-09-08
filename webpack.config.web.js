const path = require('path')

module.exports = {
  entry: './src/web/index.js',
  output: {
    path: path.join(__dirname, '/dist/web'),
    filename: 'index.js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  }
}
