<template>
	<view class="content">
		<my-loading v-if="loading" />
		<uni-list v-else>
			<uni-list-item v-for="({id,name,description,owner,updated_at}) in repos" :key="id" :title="name"
				:note="description|| ''" :rightText="formatDate(updated_at)"
				@click.native="openRepoPage(owner.login,name)"></uni-list-item>
		</uni-list>
		<view v-for="({id,name}) in repoList" :key="id">{{name}}</view>
	</view>
</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	import {
		getUserRepos
	} from '../../services/index.js'
	const {
		mapState,
		mapActions
	} = createNamespacedHelpers('repos')
	export default {
		data() {
			console.log(this.$mp)
			return {
				repoList: [],

			}
		},
		onLoad() {
			console.log(this)
			// getUserRepos('lif3ng').then((repos) => {
			// 	console.log(repos)
			// 	this.repoList = repos
			// })
			this.loadRepos('lif3ng')

		},
		computed:{
			...mapState(['repos','loading'])
		},
		methods: {
			...mapActions(['loadRepos']),
			formatDate(dateStr) {
				const d = new Date(dateStr)
				return d.toLocaleString()
			},
			openRepoPage(owner, repo) {
				uni.navigateTo({
					url: `../repo/repo?owner=${owner}&repo=${repo}`
				})
			}
		}
	}
</script>

<style>



</style>
