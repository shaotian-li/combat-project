function convertTime(n) {
	return n < 10 ? '0' + n : n
}

function install(Vue) {
	Vue.filter('birthday', (date) => {
		let d2 = new Date(date)
		return (
			d2.getFullYear() +
			'-' +
			convertTime(d2.getMonth()) +
			'-' +
			convertTime(d2.getDate()) +
			' ' +
			convertTime(d2.getHours()) +
			':' +
			convertTime(d2.getSeconds()) +
			':' +
			convertTime(d2.getMinutes())
		)
	})
}
export default {
	install,
}
