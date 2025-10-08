<template>
	<view>
		<view v-for="(item,index) in list" :key="index" class="ml-2 py-3"
			style="width: 710rpx;height: 310rpx;border-bottom:4rpx #2a2a2a solid;">
			<view class="flex align-center mb-1">
				<text class="font-lg font-weight-bold" style="color: #d0d0d2;width: 190rpx;">订单号</text>
				<text class="font-md" style="color: #717278;">{{item.id}}</text>
			</view>
			<view class="flex align-center mb-1">
				<text class="font-lg font-weight-bold" style="color: #d0d0d2;width: 190rpx;">商品</text>
				<text class="font-md" style="color: #717278;">{{item.remark}}</text>
			</view>
			<view class="flex align-center mb-1">
				<text class="font-lg font-weight-bold" style="color: #d0d0d2;width: 190rpx;">金额</text>
				<text class="font-md" style="color: #717278;">{{item.amount}}</text>
			</view>
			<view class="flex align-center mb-1">
				<text class="font-lg font-weight-bold" style="color: #d0d0d2;width: 190rpx;">创建时间</text>
				<text class="font-md" style="color: #717278;">{{item.createTime}}</text>
			</view>
			<view class="flex align-center mb-1">
				<text class="font-lg font-weight-bold" style="color: #d0d0d2;width: 190rpx;">支付状态</text>
				<text class="font-md" style="color: #717278;">{{item.status==1?"支付成功":"等待支付"}}</text>
			</view>
		</view>
		<u-loading-icon class="mt-2 mb-2" v-if="!isEnd" text="加载中" textSize="20"></u-loading-icon>
		
		<u-empty mode="order" v-if="list.length==0"></u-empty>
		<u-divider v-else text="我是有底线的" textColor="#d0d0d2" lineColor="#d0d0d2" dashed></u-divider>
	</view>
</template>

<script>
	import $utils from "../../libs/utils.js";
	import $http from "../../libs/http.js";
	export default {
		data() {
			return {
				list: [],
				crtPage: 1,
				isEnd: false,
			}
		},
		onLoad() {
			this.getList();
		},
		onReachBottom() {
			if(!this.isEnd){
				this.getList();
			}
		},
		methods: {
			getList() {
				let that = this;
				$http.request({
					url: "/api/order/list",
					data: {
						"page": this.crtPage
					},
					method: "POST",
					header: {
						token: true
					}
				}).then((res) => {
					if (res.length <= 0) {
						that.isEnd = true;
					}
					that.crtPage++;
					that.list = [...that.list, ...res];
				}).catch((e) => {
					uni.showToast({
						icon:"error",
						title:"获取失败"
					})
				})
			}
		}
	}
</script>

<style>

</style>