<template>
	<view>
		<view class="px-2">
			<view style="width: 710rpx;height: 2rpx;background-color: #dddddd;"></view>
			<text class="mt-2 mb-1 text-ellipsis font text-main" style="width: 710rpx;">{{item.title}}</text>
			<view class="flex flex-row">
				<image v-for="(sr,index2) in contentList" :key="index2" :src="sr" class="mr-2 rounded" mode="aspectFill"
					style="width: 160rpx;height: 160rpx;border: 1rpx solid #ff4c5d;"></image>
			</view>
			<view class="flex flex-row align-center justify-between mt-2 mb-2" style="width: 710rpx;">
				<text class="font-sm"
					style="color:#bbbbbb;width: 350rpx;">{{`${item.member_obj?item.member_obj.nickname:""}  ${item.updated_at}`}}</text>
				<view class="flex flex-row justify-end" style="width: 200rpx;">
					<u--text color="#bbbbbb" prefixIcon="eye" iconStyle="font-size: 25rpx" size="25rpx"
						:text="item.click_num"></u--text>
					<u--text color="#bbbbbb" prefixIcon="chat" iconStyle="font-size: 25rpx" size="25rpx"
						:text="item.reply_num"></u--text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $maomi from "../../libs/maomi.js"
	export default {
		props: {
			item: {
				type: Object,
				default: () => []
			}
		},
		data() {
			return {
				contentList: [] // 存储远程文本内容
			};
		},
		watch: {
			item: {
				handler(newVal) {
					if (newVal.photo_albums && Array.isArray(newVal.photo_albums)) {
						this.fetchContent(newVal.photo_albums);
					}
				},
				immediate: true, // 在组件初始化时立即执行
				deep: true // 深度监听
			}
		},
		methods: {
			async fetchContent(links) {
				const contentArray = [];
				for (const link of links) {
					try {
						await new Promise((resolve, reject) => {
							uni.request({
								url: "https://jpg.tlxxw.cc" + link + ".txt",
								success: (res) => {
									contentArray.push(res.data); // 获取返回的文本内容
									resolve();
								},
								fail: (err) => {
									console.error(`无法获取内容：${link}`, err);
									contentArray.push("获取失败");
									reject(err);
								}
							});
						});
					} catch (error) {
						console.error(`错误处理：${link}`, error);
					}
				}
				this.contentList = contentArray;
				console.warn(this.contentList)
			}
		}
	};
</script>