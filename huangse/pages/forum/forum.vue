<template>
	<view>
		<u-status-bar></u-status-bar>
		<view style="width: 750rpx;height: 80rpx;">
			<u-tabs class="ml-1" style="width: 710rpx;" :current="indexTitle" :list="arrTabs" :activeStyle="activeStyle"
				:inactiveStyle="inactiveStyle" lineColor="#c12b8e" lineWidth="40rpx"
				itemStyle="padding-left: 10rpx;padding-right: 10rpx;margin-bottom:10rpx; " @change="changeTab">
			</u-tabs>
		</view>

		<!-- //吃瓜热点 -->
		<scroll-view v-for="(item0,index0) in dataList" :key="index0" show-scrollbar="false"
			:scroll-top="scrollTop" v-if="indexTitle==index0" class="col-12" :style="{height:scrollHeight+'px'}"
			:scroll-y="true">
			<v-bannerAd :arrAd="bannerAd"></v-bannerAd>
			<v-iconAd class="mt-2" :arrAd="iconAd"></v-iconAd>
			<view @click="goDetail(item)" v-for="(item,index) in item0" :key="index" :item="item">
				<view class="px-2">
					<view style="width: 710rpx;height: 2rpx;background-color: #dddddd;"></view>
					<text class="mt-2 mb-1 text-ellipsis font text-main" style="width: 710rpx;">{{item.title}}</text>
					<view class="flex flex-row">
						<v-image1 :hasVideo="item.hasVideo&&index2==0" v-for="(item2,index2) in item.arrCover"
							:key="index2" :image="item2"></v-image1>
					</view>
					<view class="flex flex-row align-center justify-between mt-2 mb-2" style="width: 710rpx;">
						<text class="font-sm"
							style="color:#bbbbbb;width: 350rpx;">{{`${item.member_obj?item.member_obj.nickname:""}  ${item.updated_at}`}}</text>
						<view class="flex flex-row justify-end" style="width: 200rpx;">
							<u--text color="#bbbbbb" prefixIcon="eye" iconStyle="font-size: 25rpx" size="25rpx"
								:text="item.click_num"></u--text>
							<u--text color="#bbbbbb" prefixIcon="chat" iconStyle="font-size: 25rpx" size="25rpx"
								:text="item.reply_num"></u--text>
						</view>
					</view>
				</view>
			</view>
			<v-fenye @jump="jump" v-if="!dataLoading" :data="fyData"></v-fenye>
		</scroll-view>


		<u-popup :show="dataLoading" bgColor="transparent" mode="center">
			<image src="@/static/images/loading.gif" style="width: 200rpx;height: 200rpx;"></image>
		</u-popup>

		<u-popup @close="vipMsgShow=false" :show="vipMsgShow" bgColor="transparent" mode="center">
			<view class="flex flex-column align-center"
				style="width: 620rpx;height: 300rpx;background:linear-gradient(to bottom,#f9b0de,#ffffff);border-radius: 20rpx;">
				<text class="mt-5 font-lg">提示</text>
				<text class="mt-3 font">此模块需要VIP才可访问</text>
				<view class="flex flex-row justify-between mt-5" style="width: 555rpx;height: 60rpx;">
					<view @click="vipMsgShow=false" class="flex-center bg-white"
						style="width:260rpx;height: 55rpx;border: 2rpx solid #c12b8e;border-radius: 55rpx;;">
						<text class="text-main2 font-sm">取消</text>
					</view>
					<view @click="goVip()" class="flex-center bg-main2"
						style="width:260rpx;height: 55rpx;border: 2rpx solid #c12b8e;border-radius: 55rpx;;">
						<text class="text-white font-sm">去充值</text>
					</view>
				</view>
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
				userInfo: state => state.userInfo,
				iconAd: state => state.iconAd.slice(0,15),
				bannerAd: state => state.bannerAd
			}),
			scrollHeight() {
				let systemInfo = uni.getSystemInfoSync();
				return systemInfo.windowHeight - systemInfo.statusBarHeight - uni.upx2px(80) - 5;
			}
		},
		data() {
			return {
				vipMsgShow: true,
				dataLoading: true,
				scrollTop: 0,
				indexTitle: 0,
				activeStyle: {
					color: '#c12b8e',
					fontWeight: 'bold',
					fontSize: '28rpx',
					borderRadius: '32rpx',
					paddingLeft: '15rpx',
					paddingRight: '15rpx',
					paddingTop: '10rpx',
					paddingBottom: '10rpx'
				},
				inactiveStyle: {
					color: '#222222',
					fontSize: '28rpx',
					borderRadius: '32rpx',
					paddingLeft: '15rpx',
					paddingRight: '15rpx',
					paddingTop: '10rpx',
					paddingBottom: '10rpx'
				},
				arrTabs: [{
					"name": "吃瓜热点"
				}, {
					"name": "黑料泄密"
				}, {
					"name": "反差母狗"
				}, {
					"name": "每日一晒"
				}],
				list: [

				],
				fyData: {
					totalCount: 2000,
					pageCount: 10,
					currentPage: 2,
					maxPage: 20
				},
				dataList: [
					[],
					[],
					[],
					[]
				],

			}
		},
		onShow() {
			this.vipMsgShow = false;
		},
		async onLoad() {
			this.loadData();
		},
		methods: {
			adClick(item) {
				$utils.goAd(item);
			},
			goVip() {
				uni.navigateTo({
					url: "/pages/vip/vip"
				})
			},
			goDetail(item) {
				// if (!this.userInfo.vip) {
				// 	this.vipMsgShow = true;
				// 	return;
				// }
				console.warn(item);
				this.$store.commit("setForum", item);
				uni.navigateTo({
					url: "/pages/detail3/detail3"
				})
			},
			async changeTab(item) {
				if (item.index != this.indexTitle) {
					this.indexTitle = item.index;
					this.scrollTop = this.scrollTop == 0 ? 0.0001 : 0;
					this.loadData();
				}
			},
			async loadData() {
				this.dataList = [
					[],
					[],
					[],
					[]
				];

				let index = this.indexTitle;
				this.dataLoading = true;
				if (this.dataList[index].length > 0) {
					this.dataLoading = false;
					return;
				}
				let shabi = await $maomi.indexList(index);
				if (shabi) {
					this.dataList[index] = shabi.list;
					this.fyData = shabi.fyData;
					this.$forceUpdate();
				} else {
					uni.showToast({
						title: "获取资源失败!",
						icon: "error"
					});
				}
				this.dataLoading = false;
			},
			async jump(page) {
				let index = this.indexTitle;
				this.dataLoading = true;
				let shabi = await $maomi.indexList(index, page);

				if (shabi) {
					this.dataList[index] = shabi.list;
					this.fyData = shabi.fyData;
					this.$forceUpdate();
				} else {
					uni.showToast({
						title: "获取资源失败!",
						icon: "error"
					});
				}
				this.dataLoading = false;
				this.scrollTop = this.scrollTop == 0 ? 0.0001 : 0;
			}
		}
	}
</script>

<style>

</style>