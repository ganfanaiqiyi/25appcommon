<template>
	<view>
		<view class="flex flex-row align-center ml-2 bg-white mb-2" v-for="(item,index) in iconAd" :key="index" style="width: 710rpx;height: 190rpx;border-radius: 15rpx;">
			<view class="position-relative" style="width: 135rpx;height: 135rpx;;">
				<view class="position-absolute flex flex-center"
					style="width: 135rpx;height: 135rpx;top:0;left:0;border-radius: 20rpx;background-color: #4e4e4e;">
					<text class="font-weight-bold" style="font-size: 35rpx;color: #3e3e3e">黄色仓库</text>
				</view>
					
				<image :src="item.image" style="width: 135rpx;height: 135rpx;border-radius: 20rpx;">
			</view>
			<view class="ml-2" style="width: 360rpx;height: 135rpx;">
				<text class="font-weight-bold mt-1" style="font-size: 40rpx;">{{item.title}}</text>
				<text class="mt-1" style="color: #a1a2a4;font-size: 25rpx;">{{item.desc?item.desc:'官方推荐'}}</text>
			</view>
			<view class="align-end">
				<text style="color: #192b77;">4.{{Math.floor(Math.random()*10)}}★</text>
				<view @click="adClick(item)" class="flex-center bg-main2" style="width:140rpx;height: 55rpx;border-radius: 10rpx;">
					<text class="font-weight-bold text-white" style="font-size: 25rpx;">立即下载</text>
				</view>
				<text class="font-small mt-1" style="color: #a1a2a4;" >{{Math.floor(Math.random()*5+5)}}.{{Math.floor(Math.random()*10)}}K下载</text>
			</view>
		</view>
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
				iconAd: state => state.iconAd,
			})
		},
		data() {
			return {
				
			}
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
