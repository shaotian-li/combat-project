import AsideMenu from '@/components/AsideMenu.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import Dropdown from '@/components/Dropdown.vue'
import FormCreate from '@/components/FormCreate.vue' // 封装表单

// 自动引入 require.context('../components/xxx', true, /\.vue$/)

const install = (Vue) => {
	Vue.component(AsideMenu.name, AsideMenu)
	Vue.component(Breadcrumb.name, Breadcrumb)
	Vue.component(Dropdown.name, Dropdown)
	Vue.component(FormCreate.name, FormCreate)
}

export default {
	install,
}
