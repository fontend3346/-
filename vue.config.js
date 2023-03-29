const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const {
	name
} = require('./package')
const config = require("./src/config/projectsConfig.ts");
// import config from "./projectsConfig";
let projectName = process.env.PROJECT_NAME;

function resolve (dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	productionSourceMap: false,
	...config[projectName],
	publicPath: `./`, // vue-cli3.3+新版本使用
	outputDir: "dist/" + projectName + "/",
	//   outputDir: 'dist',
	assetsDir: 'static',
	filenameHashing: true,
	devServer: {
		hot: true,
		disableHostCheck: true,
		overlay: {
			warnings: false,
			errors: true
		},
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	},
	// 自定义webpack配置
	configureWebpack: {
		resolve: {
			alias: {
				'@': resolve('src'),
				'~': resolve('packages'),

			}
		},
		output: {
			// 把子应用打包成 umd 库格式
			library: `${name}-[name]`,
			libraryTarget: 'umd',
			jsonpFunction: `webpackJsonp_${name}`
		}
	},
	// css: {
	// 	loaderOptions: {
	// 		less: {
	// 			data: `@import "./src/styles/index.less";`
	// 		}
	// 	}
	// },
	pluginOptions: {
		"style-resources-loader": {
			preProcessor: "less",
			patterns: [path.resolve(__dirname, "./src/styles/index.less")] //指定全局变量的less文件
		}
	},
	/*链式配置，解决qiankun框架加载子服务图标显示方块问题*/
	chainWebpack: config => {
		config.optimization.splitChunks({
			chunks: 'async',
			minSize: 30000,
			maxSize: 0,
			minChunks: 1,
			maxAsyncRequests: 6, // 同时也限制了同一 priority 最大分块次数
			maxInitialRequests: 4,
			automaticNameDelimiter: '~',
			cacheGroups: {
				vendors: {
					name: 'chunk-vendors',
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					chunks: 'all'
				},
				common: {
					name: 'chunk-common',
					minChunks: 2,
					priority: -20,
					chunks: 'initial',
					reuseExistingChunk: true
				}
			}
		});
		const imagesRule = config.module.rule('images');
		imagesRule.uses.clear()

		imagesRule.test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
		imagesRule.use('file-loader')
			.loader('url-loader')
			.options({
				//limit:10000,
				fallback: {
					loader: 'file-loader',
					options: {
						name: 'img/[name].[hash:8].[ext]'
					}
				}
			})

		const fontsRule = config.module.rule('fonts');
		fontsRule.uses.clear()
		fontsRule.test(/\.(eot|svg|ttf|TTF|woff|woff2|otf?)$/)
		fontsRule.use('file-loader')
			.loader('url-loader')
			.options({
				fallback: {
					loader: 'file-loader',
					options: 'fonts/[name].[hash:8].[ext]'
				}
			})

		config.plugin('CompressionPlugin').use(
			new CompressionWebpackPlugin({
				algorithm: 'gzip', // 
				test: /\.js$|\.html$|\.css$/, // 
				filename: '[path].gz[query]', // 压缩后的文件名(保持原文件名，后缀加.gz)
				minRatio: 1, // 压缩率小于1才会压缩
				threshold: 1024 * 10, // 对超过10k的数据压缩
				deleteOriginalAssets: false, // 是否删除未压缩的源文件
			})
		)

	},

}

