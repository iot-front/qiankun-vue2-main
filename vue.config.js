const path = require('path')
// const prodUrl = 'http://data.haier.net'
const CompressionPlugin = require('compression-webpack-plugin')
const testUrl = 'http://10.205.241.37:8088' // 验收
const targetUrl = testUrl
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
	productionSourceMap: false,
	publicPath: './',
  chainWebpack: (config) => {
    config.module
        .rule('svg')
        .exclude.add(resolve('./src/components/base/svgIcon')) //注意svg的存储地址
        .end()
    config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('./src/components/base/svgIcon'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
            symbolId: 'icon-[name]'
        })
        .end()
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin').use(
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.(js|css|html)$/, // 匹配文件名
          threshold: 1024, // 小于10KB就不进行压缩
          minRatio: 0.8, // 压缩比率
          deleteOriginalAssets: false // 不删除源文件
        })
      )
    }
  },
	css: {
		loaderOptions: {
			scss: {
				additionalData: `@import "@/assets/css/var.scss";`
			}
		}
	},
	devServer: {
		port: 2000,
		open: true,
		hot: true,
		headers: {
      "Access-Control-Allow-Origin": "*"
    },
		client: {
      overlay: false // 编译错误时，取消全屏覆盖（建议关掉）
		},
		proxy: {
			'/ApiTest': {
				target: targetUrl,
				changeOrigin: true,
				secure: false,
				pathRewrite: {
					'^/ApiTest': ''
				}
			},
		}
	}
};
