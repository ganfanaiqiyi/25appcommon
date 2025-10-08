<template>
	<view>
		<view class="flex flex-row flex-wrap col-12 mt-2">
			<view class="list-item" v-for="(item,index) in goods" :key="index" @click="">
				<view class="rounded" style="width: 365rpx;height: 460rpx;">
					<image class="rounded" src="@/static/images/vip_bg.png" style="width: 365rpx;height: 460rpx;"></image>
				</view>
				
				<view class="flex flex-column position-absolute rounded justify-center align-center"
					style="left:20rpx;top:90rpx;width: 50rpx;height: 90rpx;background-color: #fe0000;">
					<text class="text-white font">特</text>
					<text class="text-white font">惠</text>
				</view>
				<text class="text-white font-weight-bold position-absolute"
					style="left: 80rpx;top:88rpx;font-size: 70rpx;">{{"￥"+item.price}}</text>
				<text class="position-absolute font-weight-bold font-md" style="left:20rpx;top:200rpx;color:#f7df1d ;">
					{{item.name}}
				</text>
				<text class="position-absolute font text-white" style="left:20rpx;top:260rpx;">
					全区 无限观看</text>
				<view @click="buy(item)" class="flex-center bg-white position-absolute"
					style="width: 335rpx;height: 95rpx;left:20rpx;top:330rpx;border-radius: 95rpx;background-color: #f7df1d;">
					<text class="font-md font-weight-bold" >立即购买</text>
				</view>
			</view>
		</view>

		<u-popup :show="showPipe" mode="center" @close="showPipe=false" :closeable="true">
			<view class="bg-white rounded-top-lg col-12 align-center"
				style="padding-top: 90rpx;padding-bottom: 50rpx;">
				<view @click="choosePipe(item)" v-for="(item,index) in crtPipes" :key="index" class="flex flex-row align-center"
					style="width: 675rpx;height: 120rpx;border: 2rpx #e6e6e6 solid;">
					<image v-if="item.icon=='alipay'" class="rounded ml-2"
						src="@/static/images/zfb.png"
						style="width: 70rpx;height: 70rpx;"></image>
					<image v-else class="rounded ml-2"
						src="@/static/images/wx.png"
						style="width: 70rpx;height: 70rpx;"></image>
					<text class="font-lg font-weight-bold ml-2" style="width: 200rpx;">{{item.title}}</text>
					<text class="font font-weight-normal ">使用渠道{{index+1}}-支付 {{crtPrice}}元</text>
				</view>
			</view>
		</u-popup>
		
		<u-popup :show="loadingPayUrl" bgColor="transparent" mode="center">
			<image src="@/static/images/loading.gif" style="width: 200rpx;height: 200rpx;"></image>
		</u-popup>
	</view>
</template>

<script>
	import $utils from "../../libs/utils.js";
	import $http from "../../libs/http.js";
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState({
				goods: state => state.goods,
				pipes: state => state.pipes
			})
		},
		data() {
			return {
				loadingPayUrl:false,
				isOpenUrl: false,
				showPipe: false,
				crtPipes: [],
				crtPrice: 30,
				crtGoodsId: 1,
				orderId: "",
				list: [{
						price: 30,
						oldPrice: 120,
						day: "30",
						name: "月卡会员"
					},
					{
						price: 100,
						oldPrice: 200,
						day: "90",
						name: "季卡会员"
					},
					{
						price: 200,
						oldPrice: 500,
						day: "365",
						name: "年卡会员"
					},
					{
						price: 400,
						oldPrice: 1000,
						day: "9999",
						name: "永久会员"
					}
				]
			}
		},
		onLoad() {
			console.log(this.goods);
			console.log(this.pipes);
		},
		onShow() {
			console.warn(this.isOpenUrl)
			if (this.isOpenUrl) {
				this.isOpenUrl = false;
				that.showPipe = false;
				uni.navigateTo({
					url:"/pages/vip/wait"
				})
				
			}
		},
		methods: {
			buy(item) {
				console.log(item)
				this.crtGoodsId = item.id;
				this.crtPrice = item.price;
				this.crtPipes = [];
				let arrPipes = item.pipes.split(",");
				for (let value1 of arrPipes) {
					for (let value2 of this.pipes) {
						if (value1 == value2["name"]) {
							this.crtPipes.push(value2);
						}
					}
				}
				this.showPipe = true;
			},
			choosePipe(item) {
				let that = this;
				that.loadingPayUrl = true;
				$http.request({
					url: "/api.php/addons/appbox/order/create",
					data: {
						"goodsId": this.crtGoodsId,
						"pipeName": item.name,
					},
					method: "POST",
					header: {
						token: true
					}
				}).then((res) => {
					console.log(res);
					that.orderId = res.orderId;
					that.loadingPayUrl = false;
					if (res.payUrl) {
						that.isOpenUrl = true;
						$utils.openUrl(res.payUrl);
					}else{
						uni.showToast({
							title:"获取支付链接失败,请稍后重试",
							icon:"none"
						})
					}
				}).catch((e) => {
					that.loadingPayUrl = false;
					uni.showToast({
						title:"获取支付链接失败,请稍后重试",
						icon:"none"
					})
					console.log(e);
				})
			}
		}
	}
</script>

<style scoped>
	.list-item {
		width: 365rpx;
		height: 480rpx;
		padding: 5rpx;
		position: relative;
	}

	.oldPrice1 {
		left: 250rpx;
		top: 105rpx;
		text-decoration: line-through;
	}

	.oldPrice2 {
		left: 285rpx;
		top: 105rpx;
		text-decoration: line-through;
	}
</style>