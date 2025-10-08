<template>
	<view>
		<image :src="shabi" class="rounded" mode="widthFix" style="width: 650rpx;border-radius: 10rpx;"></image>
	</view>
</template>

<script>
	export default {
		name: "v-image2",
		props: {
			image: {
				type: String,
				default: ""
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
								console.error(`无法获取内容：${uni.getStorageSync("mmImageUrl")+link}`,
									err);
								contentArray.push("获取失败");
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