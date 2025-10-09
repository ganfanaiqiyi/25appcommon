<template>
	<view style="">
		<view v-if="list.length>0" class="flex justify-between pt-2 mb-2">
			<text class="font-weight-bold text-main2 ml-2" style="font-size: 32rpx;">约炮招嫖</text>
		</view>
		<view class="flex flex-row flex-wrap col-12">
			<view @click="goDetail(item)" class="flex flex-column align-center position-relative mb-2"
				style="width: 350rpx;height:710rpx;margin-left: 16rpx;border-radius: 15rpx;background-color: #ffedfb;"
				v-for="(item,index) in list" :key="index">
				<view class="position-relative"
					style="width: 350rpx;height: 460rpx;border-top-left-radius: 15rpx;border-top-right-radius: 15rpx;">

					<view class="position-absolute flex flex-center"
						style="width: 350rpx;height: 460rpx;top:0;left:0;border-radius: 20rpx;background-color: #4e4e4e;">
						<text class="font-weight-bold" style="font-size: 35rpx;color: #3e3e3e">黄色仓库</text>
					</view>
					
					<image :src="item.image" mode="aspectFill"
						style="width: 350rpx;height: 460rpx;border-top-left-radius: 15rpx;border-top-right-radius: 15rpx;">
					</image>
				</view>
				
				<view class="flex justify-between position-absolute align-center" style="width: 330rpx;height: 80rpx;">
					<view class="flex justify-center align-center"
						style="width: 170rpx;height: 60rpx;border-radius: 60rpx;background-color: #0000004d;">
						<image src="/static/images/y1.png" style="width: 40rpx;height: 40rpx;"></image>
						<text class="text-ellipsis"
							style="color: #ffffffcc;width: 100rpx;height: 40rpx;font-size: 25rpx;">官方认证</text>
					</view>
					<view class="flex justify-center align-center"
						style="width: 120rpx;height: 60rpx;border-radius: 60rpx;background-color: #0000004d;">
						<image src="/static/images/y2.png" style="width: 40rpx;height: 40rpx;"></image>
						<text class="text-ellipsis"
							style="color: #ffffffcc;width: 60rpx;height: 40rpx;font-size: 25rpx;">{{Math.floor(Math.random()*8000+1000)}}</text>
					</view>
				</view>
				<view class="flex justify-between position-absolute align-center"
					style="width: 320rpx;height: 60rpx;left: 15rpx;top:435rpx;">
					<image src="/static/images/y3.png" style="width: 60rpx;height: 60rpx;"></image>
					<image src="/static/images/y4.png" style="width: 240rpx;height: 60rpx;"></image>
				</view>

				<view class="flex flex-column" style="width: 320rpx;">
					<view class="flex justify-between align-center" style="width: 320rpx;margin-top: 50rpx;">
						<text class="font-weight-bold text-ellipsis" style="color: #d72e84;">{{item.title}}</text>
						<view class="flex justify-center align-center" style="height: 30rpx;border-radius: 60rpx;">
							<image src="/static/images/y5.png" style="width: 15rpx;height: 15rpx;"></image>
							<text class="text-ellipsis"
								style="color: #a783e8;height: 40rpx;font-size: 25rpx;text-align: right;">附近{{Math.floor(Math.random()*5000+100)}}米</text>
						</view>
					</view>
					<text class="mt-05 font-weight-bold"
						style="color: #1163cd;">{{Math.floor(Math.random()*10+160)+" "+Math.floor(Math.random()*10+40)}}KG</text>
					<view class="flex align-center mt-05" style="width: 320rpx;">
						<text class="font-weight-bold text-ellipsis"
							style="color: #1aaca9;width:80rpx;font-size: 30rpx;">项目</text>
						<text class="text-ellipsis"
							style="color: #000000;width:250rpx;font-size: 30rpx;">{{getXiangmu()}}</text>
					</view>
					<view class="flex align-center mt-05" style="width: 320rpx;">
						<text class="font-weight-bold text-ellipsis"
							style="color: #1aaca9;width:80rpx;font-size: 30rpx;">特色</text>
						<text class="text-ellipsis"
							style="color: #000000;width:250rpx;font-size: 30rpx;">{{getTese()}}</text>
					</view>
				</view>



			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "v-ypList",
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				arrXiangmu: ['69', '双飞', '车震', '应有尽有', '全套', '舌吻', '激情爱爱', '深喉', '波推', '鸳鸯戏', '轻微SM', '滴蜡', '皮鞭', '捆绑',
					'按摩', '共浴', '后入'
				],
				arrTese: ['超级紧致', '年轻貌美', '白虎', '轻微SM', '各种花式', '各种姿势', '肌肤丝滑', '主动热情', '水多', '前凸后翘', '三点粉嫩', '魔鬼身材',
					'颜值担当'
				]
			};
		},
		methods: {
			goDetail(item) {

			},
			getXiangmu() {
				return this.arrXiangmu[Math.floor(Math.random() * this.arrXiangmu.length)] + "  " + this.arrXiangmu[Math
					.floor(Math.random() * this.arrXiangmu.length)];
			},
			getTese() {
				return this.arrTese[Math.floor(Math.random() * this.arrTese.length)] + "  " + this.arrTese[Math.floor(
					Math.random() * this.arrTese.length)];
			}
		}
	}
</script>

<style>

</style>