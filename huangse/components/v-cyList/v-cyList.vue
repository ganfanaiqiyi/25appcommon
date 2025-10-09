<template>
	<view class="" style="">
		<view v-if="list.length>0" class="flex justify-between pt-2 mb-2">
			<text class="font-weight-bold text-main2 ml-2" style="font-size: 32rpx;">春药商城</text>
		</view>
		<view class="flex flex-row flex-wrap col-12">
			<view @click="goDetail(item)" class="flex flex-column align-center position-relative mb-2 pt-1"
				style="width: 350rpx;height:650rpx;margin-left: 16rpx;border-radius: 15rpx;background-color: #242829;"
				v-for="(item,index) in list" :key="index">
				<view class="position-relative"
					style="width: 330rpx;height: 460rpx;border-radius: 15rpx;">
					
					<view class="position-absolute flex flex-center"
						style="width: 330rpx;height: 460rpx;top:0;left:0;border-radius: 20rpx;background-color: #4e4e4e;">
						<text class="font-weight-bold" style="font-size: 35rpx;color: #3e3e3e">黄色仓库</text>
					</view>
					
					<image :src="item.image" mode="aspectFill"
						style="width: 330rpx;height: 460rpx;border-radius: 15rpx;">
					</image>
				</view>
				<text class="font-weight-bold font-lg text-ellipsis" style="color: #d3d4d4;width: 320rpx;">{{item.title}}</text>
				<text class="font-weight-bold text-right mt-1" style="color: #d3d4d4;width: 320rpx;">已售{{Math.floor(Math.random()*80000+20000)}}+</text>
				<text class="font-weight-bold text-right" style="color: #d3d4d4;width: 320rpx;">{{Math.floor(Math.random()*8000+2000)}}+评价</text>
				<view class="flex" style="width: 320rpx;margin-top: -35rpx;">
					<u-icon name="star-fill" size="25rpx" color="#f8830e"></u-icon>
					<u-icon name="star-fill" size="25rpx" color="#f8830e"></u-icon>
					<u-icon name="star-fill" size="25rpx" color="#f8830e"></u-icon>
					<u-icon name="star-fill" size="25rpx" color="#f8830e"></u-icon>
					<u-icon name="star-fill" size="25rpx" color="#f8830e"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "v-ypList",
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

			}
		}
	}
</script>

<style>

</style>