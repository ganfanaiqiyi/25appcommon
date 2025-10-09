<template>
	<view class="flex flex-row flex-wrap" style="width: 725rpx;margin-left: 25rpx;">
		<view style="width: 140rpx;" class="flex flex-column mb-2 align-center position-relative"
			@click="adClick(item)" v-for="(item,index) in arrAd" :key="index">
			<view class="position-relative" style="width: 120rpx;height: 120rpx;">
				<view class="position-absolute flex flex-center"
					style="width: 120rpx;height: 120rpx;top:0;left:0;border-radius: 20rpx;background-color: #4e4e4e;">
					<text class="font-weight-bold" style="font-size: 35rpx;color: #3e3e3e">黄色仓库</text>
				</view>
				<image :src="item.image" style="width: 120rpx;height: 120rpx;border-radius: 20rpx;">
			</view>
			<text class="mt-1 font-weight-bold font-sm"
				style="color:#232323;height: 30rpx;line-height: 30rpx;width: 140rpx;text-align: center;">{{item.title}}</text>
		</view>
	</view>
</template>

<script>
	import $utils from "../../libs/utils.js";
	export default {
		name: "v-iconAd",
		props: {
			arrAd: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				isError: false
			};
		},
		methods: {
			adClick(item) {
				$utils.goAd(item);
			}
		}
	}
</script>

<style>

</style>