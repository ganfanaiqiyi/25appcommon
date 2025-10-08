<template>
	<view>
		<u-swiper @click="adClick" class="ml-2" style="width: 710rpx;" height="240rpx" :indicator="true" :autoplay="true"
			interval="3000" indicatorActiveColor="#c12b8e" bgColor="#4d4d4d" imgMode="scaleToFill" indicatorInactiveColor="#888888" keyName="image" :list="arrAd" circular>
		</u-swiper>
	</view>
</template>

<script>
	import $utils from "../../libs/utils.js";
	export default {
		name: "v-bannerAd",
		props: {
			arrAd: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			adClick(index) {
				if(this.arrAd[index].title=="vip"){
					uni.navigateTo({
						url:"/pages/vip/vip"
					})
				}
				$utils.goAd(this.arrAd[index]);
			}
		}
	}
</script>

<style>

</style>