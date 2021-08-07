<template>
	<view>
		repo page {{repoPath}}
	</view>
</template>

<script>
	import {
		getRepo
	} from '../../services/index.js'
	export default {
		onLoad({
			owner,
			repo
		}) {
			if (owner)
				this.repoPath = `${owner}/${repo}`
		},
		data() {
			console.log('data', this.$mp)
			return {
				repoPath: 'lif3ng/lif3ng',
				clone_url: ''
			}
		},
		mounted() {
			getRepo(this.repoPath).then((data) => {
				console.log(data)
				this.clone_url = data.clone_url
			})
		},
		methods: {

		}
	}
</script>

<style>

</style>
