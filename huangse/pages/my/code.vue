<template>
	<view>
		<view class="mt-3 ml-4 font-md" >兑换码</view>
		<input type="text" class="ml-4 mt-3 sbInput" placeholder="请输入兑换码" v-model="key" />
		<view @click="useCode()" class="mt-5 ml-4 flex-center bg-main2 rounded" style="width: 680rpx;height: 80rpx;">
			<view class="font-md font-weight-bold">兑换</view>
		</view>
		<u-notify ref="uNotify"></u-notify>
	</view>
</template>

<script>
	import $http from "../../libs/http.js";
	export default {
		data() {
			return {
				key: ""
			}
		},
		methods: {
			showMsg(msg = "", isSuccess = true) {
				this.$refs.uNotify.show({
					top: 0,
					type: isSuccess ? 'success' : 'error',
					color: '#fff',
					bgColor: isSuccess ? '#07bc0c' : '#e74c3c',
					message: msg,
					duration: 1000 * 1,
					fontSize: 16,
					safeAreaInsetTop: false
				})
			},
			useCode() {
				if (this.key =="") {
					this.showMsg("兑换码不能为空", false);
					return;
				}
				let that = this;
				$http.request({
					url: "/api.php/addons/appbox/api/useVipCode",
					method: "POST",
					header: {
						token: true
					},
					data: {
						"key": this.key
					},
				}).then((res) => {
					that.showMsg('兑换成功', true);
					that.key = "";
					setTimeout(()=>{
						uni.navigateBack();
					},2000);
				}).catch((e) => {
					that.showMsg(e, false);
				})
				
			}
		}
	}
</script>

<style scoped>
	
</style>