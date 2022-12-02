const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: true,
	devServer: {
		proxy: {
			'/api': {
				target: 'http://1.116.64.64:5004/',
				changeOrigin: true,
			},
		},
	},

	configureWebpack: {
		resolve: {},
	},
})
