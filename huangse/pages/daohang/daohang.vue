<template>
	<view>
		<u-status-bar></u-status-bar>
		<view style="height:260rpx;">
			<v-bannerAd :arrAd="bannerAd"></v-bannerAd>
		</view>
		<scroll-view show-scrollbar="false" class="col-12" :style="{height:scrollHeight+'px'}" :scroll-y="true">
			<view v-if="iconAd.length>0" class="flex justify-between pt-2 mb-2">
				<text class="font-weight-bold text-main2 ml-2" style="font-size: 32rpx;">热门推荐</text>
			</view>
			<v-iconAd :arrAd="iconAd"></v-iconAd>
			<v-ypList :list="yuepaoAd"></v-ypList>
			<v-cyList :list="chunyaoAd"></v-cyList>
		</scroll-view>

		<u-popup :show="popShow" bgColor="transparent" mode="center">
			<view class="flex flex-column align-center position-relative" style="width: 550rpx;height: 700rpx;">
				<view class="position-absolute flex flex-center"
					style="width: 550rpx;height: 550rpx;border-radius: 120rpx;background-color: #4d4d4d;left: 0;top: 0;">
					<text class="font-weight-bold" style="font-size: 150rpx;color: #3e3e3e">性B站</text>
				</view>
				<image :src="popUrl" style="width: 550rpx;height: 550rpx;border-radius: 120rpx;"></image>
				<u-icon @click="closePop()" class="mt-5" name="close-circle" color="yellow" size="100rpx"></u-icon>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import $utils from "../../libs/utils.js";
	import $maomi from "../../libs/maomi.js";
	export default {
		computed: {
			...mapState({
				iconAd: state => state.iconAd,
				floatAd: state => state.floatAd,
				bannerAd: state => state.bannerAd,
				yuepaoAd: state => state.yuepaoAd,
				chunyaoAd: state => state.chunyaoAd
			}),
			scrollHeight() {
				let systemInfo = uni.getSystemInfoSync();
				return systemInfo.windowHeight - systemInfo.statusBarHeight - uni.upx2px(260) - 5;
			}
		},
		data() {
			return {
				popShow: false,
				popUrl: "",
				popCount: 0,
			}
		},
		onLoad() {
			if (this.floatAd && this.floatAd.length > 0) {
				this.popShow = true;
				this.popUrl = this.floatAd[this.popCount].image;
			}
		},
		methods: {
			adClick(item) {
				$utils.goAd(item);
			},
			closePop() {
				this.popCount++;
				if (this.popCount >= this.floatAd.length) {
					this.popShow = false;
					return;
				}
				this.popUrl = this.floatAd[this.popCount].image;
			},
		}
	}
</script>

<style>

</style>