<template>
	<view>
		<text class="mt-3 ml-4 font-md" style="">账号(6-20个字符)</text>
		<input type="password" class="ml-4 mt-3 sbInput" :placeholder="'原账号:'+userInfo.username" v-model="username" />
		<text class="mt-3 ml-4 font-md" style="">密码(6-20个字符)</text>
		<input type="password" class="ml-4 mt-3 sbInput" :placeholder="'原密码:'+userInfo.password" v-model="password" />
		<text class="mt-3 ml-4 font-md" style="">重复密码(6-20个字符)</text>
		<input type="password" class="ml-4 mt-3 sbInput" placeholder="" v-model="repPassword" />
		<text class="mt-3 ml-4 font-md" style="">邀请码(6-20个字符)</text>
		<input type="password" class="ml-4 mt-3 sbInput" placeholder="可选" v-model="inviteCode" />
		<view @click="change()" class="mt-5 ml-4 flex-center bg-main2 rounded" style="width: 680rpx;height: 80rpx;">
			<text class="font-md font-weight-bold">绑定账号</text>
		</view>
		<u-notify ref="uNotify"></u-notify>
	</view>
</template>

<script>
	import $http from "../../libs/http.js";
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState({
				userInfo: state => state.userInfo
			})
		},
		data() {
			return {
				username: "",
				password: "",
				repPassword: "",
				inviteCode:""
			}
		},
		onLoad() {
			console.warn(this.userInfo)
			// this.username = this.userInfo.username;
			// this.password = this.userInfo.password;
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
				if (this.username.length < 6 || this.username.length > 20) {
					this.showMsg("账号需在6-20个字符之间！", false);
					return;
				}
				if (this.password.length < 6 || this.password.length > 20) {
					this.showMsg("密码需在6-20个字符之间！", false);
					return;
				}
				if (this.password == this.oldPassword) {
					this.showMsg("新密码不能和原始密码相同！", false);
					return;
				}
				if (this.repPassword != this.password) {
					this.showMsg("重复密码不一致！", false);
					return;
				}
				if (this.username == this.inviteCode) {
					this.showMsg("邀请码不能和用户名一致！", false);
					return;
				}
				let that = this;
				$http.request({
					url: "/api.php/addons/appbox/api/bind",
					method: "POST",
					header: {
						token: true
					},
					data: {
						"username": this.username,
						"password": this.password,
						"inviteCode":this.inviteCode
					},
				}).then((res) => {
					that.showMsg('绑定成功', true);
					that.username = "";
					that.password = "";
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