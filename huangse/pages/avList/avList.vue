<template>
	<view class="col-12">
		<v-coverList @goDetail="goDetail" v-if="!loading" :list="list"></v-coverList>
		<v-fenye @jump="jump" v-if="!loading" :data="fyData"></v-fenye>
		<u-popup :show="loading" :overlay="false" :safeAreaInsetTop="true" bgColor="transparent" mode="center">
			<image src="@/static/images/loading.gif" style="width: 200rpx;height: 200rpx;"></image>
			<text class="font text-center text-main2" style="width: 200rpx;">努力加载中</text>
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
	import $insav from "../../libs/insav.js";
	import $utils from "../../libs/utils.js";
	export default {
		computed: {
			...mapState({
				userInfo: state => state.userInfo,
				vipCount: state => {
					return $utils.getWatchCount() + "/" + state.userInfo.invite
				}
			})
		},
		data() {
			return {
				vipMsgShow: false,
				list: [],
				loading: true,
				id: 0,
				fyData: {
					totalCount: 2000,
					pageCount: 10,
					currentPage: 2,
					maxPage: 20
				},
				topIndex: 1,
				site: 1
			}
		},
		methods: {
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
				
				console.warn(item);
				console.warn($utils.getWatchCount());
				console.warn(this.userInfo.invite)
				if (!this.userInfo.vip && item.private) {
					this.vipMsgShow = true;
					return;
				}
				
				$utils.goDetail(item);
			},
			async jump(page) {
				console.log(page)
				this.loading = true;
				let shabi;
				if (this.site == 3) {
					switch (Number(this.topIndex)) {
						case 1:
							shabi = await $insav.indexList2(this.id, page, 3);
							break;
						case 2:
							shabi = await $insav.actList2(this.id, page, 3);
							break;
						case 3:
							shabi = await $insav.tagList2(this.id, page, 3);
							break;
					}
				} else {
					switch (Number(this.topIndex)) {
						case 1:
							shabi = await $insav.indexList2(this.id, page);
							break;
						case 2:
							shabi = await $insav.actList2(this.id, page);
							break;
						case 3:
							shabi = await $insav.publishList2(this.id, page);
							break;
						case 4:
							shabi = await $insav.tagList2(this.id, page);
							break;
						case 5:
							shabi = await $insav.searchList(this.id, page);
							break;
					}
				}
				this.loading = false;
				console.log(shabi.fyData)
				if (shabi) {
					this.list = shabi.list;
					this.fyData = shabi.fyData;
				}
			}
		},
		async onLoad(options) {
			uni.setNavigationBarTitle({
				title: options.title
			});

			this.id = options.id;
			this.topIndex = options.topIndex;
			let shabi;
			if (options.site == 3) {
				switch (Number(options.topIndex)) {
					case 1:
						shabi = await $insav.indexList2(this.id, 1, 3);
						break;
					case 2:
						shabi = await $insav.actList2(this.id, 1, 3);
						break;
					case 3:
						shabi = await $insav.tagList2(this.id, 1, 3);
						break;
				}
			} else {
				switch (Number(options.topIndex)) {
					case 1:
						shabi = await $insav.indexList2(this.id);
						break;
					case 2:
						shabi = await $insav.actList2(this.id);
						break;
					case 3:
						shabi = await $insav.publishList2(this.id);
						break;
					case 4:
						shabi = await $insav.tagList2(this.id);
						break;
					case 5:
						shabi = await $insav.searchList(this.id);
						break;
				}
			}

			this.loading = false;
			if (shabi) {
				this.list = shabi.list;
				this.fyData = shabi.fyData;
			}
		}
	}
</script>

<style>

</style>