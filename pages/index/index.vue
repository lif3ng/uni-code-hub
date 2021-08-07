<template>
	<view class="content">
		<uni-list>
			<uni-list-item v-for="({id,name,description,owner,updated_at}) in repoList" :key="id" :title="name"
				:note="description|| ''" :rightText="formatDate(updated_at)"
				@click.native="openRepoPage(owner.login,name)"
				></uni-list-item>
		</uni-list>
		<view v-for="({id,name}) in repoList" :key="id">{{name}}</view>
	</view>
</template>

<script>
	import {
		getUserRepos
	} from '../../services/index.js'
	export default {
		data() {
			console.log(this.$mp)
			return {
				repoList: [],
				
			}
		},
		onLoad() {
			getUserRepos('lif3ng').then((repos) => {
				console.log(repos)
				this.repoList = repos
			})
		},
		methods: {
			formatDate(dateStr) {
				const d = new Date(dateStr)
				return d.toLocaleString()
			},
			openRepoPage(owner,repo){
				uni.navigateTo({
					url:`../repo/repo?owner=${owner}&repo=${repo}`
				})
			}
		}
	}
</script>

<style>



</style>
