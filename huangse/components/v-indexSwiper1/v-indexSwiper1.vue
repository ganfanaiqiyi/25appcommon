<template>
	<view>
		<view v-for="(list,index0) in dataList" :key="index0">
			<view v-if="list.length>0" class="flex justify-between mt-2">
				<text class="font-weight-bold text-main2 ml-2" style="font-size: 32rpx;">{{arrTitle[index0]}}</text>
				<view v-if="index0!=0" @click="gotoAvList(index0+1)" class="mr-2">
					<u--text color="#222222" suffixIcon="arrow-right" iconStyle="font-size: 22rpx" size="22rpx"
						text="更多"></u--text>
				</view>
			</view>

			<scroll-view class="mt-2" :show-scrollbar="false" v-if="list.length>0&&index0==0" scroll-x="true"
				style="white-space: nowrap;width: 750rpx;">
				<view class="flex flex-row" :style="{'width': list[0].length*480+'rpx'}" style="width: 750rpx;">
					<view @click="goDetail(item2)" class="position-relative"
						style="width: 442rpx;margin-left: 20rpx;margin-right: 18rpx;" v-for="(item2,index2) in list[0]"
						:key="index2">
						<view class="rounded position-relative"
							style="width: 442rpx;height: 300rpx;">
							<view class="position-absolute rounded flex flex-center"
								style="width:442rpx;height: 300rpx;background-color: #4e4e4e;top:0;left:0;">
									<text class="font-weight-bold" style="font-size: 80rpx;color: #3e3e3e">黄色仓库</text>
							</view>
							<image class="rounded position-absolute" :src="item2.preview"
								style="top:0;left:0;width: 442rpx;height: 300rpx;"></image>
						</view>


						<view v-if="item2.private==2" class="flex-center position-absolute"
							style="width: 70rpx;height: 30rpx;background-color: #fcd02c;top:0rpx;left: 0rpx;border-top-left-radius: 8rpx;border-bottom-right-radius: 8rpx;">
							<text class="font-weight-bold" style="font-size: 18rpx;color: #221d09;">会员</text>
						</view>
						<view v-else class="flex-center position-absolute bg-main2"
							style="width: 70rpx;height: 30rpx;top:0rpx;left: 0rpx;border-top-left-radius: 8rpx;border-bottom-right-radius: 8rpx;">
							<text class="font-weight-bold text-white" style="font-size: 18rpx;">免费</text>
						</view>

						<text class="text-main font text-ellipsis"
							style="width:442rpx;line:1;margin-top: 5rpx;margin-left: 5rpx;">
							{{item2.title}}
						</text>
						<view class="flex flex-row align-center justify-between"
							style="width: 442rpx;height: 35rpx;margin-top: 5rpx;margin-left: 5rpx;">
							<u--text color="#7c7d80" prefixIcon="eye" iconStyle="font-size: 28rpx" size="25rpx"
								:text="item2.play_month"></u--text>
							<u--text color="#7c7d80" prefixIcon="heart" iconStyle="font-size: 28rpx" size="25rpx"
								:text="item2.collect_count"></u--text>
						</view>
					</view>
				</view>
			</scroll-view>

			<swiper v-if="list.length>0&&index0!=0" class="mt-2" @change="change($event,index0)" :current="sbCurrent1"
				style="height: 650rpx;">
				<swiper-item v-for="(item1,index1) in list" style="height: 600rpx;" :key="index1">
					<view class="flex flex-wrap" style="width: 750rpx;">
						<view @click="goDetail(item2)" class="position-relative"
							style="width: 340.5rpx;margin-left: 23rpx;" v-for="(item2,index2) in item1" :key="index2">
							<view class="rounded position-relative" style="width: 340rpx;height: 230rpx;">
								<view class="position-absolute rounded flex flex-center"
									style="width: 340rpx;height: 230rpx;background-color: #4e4e4e;top:0;left:0;">
										<text class="font-weight-bold" style="font-size: 60rpx;color: #3e3e3e">黄色仓库</text>
								</view>
								<image class="rounded position-absolute" :src="item2.preview"
									style="left:0;top:0;width: 340rpx;height: 230rpx;"></image>
							</view>
							<view v-if="item2.private==2" class="flex-center position-absolute"
								style="width: 70rpx;height: 30rpx;background-color: #fcd02c;top:0rpx;left: 0rpx;border-top-left-radius: 8rpx;border-bottom-right-radius: 8rpx;">
								<text class="font-weight-bold" style="font-size: 18rpx;color: #221d09;">会员</text>
							</view>
							<view v-else class="flex-center position-absolute bg-main2"
								style="width: 70rpx;height: 30rpx;top:0rpx;left: 0rpx;border-top-left-radius: 8rpx;border-bottom-right-radius: 8rpx;">
								<text class="font-weight-bold text-white" style="font-size: 18rpx;">免费</text>
							</view>

							<text class="text-main font text-ellipsis"
								style="width:335rpx;line:1;margin-top: 5rpx;margin-left: 5rpx;">
								{{item2.title}}
							</text>
							<view class="flex flex-row align-center justify-between"
								style="width: 330.5rpx;height: 35rpx;margin-top: 5rpx;margin-left: 5rpx;">
								<u--text color="#7c7d80" prefixIcon="eye" iconStyle="font-size: 28rpx" size="25rpx"
									:text="item2.play_month"></u--text>
								<u--text color="#7c7d80" prefixIcon="heart" iconStyle="font-size: 28rpx" size="25rpx"
									:text="item2.collect_count"></u--text>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<view v-if="index0!=0" class="flex col-12 align-center justify-center">
				<u-swiper-indicator indicatorMode="dot" :length="Math.ceil(list.length)" :current="arrCurrent[index0]"
					indicatorActiveColor="#c12b8e" indicatorInactiveColor="#888888"></u-swiper-indicator>
			</view>
		</view>
	</view>
</template>

<script>
	import $utils from "../../libs/utils.js";
	export default {
		"name": "v-indexSwiper",
		props: {
			dataList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				sbCurrent1:0,
				arrCurrent: [0, 0, 0],
				arrTitle: [
					"免费放送",
					"推荐影片",
					"热门影片"
				]
			};
		},
		methods: {
			change(event, index) {
				this.arrCurrent[index] = event.detail.current;
				this.$set(this.arrCurrent, index, event.detail.current);
			},
			gotoAvList(index) {
				let arrTitle = ["免费放送", "推荐影片", "热门影片"];
				uni.navigateTo({
					url: "/pages/avList/avList?id=" + index + "&title=" + arrTitle[index - 1] + "&topIndex=1"
				})
			},
			goDetail(item) {
				this.$emit("goDetail", item);
			}
		},
	}
</script>

<style lang="scss">

</style>