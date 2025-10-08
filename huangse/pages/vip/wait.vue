<template>
	<view class="col-12 align-center">
		<text class="font-lg" style="margin-top:200rpx;color: #222222;">确认支付结果</text>
		<text class="mt-3 font" style="width: 600rpx;color: #888888;">{{txt1}}</text>
		<text class="mt-3 font" style="width: 600rpx;color: #888888;">{{txt2}}</text>
		<text class="mt-3 font" style="width: 600rpx;color: #888888;">{{txt3}}</text>
		<view @click="success()" class="flex-center bg-main2 mt-3 mb-3" style="width: 240rpx;height: 75rpx;border-radius: 75rpx;" >
			<text class="text-white font">支付成功</text>
		</view>
		<u-popup :show="loadingPayUrl" bgColor="transparent" mode="center">
			<image src="@/static/images/loading.gif" style="width: 200rpx;height: 200rpx;"></image>
		</u-popup>
		
	<!-- 	<u--text @click="goQues()" color="#222222" suffixIcon="arrow-right" iconStyle="font-size: 28rpx" size="28rpx"
			text="支付遇到问题"></u--text> -->
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
				loadingPayUrl:false,
				txt1:"1.订单支付后，一般会在1-10分钟内到账，如超时未到账，请联系客服进行处理",
				txt2:"2.受特殊行业限制，如果支付失败可尝试重新发起订单，系统将会随机切换备用的支付通告",
				txt3:"3.本APP有稳定的广告收益，产品稳定安全请放心充值使用"
			}
		},
		onShow(){
			this.updateUserInfo();
		},
		methods: {
			goQues(){
				uni.navigateTo({
					url:"/pages/vip/question"
				})
			},
			success(){
				this.updateUserInfo();
			},
			updateUserInfo() {
				let that = this;
				that.loadingPayUrl = true;
				$http.request({
					url: "/api.php/addons/appbox/api/userinfo",
					method: "POST",
					header: {
						token: true
					}
				}).then((res) => {
					that.$store.commit("updateVipInfo", res);
					that.loadingPayUrl = false;
					if(res.vip){
						uni.showToast({
							title:"充值成功",
							icon:"success"
						})
						setTimeout(()=>{
							uni.navigateBack();
						},2000);
					}else{
						uni.showToast({
							title:"请您耐心等待，若30分钟内未到账，请联系客服",
							icon:"none"
						})
					}
				}).catch((e) => {
					that.loadingPayUrl = false;
					uni.showToast({
						title:"请您耐心等待，若30分钟内未到账，请联系客服",
						icon:"none"
					})
				})
			}
		}
	}
</script>

<style>

</style>
