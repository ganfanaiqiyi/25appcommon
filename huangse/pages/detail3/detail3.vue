<template>
	<view class="flex flex-column align-center">
		<text class="ml-2 font-weight-bold" style="width: 710rpx;font-size: 40rpx;color:#353455;">
			{{forumDetail.title}}
		</text>
		<text class="mt-1 ml-2" style="color: #757575;">2025-04-12</text>
	<!-- 	<text class="ml-2 mb-2" style="width: 710rpx;font-size: 30rpx;color:#353455;">
			{{forumDetail.content}}
		</text>
		 -->
		<!-- <text class="ml-2 mb-2" style="width: 710rpx;font-size: 30rpx;color:#353455;" :v-htm="forumDetail.content"></text> -->
		<rich-text class="ml-2 mb-2" style="width: 710rpx;" :nodes="forumDetail.content"></rich-text>

		<yingbing-video v-if="forumDetail.video_cover" title="" :autoplay="false" ref="video" poster="" :fullscreenShow="true"
			style="width: 750rpx;height:420rpx" :src="sbUrl" objectFit="contain" @loadeddata="loadeddata"
			:controls="showCon" @fullscreenChange="" @playing="" @controlsChange="">
			<view class="position-absolute" style="width: 750rpx;height:420rpx;background-color: rgba(0,0,0,0.5);"
				v-if="showLoading">
				<image src="../../static/images/loading.gif"
					style="width:100rpx;height:100rpx;left:325rpx;top: 160rpx;">
				</image>
			</view>
			<view class="position-absolute" style="width: 750rpx;height:420rpx;background-color: rgba(0,0,0,0.5);"
				v-if="showPlay">
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
		<v-image2 class="mt-2" v-for="(item,index) in forumDetail.photo_albums" :key="index" :image="item"></v-image2>
	</view>
</template>

<script>
	import { MD5 } from "crypto-js";
import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState({
				forumDetail: state => state.forumDetail
			})
		},
		data() {
			return {
				sbUrl: "",
				showCon: false,
				showLoading: true,
				showPlay: false,
				arrTabs: [{
					name: '帖子详情'
				}],
				clientConfig:{}
			}
		},
		onLoad() {
			this.clientConfig = JSON.parse(uni.getStorageSync('mmConfig'));
			if (this.forumDetail.cut_slices_obj && this.forumDetail.cut_slices_obj[0] && this.forumDetail.cut_slices_obj[0]
				.play_url) {
				this.sbUrl = this.clientConfig.mmVideoUrl + this.forumDetail.cut_slices_obj[0].play_url+this.addVidKeyParam(this.forumDetail.cut_slices_obj[0].play_url);
			}
		},
		methods: {
			loadeddata() {
				this.showLoading = false;
				this.showPlay = true;
			},
			playVideo() {
				this.showPlay = false;
				this.$refs.video.play();
				this.showCon = true;
			},
			addVidKeyParam(e) {
				let s = this.clientConfig.mmVidKey,
					o, a = Math.floor(Date.now() / 1e3),
					n = uni.getStorageSync("timestamp");
				n && a - parseInt(n) < 300 ? o = parseInt(n) + 5400 : (o = a + 5400, uni.setStorageSync("timestamp", a
					.toString()));
				let i = o.toString(10),
					c = e.replace(/^https?:\/\/[^\/]+/, "");
				c = c.replace("//", "/");
				let u = s + c + i;
				return "?wsSecret=" + MD5(u).toString() + "&wsTime=" + i
			}
		},
	}
</script>

<style>

</style>