<template>
	<view>
		<view class="flex justify-between">
			<text class="font-weight-bold text-main2 ml-2" style="font-size: 32rpx;">{{title}}</text>
			<view @click="gotoAvList()" class="mr-2">
				<u--text color="#222222" suffixIcon="arrow-right" iconStyle="font-size: 22rpx" size="22rpx"
					text="更多"></u--text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"v-cate",
		props: {
			title: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			gotoAvList(){
				uni.navigateTo({
					url:"/pages/avList/avList"
				})
			}
		}
	}
</script>

<style>

</style>