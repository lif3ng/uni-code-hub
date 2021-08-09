import {getUserRepos} from '../services/index.js'
export default {
	namespaced: true,
	state: {
		repos: [],
		loading: true
	},
	actions:{
		async loadRepos({commit},user){
			commit('saveRepos', await getUserRepos(user))
		}
	},
	mutations:{
		saveRepos(state,repos){
			state.repos = repos;
			state.loading=false
		}
	}
}
