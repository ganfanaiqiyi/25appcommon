<template>
	<view>
		<text class="mt-3 ml-4 font-md" style="">原始密码(6-20个字符)</text>
		<input type="password" class="ml-4 mt-3 sbInput" placeholder="" v-model="oldPassword" />
		<text class="mt-3 ml-4 font-md" style="">新密码(6-20个字符)</text>
		<input type="password" class="ml-4 mt-3 sbInput" placeholder="" v-model="newPassword" />
		<text class="mt-3 ml-4 font-md" style="">重复密码(6-20个字符)</text>
		<input type="password" class="ml-4 mt-3 sbInput" placeholder="" v-model="repPassword" />
		<view @click="change()" class="mt-5 ml-4 flex-center bg-main2 rounded" style="width: 680rpx;height: 80rpx;">
			<text class="font-md font-weight-bold">修改</text>
		</view>
		<u-notify ref="uNotify"></u-notify>
	</view>
</template>

<script>
	import $http from "../../libs/http.js";
	export default {
		data() {
			return {
				oldPassword: "",
				newPassword: "",
				repPassword: ""
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
			change() {
				if (this.oldPassword.length < 6 || this.oldPassword.length > 20) {
					this.showMsg("密码需在6-20个字符之间！", false);
					return;
				}
				if (this.newPassword.length < 6 || this.newPassword.length > 20) {
					this.showMsg("密码需在6-20个字符之间！", false);
					return;
				}
				if (this.newPassword == this.oldPassword) {
					this.showMsg("新密码不能和原始密码相同！", false);
					return;
				}
				if (this.repPassword != this.newPassword) {
					this.showMsg("重复密码不一致！", false);
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
						"oldPassword": this.oldPassword,
						"newPassword": this.newPassword
					},
				}).then((res) => {
					that.showMsg('修改成功', true);
					that.oldPassword = "";
					that.newPassword = "";
					that.repPassword = "";
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
	.sbInput {
		width: 670rpx;
		height: 80rpx;
		border: 2px #21242d solid;
		color: #ababae;
	}
</style>