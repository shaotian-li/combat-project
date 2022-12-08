const { defineConfig } = require('@vue/cli-service')
const isProduction = process.env.NODE_ENV === 'production'
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const plugins = []
let externals = {}
const cdn = {
	dev: {
		css: [],
		js: [],
	},
	build: {
		css: [],
		js: [
			'https://cdn.bootcdn.net/ajax/libs/axios/0.27.2/axios.min.js',
			'https://cdn.bootcss.com/vue/2.6.11/vue.min.js',
			'https://cdn.bootcss.com/vue-router/3.5.4/vue-router.min.js',
		],
	},
}

if (isProduction) {
	// 压缩 混淆 取出注释 console插件
	plugins.push(
		new UglifyJsPlugin({
			uglifyOptions: {
				output: {
					comments: false, // 去除注释
				},
				warnings: false, // 去除黄色警告,
				compress: {
					drop_console: true,
					drop_debugger: false, // 特定情况需要利用debugger防止调试
					pure_funcs: ['console.log'], // 移除console.log 避免console.error
				},
			},
		})
	)
	// 附加全局引包的引用关系
	externals = {
		// from后的 : 使用全局暴露的对象名,具体看包暴露哪个
		vue: 'Vue',
		'vue-router': 'VueRouter',
		axios: 'axios',
	}
}

module.exports = defineConfig({
	transpileDependencies: true,
	productionSourceMap: !isProduction,
	devServer: {
		proxy: {
			'/api': {
				target: 'http://1.116.64.64:5004/',
				changeOrigin: true,
			},
		},
	},
	plugins,

	configureWebpack: {
		resolve: {},
	},
})
