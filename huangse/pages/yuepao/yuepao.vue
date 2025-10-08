<template>
	<view>
		<v-ypList :list="yuepaoAd" ></v-ypList>
		<v-cyList :list="chunyaoAd"></v-cyList>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import $utils from "../../libs/utils.js";
	export default {
		computed: {
			...mapState({
				yuepaoAd: state => state.yuepaoAd,
				chunyaoAd: state => state.chunyaoAd
			})
		},
		data() {
			return {
				
			}
		},
		onLoad() {
			// console.warn(this.yuepaoAd)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
