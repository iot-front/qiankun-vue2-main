const user = {
	state: {
		userDinfo: {}
	},
	mutations: {
		upUserDinfo(state, info) {
			state.userDinfo = info || {}
		}
	}
}
export default user
