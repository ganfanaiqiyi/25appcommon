<template>
	<view class="flex flex-row flex-wrap">
		<text @click="gotoAvList(item)" v-for="(item,index) in list" :key="index"
			class="col-6 text-center mt-4 font-sm text-ellipsis">{{item.name}}</text>
	</view>
</template>

<script>
	export default {
		name:"v-indexSwiper3",
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			gotoAvList(item) {
				uni.navigateTo({
					url: "/pages/avList/avList?id=" + item.id + "&title=" + item.name + "&topIndex=3"
				})
			}
		}
	}
</script>

<style>

</style>