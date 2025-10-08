<template>
	<view>
		<v-coverList @goDetail="goDetail" :list="collectData"></v-coverList>
		<u-empty mode="favor" v-if="collectData.length==0"></u-empty>
	</view>
</template>

<script>
	import $utils from "../../libs/utils.js";
	export default {
		data() {
			return {
				loading: true,
				collectData:[]
			}
		},
		onLoad() {
			
		},
		onShow() {
			if (uni.getStorageSync("collectData")) {
				try {
					this.collectData = JSON.parse(uni.getStorageSync("collectData"));
					console.warn(this.collectData);
				} catch (e) {
			
				}
			}
		},
		methods: {
			goDetail(item){
				let videoInfo = {
					id: item.id,
					private:item.private,
					title: item.title,
					oldPreview:item.oldPreview,
					preview: $utils.addImgKeyParam(item.oldPreview),
					play_month: item.play_month,
					collect_count: item.collect_count,
					site: this.indexTitle == 4 ? 3 : 1
				};
				uni.setStorageSync("videoInfo", JSON.stringify(videoInfo));
				uni.navigateTo({
					url: "/pages/detail1/detail1"
				})
			}
		}
	}
</script>

<style>

</style>
