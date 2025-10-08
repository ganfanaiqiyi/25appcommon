<template>
	<view>
		<view class="col-12" :style="{height:statusBarHeight+'px'}"></view>
		<view class="position-relative col-12" style="height: 680rpx;">
			<view v-if="showLoading||showCon" @click="back()" class="position-absolute"
				style="left: 10px;z-index: 9999;" :style="{top:10+'px'}">
				<u-icon size="40rpx" color="#ffffff" name="arrow-left" bold></u-icon>
			</view>
			<view class="col-12" style="height: 680rpx;z-index: 99;background-color: #ffffff;">
				<yingbing-video :title="videoInfo.title" :autoplay="true" ref="video" :poster="videoInfo.preview"
					:fullscreenShow="true" style="width: 750rpx;height:420rpx" :src="sbUrl" objectFit="contain"
					@loadeddata="loadeddata" :controls="showCon" @fullscreenChange="" @playing="" @controlsChange="">
					<view class="position-absolute"
						style="width: 750rpx;height:420rpx;background-color: rgba(0,0,0,0.5);" v-if="showLoading">
						<image src="../../static/images/loading.gif"
							style="width:100rpx;height:100rpx;left:325rpx;top: 160rpx;">
						</image>
					</view>
					<view class="position-absolute"
						style="width: 750rpx;height:420rpx;background-color: rgba(0,0,0,0.5);" v-if="showPlay">
						<image @click="playVideo()" src="@/static/images/play.png"
							style="width:200rpx;height:200rpx;left:275rpx;top: 110rpx;">
						</image>
					</view>
				</yingbing-video>
				<u-tabs class="mt-1 col-12" :list="arrTabs" :activeStyle="{
												    color: '#c12b8e',
												    fontWeight: 'bold',
												    transform: 'scale(1.05)'
												}" :inactiveStyle="{
												    color: '#222222'
												}" lineColor="#c12b8e" lineWidth="60" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"
					@click=""></u-tabs>
				<view class="ml-3 mt-1" style="width: 650rpx;height: 80rpx;">
					<u--text :lines="2" lineHeight="40rpx" size="30rpx" :text="videoInfo.title"></u--text>
				</view>
				<view class="col-12 flex flex-row align-center" style="margin-left: 30rpx;margin-top: 10rpx;">
					<v-likeBtn icon="heart-fill" iconSelect="heart-fill" :count="likeCount" :selected="isLiked"
						@btnClick="clickLike()"></v-likeBtn>
					<v-likeBtn class="ml-3" icon="star-fill" iconSelect="star-fill" :count="collectCount"
						:selected="isCollected" @btnClick="clickCollect()"></v-likeBtn>
				</view>
				<text class="font-weight-bold text-main2 ml-2" style="font-size: 32rpx;">热门推荐</text>
			</view>
		</view>
		<scroll-view show-scrollbar="false" class="col-12" :style="{height:scrollHeight+'px'}" :scroll-y="true">
			<v-iconAd class="mt-2" :arrAd="iconAd"></v-iconAd>
			<v-coverList @goDetail="goDetail" :list="list"></v-coverList>
		</scroll-view>
		
		<u-popup @close="vipMsgShow=false" :show="vipMsgShow" bgColor="transparent" mode="center" closeable>
			<view class="flex flex-column align-center"
				style="width: 620rpx;height: 450rpx;background:linear-gradient(to bottom,#f9b0de,#ffffff);border-radius: 20rpx;">
				<text class="mt-5 font-lg">提示</text>
				<text class="mt-3 font" style="color: #222222;">成为VIP可无限观看全场视频</text>
				<text class="mt-3 font-sm" style="color: #666666;">邀请好友可增加VIP视频观看次数</text>
				<text class="mt-1 font-sm" style="color: #666666;">今日vip视频观看数{{vipCount}}</text>
				<view class="flex flex-row justify-between mt-5" style="width: 555rpx;height: 60rpx;">
					<view @click="goShare()" class="flex flex-center bg-white"
						style="width:260rpx;height: 55rpx;border: 2rpx solid #c12b8e;border-radius: 55rpx;;">
						<text class="text-main2 font-sm">去邀请</text>
					</view>
					<view @click="goVip()" class="flex flex-center bg-main2"
						style="width:260rpx;height: 55rpx;border: 2rpx solid #c12b8e;border-radius: 55rpx;;">
						<text class="text-white font-sm">去充值</text>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import $insav from "../../libs/insav.js";
	import $utils from "../../libs/utils.js";
	import $http from "../../libs/http.js";
	import {
		mapState
	} from "vuex";

	export default {
		computed: {
			...mapState({
				iconAd: state => state.iconAd.slice(0,10),
				userInfo: state => state.userInfo,
				vipCount:state=>{
					return $utils.getWatchCount()+"/"+state.userInfo.invite
				}
			})
		},
		data() {
			return {
				vipMsgShow:false,
				statusBarHeight: 0,
				likeCount: 999,
				collectCount: 999,
				isLiked: false,
				isCollected: false,
				arrTabs: [{
					name: '视频详情'
				}],
				scrollHeight: 0,
				showCon: false,
				showLoading: true,
				showPlay: false,
				videoInfo: {
				},
				sbUrl: "",
				list: [],
				collectData: []
			}
		},
		async onLoad() {
			this.statusBarHeight = $utils.getSystemInfo().statusBarHeight;
			this.scrollHeight = $utils.getSystemInfo().windowHeight - uni.upx2px(680) - $utils.getSystemInfo()
				.statusBarHeight - 5;
			let videoInfo = uni.getStorageSync("videoInfo");
			this.videoInfo = JSON.parse(videoInfo);
			console.log(this.videoInfo);
			this.collectCount = Math.floor(Math.random() * 4000) + 6000;; //this.videoInfo.collect_count;
			this.likeCount = Math.floor(Math.random() * 5000) + 5000;
			this.isCollected = Boolean(uni.getStorageSync('connect' + this.videoInfo.id));
			this.isLiked = Boolean(uni.getStorageSync('like' + this.videoInfo.id));

			if (uni.getStorageSync("collectData")) {
				try {
					this.collectData = JSON.parse(uni.getStorageSync("collectData"));
				} catch (e) {

				}
			}

			if (this.videoInfo.private) {
				//vip视频请求后台
				this.sbUrl = await $http.getVideoUrl(this.videoInfo.id, this.videoInfo.site);
			} else {
				//免费视频请求ins
				this.sbUrl = await $insav.getUrl(this.videoInfo.id, this.videoInfo.site);
			}

			console.log(this.sbUrl);

			let list = await $insav.recommend(Math.ceil(Math.random() * 100), 1);
			if (list) {
				this.list = list;
			}
			
		},
		methods: {
			goShare() {
				this.vipMsgShow = false;
				uni.redirectTo({
					url: "/pages/my/share"
				})
			},
			goVip() {
				this.vipMsgShow = false;
				uni.redirectTo({
					url: "/pages/vip/vip"
				})
			},
			goDetail(item) {
				if (item.private == 0 || $utils.getWatchCount() < this.userInfo.invite) {
					$utils.goDetail(item,1,true);
					return;
				}
				
				console.warn(item);
				console.warn($utils.getWatchCount());
				console.warn(this.userInfo.invite)
				if (!this.userInfo.vip && item.private) {
					this.vipMsgShow = true;
					return;
				}
				$utils.goDetail(item,1,true);
			},
			adClick(item) {
				$utils.goAd(item);
			},
			clickLike() {
				this.likeCount += this.isLiked ? -1 : 1;
				this.isLiked = !this.isLiked;
				uni.setStorageSync('like' + this.videoInfo.id, this.isLiked ? "true" : "");
			},
			clickCollect() {
				this.collectCount += this.isCollected ? -1 : 1;
				this.isCollected = !this.isCollected;
				uni.setStorageSync('collect' + this.videoInfo.id, this.isCollected ? "true" : "");

				if (this.isCollected) {
					this.collectData.push(this.videoInfo);
				} else {
					for (let i = 0; i < this.collectData.length; i++) {
						if (this.collectData[i].id == this.videoInfo.id) {
							this.collectData.splice(i, 1);
							break;
						}
					}
				}
				console.log(this.collectData);
				uni.setStorageSync("collectData",JSON.stringify(this.collectData));
			},
			loadeddata() {
				console.warn($utils.getWatchCount());
				this.showLoading = false;
				this.showCon = true;
				if(this.videoInfo.private>0){
					$utils.addWatchCount();
				}
				// this.showPlay = true;
			},
			playVideo() {
				this.showPlay = false;
				this.$refs.video.play();
				this.showCon = true;
			},
			back() {
				uni.navigateBack();
			}
		}
	}
</script>

<style scoped>
	{
		page: #f2f2f2;
	}
</style>