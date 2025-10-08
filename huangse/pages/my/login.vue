<template>
	<view>
		<text class="mt-3 ml-4 font-md" >账号(6-20个字符)</text>
		<input type="text" class="ml-4 mt-3 sbInput" placeholder="" v-model="account"/>
		<text class="mt-3 ml-4 font-md" >密码(6-20个字符)</text>
		<input type="password" class="ml-4 mt-3 sbInput" placeholder="" v-model="password"/>
		<view @click="login()" class="mt-5 ml-4 flex-center bg-main2 rounded" style="width: 680rpx;height: 80rpx;">
			<text class="font-md font-weight-bold text-white">登录</text>
		</view>
		<u-notify ref="uNotify"></u-notify>
	</view>
</template>

<script>
	import $http from "../../libs/http.js";
	export default {
		data() {
			return {
				account:"",
				password:""
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
			login(){
				// if (this.account.length < 6 || this.account.length > 20) {
				// 	this.showMsg("账号需在6-20个字符之间！", false);
				// 	return;
				// }
				if (this.password.length < 6 || this.password.length > 20) {
					this.showMsg("密码需在6-20个字符之间！", false);
					return;
				}
				let that = this;
				$http.request({
					url: "/api.php/addons/appbox/api/login",
					method: "POST",
					header: {
						token: true
					},
					data: {
						"account": this.account,
						"password": this.password
					},
				}).then((res) => {
					that.showMsg('登录成功', true);
					that.$store.commit("updateUser", res);
					that.account = "";
					that.password = "";
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

<style>

</style>
