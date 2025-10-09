<template>
	<view>
		<u-status-bar></u-status-bar>
		<view style="width: 750rpx;height: 190rpx;">
			<view class="flex flex-row align-center mt-2" style="height:80rpx;">
				<view class="ml-2 flex flex-center" style="width: 170rpx;height: 70rpx;">
					<text class="font-weight-bold" style="color:#eb2d2d ;font-size: 45rpx;font-style: italic;">❤黄色仓库</text>
				</view>
				
				<view @click="goSearch()" class="flex ml-2 flex-row align-center bg-white"
					style="width: 510rpx;height: 60rpx;border-radius: 60rpx;">
					<text class="ml-2 text-main" style="font-size: 28rpx;line-height: 60rpx;">搜索关键词</text>
				</view>
			</view>
			<u-tabs class="ml-1 mt-2" style="width: 710rpx;" :current="indexTitle" :list="arrTabs"
				:activeStyle="activeStyle" :inactiveStyle="inactiveStyle" lineColor="#c12b8e" lineWidth="20rpx"
				itemStyle="padding-left: 10rpx;padding-right: 10rpx;margin-bottom:10rpx; " @change="changeTab">
			</u-tabs>
		</view>

		<!-- //首页 -->
		<scroll-view show-scrollbar="false" @scroll="scrollPage" :scroll-top="scrollTop" v-if="indexTitle==0"
			class="col-12" :style="{height:scrollHeight+'px'}" :scroll-y="true">
			<v-bannerAd :arrAd="bannerAd"></v-bannerAd>
			<v-iconAd class="mt-2" :arrAd="iconAd"></v-iconAd>
			<v-indexSwiper1 @goDetail="goDetail" :dataList="dataList0"></v-indexSwiper1>
		</scroll-view>
		<!-- //女优 -->
		<scroll-view @scroll="scrollPage" :scroll-top="scrollTop" show-scrollbar="false" v-if="indexTitle==1"
			class="col-12" :style="{height:scrollHeight+'px'}" :scroll-y="true">
			<v-indexSwiper2 :list="dataList1"></v-indexSwiper2>
			<v-fenye @jump="jump" v-if="!dataLoading" :data="fyData"></v-fenye>
		</scroll-view>
		<!-- //片商 -->
		<scroll-view @scroll="scrollPage" :scroll-top="scrollTop" show-scrollbar="false" v-if="indexTitle==2"
			class="col-12" :style="{height:scrollHeight+'px'}" :scroll-y="true">
			<v-indexSwiper3 :list="dataList2"></v-indexSwiper3>
			<v-fenye @jump="jump" v-if="!dataLoading" :data="fyData"></v-fenye>
		</scroll-view>
		<!-- //主题 -->
		<scroll-view @scroll="scrollPage" :scroll-top="scrollTop" show-scrollbar="false" v-if="indexTitle==3"
			class="col-12" :style="{height:scrollHeight+'px'}" :scroll-y="true">
			<v-indexSwiper4 :list="dataList3"></v-indexSwiper4>
			<v-fenye @jump="jump" v-if="!dataLoading" :data="fyData"></v-fenye>
		</scroll-view>
		<!-- //动漫 -->
		<!-- 		<scroll-view @scroll="scrollPage" :scroll-top="scrollTop" show-scrollbar="false" v-if="indexTitle==4"
			class="col-12" :style="{height:scrollHeight+'px'}" :scroll-y="true">
			<v-coverList @goDetail="goDetail" :list="dataList4"></v-coverList>
			<v-fenye @jump="jump" v-if="!dataLoading" :data="fyData"></v-fenye>
		</scroll-view> -->
		<!-- //热度 -->
		<scroll-view @scroll="scrollPage" :scroll-top="scrollTop" show-scrollbar="false" v-if="indexTitle==4"
			class="col-12" :style="{height:scrollHeight+'px'}" :scroll-y="true">
			<v-coverList @goDetail="goDetail" :list="dataList4"></v-coverList>
			<v-fenye @jump="jump" v-if="!dataLoading" :data="fyData"></v-fenye>
		</scroll-view>
		<!-- //新片 -->
		<scroll-view @scroll="scrollPage" :scroll-top="scrollTop" show-scrollbar="false" v-if="indexTitle==5"
			class="col-12" :style="{height:scrollHeight+'px'}" :scroll-y="true">
			<v-coverList @goDetail="goDetail" :list="dataList5"></v-coverList>
			<v-fenye @jump="jump" v-if="!dataLoading" :data="fyData"></v-fenye>
		</scroll-view>
		<!-- //中字 -->
		<scroll-view @scroll="scrollPage" :scroll-top="scrollTop" show-scrollbar="false" v-if="indexTitle==6"
			class="col-12" :style="{height:scrollHeight+'px'}" :scroll-y="true">
			<v-coverList @goDetail="goDetail" :list="dataList6"></v-coverList>
			<v-fenye @jump="jump" v-if="!dataLoading" :data="fyData"></v-fenye>
		</scroll-view>

		<u-popup :show="dataLoading" bgColor="transparent" mode="center">
			<image src="@/static/images/loading.gif" style="width: 200rpx;height: 200rpx;"></image>
		</u-popup>



		<u-popup @close="vipMsgShow=false" :show="vipMsgShow" bgColor="transparent" mode="center" closeable>
			<view class="flex flex-column align-center"
				style="width: 620rpx;height: 450rpx;background:linear-gradient(to bottom,#f9b0de,#ffffff);border-radius: 20rpx;">
				<text class="mt-5 font-lg">提示</text>
				<text class="mt-3 font" style="color: #222222;">成为VIP可无限观看全场视频</text>
				<text class="mt-3 font-sm" style="color: #666666;">邀请好友可增加VIP视频观看次数</text>
				<text class="mt-1 font-sm" style="color: #666666;">今日vip视频观看数{{vipCount}}</text>
				<view class="flex flex-row justify-between mt-5" style="width: 555rpx;height: 60rpx;">
					<view @click="goShare()" class="flex-center bg-white"
						style="width:260rpx;height: 55rpx;border: 2rpx solid #c12b8e;border-radius: 55rpx;;">
						<text class="text-main2 font-sm">去邀请</text>
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
	import $insav from "../../libs/insav.js";
	export default {
		computed: {
			...mapState({
				userInfo: state => state.userInfo,
				kefu_url: state => state.appConfig.kefu_url,
				iconAd: state => state.iconAd.slice(0, 15),
				floatAd: state => state.floatAd,
				bannerAd: state => state.bannerAd,
				vipCount: state => {
					return $utils.getWatchCount() + "/" + state.userInfo.invite
				}
			}),
			scrollHeight() {
				let systemInfo = uni.getSystemInfoSync();
				return systemInfo.windowHeight - systemInfo.statusBarHeight - uni.upx2px(190) - 5;
			}
		},
		data() {
			return {
				vipMsgShow: false,
				dataLoading: true,
				scrollTop: 0,
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
				popUrl: "",
				indexTitle: 0,
				list: [

				],
				arrTabs: [{
					"name": "首页"
				}, {
					"name": "女优"
				}, {
					"name": "片商"
				}, {
					"name": "主题"
				}, {
					"name": "热度"
				}, {
					"name": "新片"
				}, {
					"name": "中字"
				}],
				dataList0: [
					[],
					[],
					[]
				],
				dataList1: [],
				dataList2: [],
				dataList3: [],
				dataList4: [],
				dataList5: [],
				dataList6: [],
				fyData: {
					totalCount: 2000,
					pageCount: 10,
					currentPage: 2,
					maxPage: 20
				}
			}
		},
		onShow() {

		},
		onLoad() {
			this.loadData();
		},
		methods: {
			adClick(item) {
				$utils.goAd(item);
			},
			goShare() {
				this.vipMsgShow = false;
				uni.navigateTo({
					url: "/pages/my/share"
				})
			},
			goVip() {
				this.vipMsgShow = false;
				uni.navigateTo({
					url: "/pages/vip/vip"
				})
			},
			goDetail(item) {
				if (item.private == 0 || $utils.getWatchCount() < this.userInfo.invite) {
					$utils.goDetail(item);
					return;
				}

				// console.warn(item);
				// console.warn($utils.getWatchCount());
				// console.warn(this.userInfo.invite)
				if (!this.userInfo.vip && item.private) {
					this.vipMsgShow = true;
					return;
				}

				$utils.goDetail(item);
			},
			goSearch() {
				uni.navigateTo({
					url: "/pages/search/search"
				})
			},
			scrollPage(event) {
				// this.scrollTop = event.detail.scrollTop;
			},
			async changeTab(item) {
				if (item.index != this.indexTitle) {
					this.indexTitle = item.index;
					this.scrollTop = this.scrollTop == 0 ? 0.0001 : 0;
					this.loadData();
				}
			},
			async jump(page) {
				let index = this.indexTitle;
				this.dataLoading = true;
				if (index == 1) {
					let shabi = await $insav.actList(page);
					if (shabi.list) {
						this.dataList1 = shabi.list;
						this.fyData = shabi.fyData;
					}
				} else if (index == 2) {
					let shabi = await $insav.publishList(page);
					if (shabi.list) {
						this.dataList2 = shabi.list;
						this.fyData = shabi.fyData;
					}
				} else if (index == 3) {
					let shabi = await $insav.tagList(page);
					if (shabi.list) {
						this.dataList3 = shabi.list;
						this.fyData = shabi.fyData;
					}
				} else if (index == 4) {
					let shabi = await $insav.hotList(page);
					if (shabi.list) {
						this.dataList4 = shabi.list;
						this.fyData = shabi.fyData;
					}
				} else if (index == 5) {
					let shabi = await $insav.newList(page);
					if (shabi.list) {
						this.dataList5 = shabi.list;
						this.fyData = shabi.fyData;
					}
				} else if (index == 6) {
					let shabi = await $insav.zwList(page);
					if (shabi.list) {
						this.dataList6 = shabi.list;
						this.fyData = shabi.fyData;
					}
				}
				this.dataLoading = false;
			},
			async loadData(page = 1) {
				this.dataList0 = [
					[],
					[],
					[]
				];
				this.dataList1 = [];
				this.dataList2 = [];
				this.dataList3 = [];
				this.dataList4 = [];
				this.dataList5 = [];
				this.dataList6 = [];
				
				
				let index = this.indexTitle;
				this.dataLoading = true;
				if (index == 0) {
					if (this.dataList0[0].length > 0 || this.dataList0[1].length > 0 || this.dataList0[2].length > 0) {
						this.dataLoading = false;
						this.$forceUpdate();
						return;
					}
					let dataList0 = [
						[],
						[],
						[]
					];
					let list1 = await $insav.indexList(3);
					let b = false;
					if (list1.length > 0) {
						dataList0[0] = list1;
						b = true;
					}
					let list2 = await $insav.indexList(2);
					if (list2.length > 0) {
						dataList0[1] = list2;
						b = true;
					}
					let list3 = await $insav.indexList(1);
					if (list3.length > 0) {
						dataList0[2] = list3;
						b = true;
					}
					if (b) {
						this.dataList0 = dataList0;
					} else {
						uni.showToast({
							title: "获取资源失败,请稍后重试!",
							icon: "none"
						});
					}
				} else if (index == 1) {
					if (this.dataList1.length > 0) {
						this.dataLoading = false;
						this.$forceUpdate();
						return;
					}
					let shabi = await $insav.actList(page);
					if (shabi.list) {
						this.dataList1 = shabi.list;
						this.fyData = shabi.fyData;
					} else {
						uni.showToast({
							title: "获取资源失败,请稍后重试!",
							icon: "none"
						});
					}
				} else if (index == 2) {
					if (this.dataList2.length > 0) {
						this.dataLoading = false;
						this.$forceUpdate();
						return;
					}
					let shabi = await $insav.publishList(page);
					if (shabi.list) {
						this.dataList2 = shabi.list;
						this.fyData = shabi.fyData;
					} else {
						uni.showToast({
							title: "获取资源失败,请稍后重试!",
							icon: "none"
						});
					}
				} else if (index == 3) {
					if (this.dataList3.length > 0) {
						this.dataLoading = false;
						this.$forceUpdate();
						return;
					}
					let shabi = await $insav.tagList(page);
					if (shabi.list) {
						this.dataList3 = shabi.list;
						this.fyData = shabi.fyData;
					} else {
						uni.showToast({
							title: "获取资源失败,请稍后重试!",
							icon: "none"
						});
					}
				} else if (index == 4) {
					if (this.dataList4.length > 0) {
						this.dataLoading = false;
						this.$forceUpdate();
						return;
					}
					let shabi = await $insav.hotList(page);
					if (shabi.list) {
						this.dataList4 = shabi.list;
						this.fyData = shabi.fyData;
					} else {
						uni.showToast({
							title: "获取资源失败,请稍后重试!",
							icon: "none"
						});
					}
				} else if (index == 5) {
					if (this.dataList5.length > 0) {
						this.dataLoading = false;
						this.$forceUpdate();
						return;
					}
					let shabi = await $insav.newList(page);
					if (shabi.list) {
						this.dataList5 = shabi.list;
						this.fyData = shabi.fyData;
					} else {
						uni.showToast({
							title: "获取资源失败,请稍后重试!",
							icon: "none"
						});
					}
				} else if (index == 6) {
					if (this.dataList6.length > 0) {
						this.dataLoading = false;
						this.$forceUpdate();
						return;
					}
					let shabi = await $insav.zwList(page);
					if (shabi.list) {
						this.dataList6 = shabi.list;
						this.fyData = shabi.fyData;
					} else {
						uni.showToast({
							title: "获取资源失败,请稍后重试!",
							icon: "none"
						});
					}
				}
				this.$forceUpdate();
				this.dataLoading = false;
			}
		}
	}
</script>

<style scoped>

</style>