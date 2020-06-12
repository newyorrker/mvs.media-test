// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
    css: {
      loaderOptions: {
        css: {
          modules: {
            localIdentName: '[local]-[hash:3]'
          },
          localsConvention: 'camelCaseOnly'
        }
      },
      requireModuleExtension: true
    },
    devServer: {
        hot: true,
        port: 9901,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    runtimeCompiler: true,
    publicPath: './',
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src")
            }
        }
    }
}