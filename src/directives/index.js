import dragTable from './dragTable'

const install = (Vue) => {
	Vue.directive(dragTable.name, dragTable.handler)
}

export default {
	install,
}
