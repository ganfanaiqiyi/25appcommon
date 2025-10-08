<template>
	<view>
		<view class="flex flex-row" @click="btnClick()">
			<u-icon v-if="!selected" :name="icon" color="#d2d5dc" size="40rpx"></u-icon>
			<u-icon v-else :name="iconSelect" color="#fbb100" size="40rpx"></u-icon>
			<text style="color: #d2d5dc;font-size: 24rpx;height:40rpx;line-height:40rpx;padding-left:5rpx;">{{count}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "v-likeBtn",
		props: {
			icon: {
				type: String,
				default: "thumb-up"
			},
			iconSelect: {
				type: String,
				default: "thumb-up-fill"
			},
			title: {
				type: String,
				default: "点赞"
			},
			count: {
				type: Number,
				default: 0
			},
			selected: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

			};
		},
		methods: {
			btnClick() {
				this.$emit("btnClick");
			}
		}
	}
</script>

<style>

</style>