<template>
	<view class="position-relative" style="width: width: 160rpx;height: 160rpx;;">
		<image :src="shabi" class="mr-2 rounded" mode="aspectFill"
			style="width: 160rpx;height: 160rpx;border: 1rpx solid #ff4c5d;"></image>
		<image class="position-absolute" v-if="hasVideo" src="@/static/images/play.png"
			style="width: 60rpx;height: 60rpx;left:50rpx;top:50rpx;"></image>
	</view>
</template>

<script>
	export default {
		name: "v-image1",
		props: {
			image: {
				type: String,
				default: ""
			},
			hasVideo: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			image: {
				handler(newVal) {
					if (newVal) {
						this.fetchContent(newVal);
					}
				},
				immediate: true, // 在组件初始化时立即执行
				deep: true // 深度监听
			}
		},
		data() {
			return {
				shabi: "@/static/forumCover.jpg"
			};
		},
		methods: {
			async fetchContent(link) {
				try {
					await new Promise((resolve, reject) => {
						uni.request({
							url: uni.getStorageSync("mmImageUrl") + link + ".txt",
							success: (res) => {
								this.shabi = res.data;
								resolve();
							},
							fail: (err) => {
								console.error(`无法获取内容：${ uni.getStorageSync("mmImageUrl") +link}`,
									err);
								reject(err);
							}
						});
					});
				} catch (error) {
					console.error(`错误处理：${link}`, error);
				}
			}
		}
	}
</script>

<style>

</style>