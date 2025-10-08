<template>
	<view>
		<text class="mt-3 ml-4 font-md" style="color: #f3f3f3;">账号</text>
		<input type="text" class="ml-4 mt-3 sbInput" placeholder="" v-model="account" />
		<text class="mt-3 ml-4 font-md" style="color: #f3f3f3;">密码</text>
		<input type="password" class="ml-4 mt-3 sbInput" placeholder="" v-model="password" />
		<text class="mt-3 ml-4 font-md" style="color: #f3f3f3;">重复密码</text>
		<input type="password" class="ml-4 mt-3 sbInput" placeholder="" v-model="repPassword" />
		<view @click="register()" class="mt-5 ml-4 flex-center bg-main2 rounded" style="width: 680rpx;height: 80rpx;">
			<text class="font-md font-weight-bold">注册</text>
		</view>
		<u-notify ref="uNotify"></u-notify>
	</view>
</template>

<script>
	import $utils from "../../libs/utils.js";
	import $http from "../../libs/http.js";
	export default {
		data() {
			return {
				account: "",
				password: "",
				repPassword: "",
				uuid:""
			}
		},
		onLoad() {
			this.uuid = $utils.generateUUid();
		},
		methods: {
			showMsg(msg = "", isSuccess = true) {
				this.$refs.uNotify.show({
					top: 10,
					type: isSuccess ? 'success' : 'error',
					color: '#fff',
					bgColor: isSuccess ? '#07bc0c' : '#e74c3c',
					message: msg,
					duration: 1000 * 1,
					fontSize: 16,
					safeAreaInsetTop: true
				})
			},
			register() {
				if (this.account.length < 6 || this.account.length > 20) {
					this.showMsg("账号需在6-20个字符之间！", false);
					return;
				}
				if (this.password.length < 6 || this.password.length > 20) {
					this.showMsg("密码需在6-20个字符之间！", false);
					return;
				}
				if (this.repPassword != this.password) {
					this.showMsg("重复密码不一致！", false);
					return;
				}
				let that = this;
				$http.request({
					url: "/api/app/register",
					method: "POST",
					header: {
						token: true
					},
					data: {
						"account": this.account,
						"password": this.password,
						'deviceId':this.uuid
					},
				}).then((res) => {
					that.showMsg('注册成功', true);
					uni.setStorageSync("uuid",that.uuid);
					that.$store.commit("updateUser", res);
					that.account = "";
					that.password = "";
					that.repPassword = "";
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