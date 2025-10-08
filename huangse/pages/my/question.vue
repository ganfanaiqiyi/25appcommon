<template>
	<view>
		<text class="mt-3 ml-4 font-md" style="color: #f3f3f3;" >标题</text>
		<input type="text" class="ml-4 mt-3 sbInput" placeholder="" v-model="title"/>
		<text class="mt-3 ml-4 font-md" style="color: #f3f3f3;" >内容</text>
		<input type="text" class="ml-4 mt-3 sbInput" placeholder="" v-model="content"/>
		<view @click="tijiao()" class="mt-5 ml-4 flex-center bg-main2 rounded" style="width: 680rpx;height: 80rpx;">
			<text class="font-md font-weight-bold">提交</text>
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
				title:"",
				content:""
			}
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
			tijiao(){
				if (this.title.length < 1 || this.title.length > 50) {
					this.showMsg("标题需在1-50个字符之间！", false);
					return;
				}
				if (this.content.length < 1 || this.content.length > 50) {
					this.showMsg("内容需在1-50个字符之间！", false);
					return;
				}
				
				//一天最多三次
				let today = $utils.getDate();
				let count = Number(uni.getStorageSync(today+"_question"));
				if(count>=3){
					this.showMsg('提交成功', true);
					return;
				}
				
				let that = this;
				$http.request({
					url: "/api/app/addQuestion",
					method: "POST",
					header: {
						token: true
					},
					data: {
						"title": this.title,
						"content": this.content
					},
				}).then((res) => {
					that.showMsg('提交成功', true);
					uni.setStorageSync(today+"_question",count+1);
					that.title = "";
					that.content = "";
				}).catch((e) => {
					that.showMsg(e, false);
				})
			}
		}
	}
</script>

<style scoped>
.sbInput{
	width: 670rpx;
	height: 80rpx;
	border: 2px #21242d solid;
	color: #ababae;
}
</style>
