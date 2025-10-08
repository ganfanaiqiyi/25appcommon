<template>
	<view class="position-relative" style="width: width: 160rpx;height: 160rpx;;">
		<image :src="shabi" style="width: 120rpx;height: 120rpx;border-radius: 20rpx;">
	</view>
</template>

<script>
	export default {
		name: "v-image3",
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
						if (newVal.indexOf('.txt')!=-1) {
							this.fetchContent(newVal);
						} else {
							this.shabi = newVal;
						}

					}
				},
				immediate: true, // 在组件初始化时立即执行
				deep: true // 深度监听
			}
		},
		data() {
			return {
				shabi: "../../static/images/covericon.jpg"
			};
		},
		methods: {
			replaceAll(str, find, replace) {
				return str.replace(new RegExp(find, 'g'), replace);
			},
			async fetchContent(link) {
				try {
					let that = this;
					await new Promise((resolve, reject) => {
						uni.request({
							url: link,
							success: (res) => {
								// const rep_encode2 = btoa('#base64#')
								// console.log(res);
								let resultData = res.data;
								resultData = that.replaceAll(resultData, 'M1O2N3E4Y5', "");
								resultData = that.replaceAll(resultData, 'R1U2O3Z4H5I6', "data");
								resultData = that.replaceAll(resultData, 'S1H2A3B4I5', "base64");
								this.shabi = resultData;
								resolve();
							},
							fail: (err) => {
								console.error(
									`无法获取内容：${ uni.getStorageSync("mmImageUrl") +link}`,
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