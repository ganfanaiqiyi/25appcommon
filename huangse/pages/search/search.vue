<template>
	<view>
		<u-status-bar></u-status-bar>
		<view class="flex flex-row justify-center align-center pt-2">
			<u-icon name="arrow-left" color="#999" style="margin-left: 10rpx;margin-right: 20rpx;" size="40rpx"
				@click="goBack()"></u-icon>
			<u-search v-model="keyword" :maxlength="10" placeholder="请输入搜索内容" searchIconColor="#999"
				placeholderColor="#999" color="#999" bgColor="#f0f0f0" height="50rpx" :focus="true"
				:actionStyle="{'color':'#999'}" style="margin-right: 30rpx;" searchIconSize="45rpx" @search="search()"
				@custom="search()"></u-search>
		</view>
		
		<view v-if='searchData.length > 0' class="flex flex-row justify-between align-center ml-5 mr-5 mt-5">
			<text style="font-size: 32rpx;line-height: 40rpx;padding-left: 5rpx;color: #999;">最近搜索</text>
			<u-icon name="trash-fill" size="32rpx" color="#999" @click="clearHistory()"></u-icon>
		</view>
		
		<view v-if='searchData.length > 0' class="flex flex-row flex-wrap ml-5 content-between"
			style="margin-top: 25rpx;width: 700rpx;">
			<text v-for='(item,index) in searchData' :key="index" class="tag"
				@click='toSearchList(item)'>{{item}}</text>
		</view>

		<view class="mt-3">
			<text v-if='hotData.length > 0' class="myfont ml-5"
				style="font-size: 32rpx;line-height: 40rpx;padding-left: 5rpx;color: #999;">热门搜索</text>
		</view>

		<view v-if='hotData.length > 0' class="flex flex-row flex-wrap ml-5 content-between"
			style="margin-top: 25rpx;width: 700rpx;">
			<view class="mb-2" v-for="(item,index) in hotData" :key="index">
				<text class="tag" @click='toSearchList(item)'>{{item}}</text>
			</view>
		</view>
		<view class="mt-3">
			<text v-if='iconAd.length > 0' class="myfont ml-5"
				style="font-size: 32rpx;line-height: 40rpx;padding-left: 5rpx;color: #999;">猜你喜欢</text>
		</view>
		<view v-if='iconAd.length > 0' class="flex flex-row flex-wrap ml-5 content-between"
			style="margin-top: 25rpx;width: 700rpx;">
			<view class="mb-2" v-for="(item,index) in iconAd" :key="index">
				<text class="tag2" @click='itemClick(item)'>{{item.title}}</text>
			</view>
		</view>

	</view>
</template>

<script>
	import $utils from "../../libs/utils.js";
	import {
		mapState
	} from 'vuex';

	export default {
		computed: {
			...mapState({
				iconAd: state => state.iconAd
			})
		},
		data() {
			return {
				keyword: "",
				//搜索过的词记录
				searchData: [],
				hotData: ["素人", "白虎", "少女", "字幕", "痴女", "同性", "中出", "口交", "AV", "美尻", "NTR", "女僕", "巨乳", "彼女", "発情"]
			}
		},
		onLoad() {},
		onShow() {
			let data = uni.getStorageSync("searchData");
			if (data) {
				this.searchData = JSON.parse(data);
			}
		},
		//监听软键盘的搜索按钮点击的
		onNavigationBarSearchInputConfirmed() {
			this.search();
		},
		methods: {
			itemClick(item) {
				$utils.goAd(item);
			},
			//点击搜索记录进入页面
			toSearchList(keyword) {
				this.keyword = keyword;
				this.addSearch();
				uni.navigateTo({
					url: "/pages/searchList/searchList?keyword=" + keyword + "&title=" + `搜索关键词:${keyword}`
				})
			},
			//判断关键词是否为空和跳转页面的
			search() {
				if (this.keyword === "") {
					return uni.showToast({
						title: "关键词不能为空",
						icon: "none"
					})
				} else {
					this.toSearchList(this.keyword);
				}
				uni.hideKeyboard();
				this.addSearch();
			},
			//记录最近搜索词
			addSearch() {
				let idx = this.searchData.indexOf(this.keyword);
				if (idx < 0) {
					this.searchData.unshift(this.keyword);
				} else {
					this.searchData.unshift(this.searchData.splice(idx, 1)[0]);
				}
				console.error(this.keyword)
				console.error(this.searchData)
				uni.setStorageSync("searchData", JSON.stringify(this.searchData));
			},
			//清除搜索记录
			clearHistory() {
				uni.showModal({
					title: "重要提示",
					content: '是否要清除搜索记录',
					cancelText: '取消',
					confirmText: "确定",
					success: (res) => {
						if (res.confirm) {
							uni.removeStorage({
								key: "searchData"
							})
							this.searchData = [];
						}
					}
				})
			},
			goBack() {
				uni.navigateBack();
			}
		}
	}
</script>

<style scoped>
	.tag {
		font-size: 28rpx;
		padding: 12rpx 24rpx;
		background-color: #f0f0f0;
		color: #999;
		border-radius: 52rpx;
		margin-right: 50rpx;
		margin-bottom: 20rpx;
	}

	.tag2 {
		font-size: 28rpx;
		padding: 12rpx 24rpx;
		background-color: #fc8833;
		color: #ffffff;
		border-radius: 52rpx;
		margin-right: 50rpx;
		margin-bottom: 20rpx;
	}
</style>