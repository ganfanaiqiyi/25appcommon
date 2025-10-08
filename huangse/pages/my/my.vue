<template>
	<view>
		<u-status-bar></u-status-bar>
		<view class="position-relative mt-2 flex align-center bg-white"
			style="width: 680rpx;height:160rpx;border-radius: 10rpx;margin-left: 35rpx;">
			<image class="ml-4" src="@/static/images/header.jpg"
				style="width: 100rpx;height: 100rpx;border-radius: 100rpx;"></image>
			<view v-if="userInfo.vip" class="position-absolute flex-center"
				style="width: 80rpx;height: 30rpx;background-color: yellow;top:100rpx;left:50rpx;border-radius: 30rpx;">
				<text class="text-light-black font-sm font-weight-bold">VIP</text>
			</view>
			<view class="flex flex-column justify-center ml-3" style="height: 100rpx;">
				<text class="font" style="color: #222222;">{{userInfo.mobile?"":"游客_"}}{{userInfo.username}}</text>
				<text class="font-sm mt-1" style="color: #5e626e;">{{vipTime}}</text>
			</view>

			<view @click="bindUser()" v-if="!userInfo.mobile" class="flex-center position-absolute"
				style=" right:40rpx;top:60rpx;width: 130rpx;height: 45rpx;background-color: #c12b8e;border-radius: 5rpx;">
				<text class="font-sm text-white">绑定账号</text>
			</view>

		</view>

		<view class="flex flex-row justify-between mt-2 mb-3" style="width: 680rpx;height: 206rpx;margin-left: 35rpx;">
			<view @click="goVip()" class="position-relative" style="width: 325rpx;height: 206rpx;">
				<view style="width: 325rpx;height: 206rpx;">
					<image style="width: 325rpx;height: 206rpx;" src="@/static/images/vip1.png"></image>
				</view>
				<text class="position-absolute font-sm" style="color: #f7df1d;left: 20rpx;top:70rpx;">尊享会员特权</text>
				<view class="position-absolute flex-center"
					style="width: 140rpx;height: 45rpx;background-color: #5a003d;border-radius: 45rpx;left: 20rpx;top:145rpx;">
					<text class="font-sm" style="color: #f5eff2;">立即开通</text>
				</view>
			</view>

			<view @click="goShare()" class="position-relative" style="width: 325rpx;height: 206rpx;">
				<view style="width: 325rpx;height: 206rpx;">
					<image style="width: 325rpx;height: 206rpx;" src="@/static/images/vip2.png"></image>
				</view>

				<text class="position-absolute font-sm" style="color: #f7df1d;left: 20rpx;top:70rpx;">分享免费看片</text>
				<view class="position-absolute flex-center"
					style="width: 140rpx;height: 45rpx;background-color: #5a003d;border-radius: 45rpx;left: 20rpx;top:145rpx;">
					<text class="font-sm" style="color: #f5eff2;">立即分享</text>
				</view>
			</view>
		</view>

		<view class="flex flex-row align-center justify-between bg-white mb-2 rounded px-2"
			style="width: 680rpx;height: 150rpx;margin-left: 35rpx;">
			<view @click="clickRow(item)" v-for="(item,index) in rowList" :key="index"
				class="flex flex-column align-center justify-center" style="width: 100rpx;height: 150rpx;">
				<image :src="item.icon" style="height: 65rpx;" mode="heightFix"></image>
				<text class="font mt-1" style="color:#7c7c7c;">{{item.title}}</text>
			</view>
		</view>

		<view @click="clickCol(item)" v-for="(item,index) in list" :key="index"
			class="flex flex-row align-center justify-between bg-white rounded"
			style="border-bottom: 2px #f2f2f2 solid;width: 680rpx;height:100rpx;margin-left: 35rpx;padding-right: 20rpx;">
			<view class="flex align-center ml-2" style="width: 200rpx;height: 100rpx;">
				<!-- <u-icon :name="item.icon" size="55rpx" color="#c12b8e" bold></u-icon> -->
				<text class="font ml-1" style="color: #232323;">{{item.title}}</text>
			</view>
			<!-- <u-icon name="arrow-right" size="34rpx" color="#828282"></u-icon> -->
			<image src="@/static/images/arrow-right.jpg" style="width: 34rpx;height: 34rpx;"></image>
		</view>
	</view>
</template>

<script>
	import $utils from "../../libs/utils.js";
	import $http from "../../libs/http.js";
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState({
				userInfo: state => state.userInfo,
				kefu_url: state => state.appConfig.kefu_url,
				tgqun_url: state => state.appConfig.tgqun_url,
				shangwu_url: state => state.appConfig.shangwu_url,
				vipTime: state => state.userInfo.vip ? "VIP:" + $utils.formatTimestamp(state.userInfo
					.vip_expiry_time) : "你还不是会员"
			})
		},
		data() {
			return {
				rowList: [{
						title: "客服",
						icon: "../../static/images/icon0.jpg",
						url: ""
					},
					{
						title: "tg群",
						icon: "../../static/images/icon1.jpg",
						url: ""
					},
					{
						title: "收藏",
						icon: "../../static/images/icon2.jpg",
						url: "/pages/my/collect"
					},
					{
						title: "应用",
						icon: "../../static/images/icon5.jpg",
						url: "/pages/my/appcenter"
					},
				],
				list: [{
						title: "身份卡",
						icon: "file-text",
						url: "/pages/my/card"
					},
					{
						title: "VIP兑换码",
						icon: "coupon",
						url: "/pages/my/code"
					},
					{
						title: "切换账号",
						icon: "account",
						url: "/pages/my/login"
					},
					{
						title: "修改密码",
						icon: "edit-pen",
						url: "/pages/my/changePassword"
					},
					{
						title: "广告商务对接",
						icon: "coupon",
						url: ""
					},
					// {
					// 	title: "问题反馈",
					// 	icon: "question",
					// 	url: "/pages/my/question"
					// }
				]
			}
		},
		onLoad() {},
		onShow() {
			this.updateUserInfo();
		},
		methods: {
			clickRow(item) {
				if (item.title == "客服") {
					$utils.openUrl(this.kefu_url);
					return;
				} else if (item.title == "tg群") {
					$utils.openUrl(this.tgqun_url);
					return;
				} else if (item.title == "收藏") {
					if (!this.userInfo.vip) {
						uni.showToast({
							title: "VIP用户可使用",
							icon: "none"
						})
						return;
					}
				}
				uni.navigateTo({
					url: item.url
				});
			},
			bindUser() {
				uni.navigateTo({
					url: "/pages/my/bind"
				});
			},
			updateUserInfo() {
				let that = this;
				$http.request({
					url: "/api.php/addons/appbox/api/userinfo",
					method: "POST",
					header: {
						token: true
					}
				}).then((res) => {
					// console.log(res);
					that.$store.commit("updateVipInfo", res);
				}).catch((e) => {})
			},
			clickCol(item) {
				if (item.title == "广告商务对接") {
					$utils.openUrl(this.shangwu_url);
					return;
				}
				uni.navigateTo({
					url: item.url
				});
			},
			goVip() {
				uni.navigateTo({
					url: "/pages/vip/vip"
				})
			},
			goShare() {
				uni.navigateTo({
					url: "/pages/my/share"
				})
			}
		}
	}
</script>

<style>

</style>