<template>
	<view class="flex flex-column">
		<l-painter ref="painter">
			<l-painter-view css="width: 680rpx;height: 950rpx;margin-left:35rpx;position:relative;border-radius:10rpx;">
				<l-painter-image src="@/static/images/share.jpg"
					css="width: 680rpx; height: 950rpx;border-radius:10rpx;position: absolute;top:0;left:0;" />
				<l-painter-view
					css="width: 680rpx; height: 950rpx;border-radius:10rpx;position: absolute;top:0;left:0;background:rgba(0,0,0,0.4)" />
				<l-painter-view css="width: 220rpx;height: 220rpx;border-radius:10rpx;background:#FFFFFF;position: absolute;top:300rpx;left:230rpx;padding-left:20rpx;padding-top:20rpx;">
					<l-painter-qrcode :text="appConfig.HOME_URL2"
						css="width: 200rpx; height: 200rpx;" />
				</l-painter-view>
				<l-painter-view css="width: 680rpx;height: 400rpx;position: absolute;top:550rpx;left:0rpx;align-items: center;display:flex;flex-direction:column;">
					<l-painter-text
					      text="永久地址(需VPN)"
					      css="color:#ffffff; font-size: 26rpx"
					    />
					<l-painter-text
					      :text="appConfig.HOME_URL"
					      css="color:#ffffff; font-size: 26rpx"
					    />
					<l-painter-text
					      text="最新地址"
					      css="color:#ffffff; font-size: 26rpx"
					    />
					<l-painter-text
					      :text="appConfig.HOME_URL2"
					      css="color:#ffffff; font-size: 26rpx"
					    />
					<l-painter-text
					      :text="'邀请码:'+userInfo.username"
					      css="color:#ffffff; font-size: 30rpx"
					    />
<!-- 					<l-painter-image src="@/static/logo.png"
						css="width: 150rpx; height: 150rpx;border-radius:10rpx;margin-top:10rpx;" /> -->
				</l-painter-view>
			</l-painter-view>
		</l-painter>
		<view class="flex flex-row align-center justify-between mt-3"
			style="width: 680rpx;height: 70rpx;margin-left: 35rpx;">
			<view @click="save()" class="flex-center bg-white"
				style="width: 330rpx;height: 65rpx;border:2rpx solid #c22a8e;border-radius: 65rpx;">
				<text class="text-main2 font">保存图片</text>
			</view>
			<view @click="copy()" class="flex-center bg-main2"
				style="width: 330rpx;height: 65rpx;border-radius: 65rpx;">
				<text class="text-white font">复制链接</text>
			</view>
		</view>
		<text class="ml-3 mt-3 mb-3" style="font-size: 40rpx;color:#7e7e7e">推广福利</text>
		<text class="ml-3 mt-2" style="font-size: 26rpx;color:#333333">免费视频随意看</text>
		<text class="ml-3 mt-2" style="font-size: 26rpx;color:#333333">每邀请一个用户，每天可观看的VIP视频数量增加1</text>
		<text class="ml-3 mt-3" style="font-size: 30rpx;color:#c22a8e">已邀请人数:{{userInfo.invite}}人</text>
		<text class="ml-3 mt-1" style="font-size: 30rpx;color:#c22a8e">每天可观看的VIP视频数量:{{userInfo.invite}}</text>
		<text class="ml-3 mt-2 mb-5" style="font-size: 30rpx;color:#ff0000">对方需要在 我的->绑定账号 里填入邀请码才算成功</text>
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
			},
			copy() {
				let that = this;
				uni.setClipboardData({
					data: that.appConfig.HOME_URL2,
					success: function() {
						uni.$u.toast("复制成功！");
					},
					fail: function() {
						uni.$u.toast("复制失败:(");
					}
				});
			}
		}
	}
</script>

<style>

</style>