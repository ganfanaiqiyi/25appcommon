<template>
	<view>
		<view class="flex flex-column justify-center align-center col-12 position-relative"
			:style="{ height: winHeight + 'px' }">
			<image class="position-absolute left-0 top-0" src="/static/images/bg.png" style="width: 750rpx;"
				:style="{height:winHeight+'px'}" mode="scaleToFill"></image>
			
		</view>

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
					uni.showToast({
						title:'连接失败！请重试'
					})
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