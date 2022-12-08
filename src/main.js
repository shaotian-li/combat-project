/*
 * @Description:
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import plugins from '@/plugins'
Vue.use(plugins)
import directives from '@/directives'
Vue.use(directives)
import common from '@/common'
Vue.use(common)
import filters from '@/filters'
Vue.use(filters)

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app')
