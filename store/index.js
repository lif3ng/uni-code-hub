import Vuex from 'vuex'
import Vue from 'vue'
import repos from './repos'
import ctxs from './ctxs'

Vue.use(Vuex)

const store =new  Vuex.Store({
	modules:{
		repos
	}
})
export default store