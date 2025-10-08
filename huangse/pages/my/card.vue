<template>
	<view>
		<l-painter ref="painter">
			<l-painter-view css="width: 680rpx;height: 950rpx;margin-left:35rpx;position:relative;border-radius:10rpx;">
				<l-painter-image src="@/static/images/share.jpg"
					css="width: 680rpx; height: 950rpx;border-radius:10rpx;position: absolute;top:0;left:0;" />
				<l-painter-view
					css="width: 680rpx; height: 950rpx;border-radius:10rpx;position: absolute;top:0;left:0;background:rgba(0,0,0,0.4)" />
				<l-painter-view
					css="width: 220rpx;height: 220rpx;border-radius:10rpx;background:#FFFFFF;position: absolute;top:250rpx;left:230rpx;padding-left:20rpx;padding-top:20rpx;">
					<l-painter-qrcode :text="appConfig.HOME_URL2" css="width: 200rpx; height: 200rpx;" />
				</l-painter-view>
				<l-painter-view
					css="width: 680rpx;height: 400rpx;position: absolute;top:500rpx;left:0rpx;align-items: center;display:flex;flex-direction:column;">
					<l-painter-text text="永久地址(需VPN)" css="color:#ffffff; font-size: 26rpx" />
					<l-painter-text :text="appConfig.HOME_URL" css="color:#ffffff; font-size: 26rpx" />
					<l-painter-text text="最新地址" css="color:#ffffff; font-size: 26rpx" />
					<l-painter-text :text="appConfig.HOME_URL2" css="color:#ffffff; font-size: 26rpx" />
					<l-painter-text :text="'账号:'+userInfo.username" css="color:#ffffff; font-size: 30rpx;font-weight: 700;" />
					<l-painter-text :text="'密码:'+userInfo.password" css="color:#ffffff; font-size: 30rpx;font-weight: 700;" />
				<!-- 	<l-painter-image src="@/static/logo.png"
						css="width: 150rpx; height: 150rpx;border-radius:10rpx;margin-top:10rpx;" /> -->
				</l-painter-view>
			</l-painter-view>
		</l-painter>
		<view @click="save()" class="ml-2 mt-3 rounded flex justify-center align-center bg-main2" style="width: 710rpx;height: 90rpx;">
			<text class="font-weight-bold font text-white">长按或截图保存身份卡</text>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState({
				userInfo: state => state.userInfo,
				appConfig: state => state.appConfig
			})
		},
		data() {
			return {

			}
		},
		onLoad() {},
		methods: {
			save() {
				// // 渲染
				// this.$refs.painter.render(jsonSchema);
				// // 生成图片
				// #ifdef APP
				this.$refs.painter.canvasToTempFilePathSync({
					fileType: "jpg",
					// 如果返回的是base64是无法使用 saveImageToPhotosAlbum，需要设置 pathType为url
					pathType: 'url',
					quality: 1,
					success: (res) => {
						console.log(res.tempFilePath);
						// 非H5 保存到相册
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function() {
								console.log('save success');
							}
						});
					},
				});
				// #endif
				
			}
		}
	}
</script>

<style>

</style>