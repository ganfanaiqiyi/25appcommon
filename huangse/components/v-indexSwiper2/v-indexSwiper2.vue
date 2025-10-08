<template>
	<view class="col-12" style="padding-left: 75rpx;margin-right: 75rpx;">
		<view class="flex flex-row flex-wrap" style="width: 600rpx;">
			<view class="position-relative" style="width: 200rpx;height: 200rpx;" v-for="(item,index) in list"
				:key="index">
				<view @click="gotoAvList(item)" class="flex flex-column align-center mt-2">
					<view class="flex align-center justify-center"
						style="width: 100rpx;height: 100rpx;border-radius: 100rpx;background-color: #4e4e4e;">
						<u-icon name="account-fill" size="80rpx" color="#3e3e3e"></u-icon>
					</view>
					<image class="position-absolute" :src="item.image" mode="aspectFill"
						style="width: 100rpx;height: 100rpx;top:20rpx;left:50rpx;border-radius: 100rpx;"></image>
					<text class="text-main font mt-1 text-ellipsis text-center"
						style="width: 200rpx;">{{item.name}}</text>
					<text class="font-small text-dark" style="margin-top: 5rpx;">第{{item.rank}}名</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "v-indexSwiper2",
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
			gotoAvList(item) {
				uni.navigateTo({
					url: "/pages/avList/avList?id=" + item.id + "&title=" + item.name + "&topIndex=2"
				})
			}
		}
	}
</script>

<style>

</style>