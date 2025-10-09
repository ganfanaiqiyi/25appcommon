<template>
	<view class="flex flex-wrap col-12">
		<view @click="goDetail(item)" class="position-relative" style="width: 340.5rpx;margin-left: 23rpx;"
			v-for="(item,index) in list" :key="index">
			<view class="position-absolute rounded flex flex-center"
				style="width: 340.5rpx;height: 230rpx;background-color: #4e4e4e;top:0;left:0;">
					<text class="font-weight-bold" style="font-size: 60rpx;color: #3e3e3e">黄色仓库</text>
			</view>
			<image class="rounded" mode="aspectFill" :src="item.preview"
				style=" width: 340rpx;height: 230rpx;"></image>
			<view v-if="item.private==2" class="flex-center position-absolute"
				style="width: 70rpx;height: 30rpx;background-color: #fcd02c;top:0rpx;left: 0rpx;border-top-left-radius: 8rpx;border-bottom-right-radius: 8rpx;">
				<text class="font-weight-bold" style="font-size: 18rpx;color: #221d09;">会员</text>
			</view>
			<view v-else class="flex-center position-absolute bg-main2"
				style="width: 70rpx;height: 30rpx;top:0rpx;left: 0rpx;border-top-left-radius: 8rpx;border-bottom-right-radius: 8rpx;">
				<text class="font-weight-bold text-white" style="font-size: 18rpx;">免费</text>
			</view>

			<text class="text-main font text-ellipsis" style="width:335rpx;margin-top: 5rpx;margin-left: 5rpx;display: block;">
				{{item.title}}
			</text>
			<view class="flex flex-row align-center justify-between"
				style="width: 330.5rpx;height: 35rpx;margin-top: 5rpx;margin-left: 5rpx;">
				<u--text color="#7c7d80" prefixIcon="eye" iconStyle="font-size: 28rpx" size="25rpx"
					:text="item.play_month?0:item.play_month"></u--text>
				<u--text color="#7c7d80" prefixIcon="heart" iconStyle="font-size: 28rpx" size="25rpx"
					:text="item.collect_count"></u--text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "v-coverList",
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		data() {
			return {

			};
		},
		methods: {
			goDetail(item) {
				this.$emit("goDetail", item);
			}
		}
	}
</script>

<style>

</style>