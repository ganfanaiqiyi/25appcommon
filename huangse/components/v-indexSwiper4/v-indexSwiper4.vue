<template>
	<view class="flex col-12 flex-row flex-wrap px-3">
		<view @click="gotoAvList(item)" v-for="(item,index) in list" :key="index" class="flex-center position-relative mt-2"
			style="width:345rpx;height: 215rpx;">
			<view class="position-absolute rounded"
				style="width: 325rpx;height: 215rpx;top:0;left:10rpx;background-color: #4e4e4e;"></view>
			<image class="position-absolute rounded" :src="item.image"
				style="width: 325rpx;height: 215rpx;top:0;left:10rpx;"></image>
			<view class="position-absolute rounded"
				style="width: 325rpx;height: 215rpx;top:0;left:10rpx;background-color: rgba(0,0,0,0.4);"></view>
			<text class="text-white text-ellipsis text-center font-weight-bold"
				style="width: 340rpx;z-index: 999;">{{item.name}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"v-indexSwiper4",
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
					url: "/pages/avList/avList?id=" + item.id + "&title=" + item.name + "&topIndex=4"
				})
			}
		}
	}
</script>

<style>

</style>