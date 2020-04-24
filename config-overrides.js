const path = require('path')
const { useBabelRc, addWebpackAlias, addBundleVisualizer, override } = require('customize-cra')
const rewireReactHotLoader = require('react-app-rewire-hot-loader-for-customize-cra')



module.exports = override(
    useBabelRc(),
    rewireReactHotLoader(),
    addWebpackAlias({
        '~': path.resolve(__dirname, './src'),
        '@actions': path.resolve(__dirname, './src/redux/actions')
    }),
    addBundleVisualizer({
      analyzerMode: 'static',
      reportFilename: 'report.html'
    }, true),
  )