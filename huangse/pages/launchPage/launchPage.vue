<template>
	<view>
		<view class="flex flex-column justify-center align-center col-12 position-relative"
			:style="{ height: winHeight + 'px' }">
			<!-- <image class="position-absolute left-0 top-0" src="/static/images/bg.jpg" style="width: 750rpx;"
				:style="{height:winHeight+'px'}" mode="scaleToFill"></image> -->
			<view class="position-absolute left-0 top-0 flex flex-column justify-end align-center"
				style="width: 750rpx;background:linear-gradient(to right,#4694a7,#f33391)"
				:style="{ height: winHeight + 'px' }" mode="scaleToFill">
				<text style="color: #ffffff;font-size: 50rpx;font-style: italic;margin-bottom: 10rpx;">❤性B站❤</text>
				<text style="color: #ffffff;font-size: 50rpx;font-style: italic;margin-bottom: 10rpx;">❤每日更新❤</text>
				<text style="color: #ffffff;font-size: 50rpx;font-style: italic;margin-bottom: 10rpx;">❤免费观看❤</text>
				<text
					style="color: #ffffff;font-size: 50rpx;font-style: italic;margin-bottom: 200rpx;">❤❤❤你想要的这里都有❤❤❤</text>
			</view>
		</view>
		<u-popup :show="isError" bgColor="transparent" mode="center">
			<view class="flex flex-column align-center pt-5"
				style="width: 620rpx;height: 500rpx;background:linear-gradient(to bottom,#ffacdd,#f3fcf9);border-radius: 20rpx;;">
				<text class="font-lg mt-3 font-weight-bold">匹配未成功,请重启APP后再试!</text>
				<text class="font mt-5">或者点击下面网址获取最新包</text>
				<text class="font mt-2">永久域名,需要开VPN</text>
				<text @click="openUrl(arrAppUrl[0])" class="font mt-2" style="color:blue;">{{ arrAppUrl[0] }}</text>
				<text class="font mt-2">国内最新访问域名</text>
				<text @click="openUrl(arrAppUrl[0])" class="font mt-2" style="color:blue;">{{ arrAppUrl[1] }}</text>
			</view>
		</u-popup>
	</view>
</template>
=
<script>
import $utils from "../../libs/utils.js";
import $http from "../../libs/http.js";
import {
	checkBaseUrl,
	getBaseUrl
} from "@/libs/apiLines";
import {
	mapState
} from "vuex";
import clientConfig from "../../libs/clientConfig.js";

export default {
	computed: {
		...mapState({
			winHeight: state => state.systemInfo.windowHeight
		})
	},
	data() {
		return {
			app: null,
			isConnected: false,
			isError: false,
			arrAppUrl: [],
		}
	},
	methods: {
		openUrl(url) {
			$utils.openUrl(url);
		},
		delay(ms) {
			return new Promise(resolve => setTimeout(resolve, ms));
		},
		login() {
			let channelCode = "c1_1";
			let that = this;
			$http.request({
				url: "/api.php/addons/appbox/api/init",
				method: "POST",
				header: {
					token: false
				},
				data: {
					"deviceId": uni.getStorageSync('uuid'),
					"channelCode": channelCode,
					"version": clientConfig.version
				},
			}).then((res) => {
				console.log(res);
				that.requestSuccess(res);
			}).catch((e) => {
				console.error(e)
				this.isError = true;
				//登录失败
				return;
			})
		},
		requestSuccess(res) {
			uni.hideLoading();
			this.$store.commit("initConfig", res);
			uni.switchTab({
				url: '/pages/daohang/daohang'
			});
		},
	},
	async onLoad() {
		this.arrAppUrl.push(clientConfig.HOME_URL);
		this.arrAppUrl.push(clientConfig.HOME_URL2);
		console.log(uni.getStorageSync('uuid'))
		if (!uni.getStorageSync('uuid')) {
			$utils.buildUuid();
		}
		console.log(uni.getStorageSync('uuid'))

		uni.showLoading({
			title: "匹配最佳线路中"
		});

		this.app = getApp({
			allowDefault: true
		});
		await this.app.$onLaunched;
		this.login();
	}
}
</script>

<style></style>