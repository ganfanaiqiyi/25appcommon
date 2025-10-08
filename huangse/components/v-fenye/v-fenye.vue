<template>
	<view class="flex flex-column col-12 justify-center align-center mt-5">
		<text class="flex flex-column text-main font font-weight-bold col-12 text-center mt-3">{{topText}}</text>
		<view class="flex col-12 flex-row justify-center align-center mt-3 mb-5" style="padding-left: 15rpx;">
			<text @click="jumpPrevious()" :class="data.currentPage==1?'text-fy3':'text-fy2'">{{"<"}}</text>

			<text @click="jump(1)" :class="data.currentPage==1?'text-fy2':'text-fy1'">{{"1"}}</text>
			<text v-if="data.currentPage>=4&&data.maxPage>5"
				style="font-size: 25rpx;color: #222222;margin-right: 15rpx;">...</text>

			<text @click="jump(item)" :class="data.currentPage==item?'text-fy2':'text-fy1'"
				v-for="(item,index) in centerArr" :key="index">{{item}}</text>

			<text v-if="data.currentPage<data.maxPage-3&&data.maxPage>5"
				style="font-size: 25rpx;color: #222222;margin-right: 15rpx;">...</text>
			<text @click="jump(data.maxPage)" v-if="data.maxPage>=5"
				:class="data.currentPage==data.maxPage?'text-fy2':'text-fy1'">{{data.maxPage}}</text>
			<text @click="jumpNext()" :class="data.currentPage==data.maxPage?'text-fy3':'text-fy2'">{{">"}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "v-fenye",
		props: {
			data: {
				type: Object,
				default () {
					return {
						totalCount: 3721,
						pageCount: 30,
						currentPage: 1,
						maxPage: 125
					};
				}
			}
		},
		computed: {
			topText() {
				let currentPage = this.data.currentPage;
				let totalCount = this.data.totalCount;
				let pageCount = this.data.pageCount;
				let a = (currentPage - 1) * (pageCount) + 1;
				let b = (currentPage - 1) * (pageCount) + pageCount;
				b = b > totalCount ? totalCount : b;
				if (this.data.totalCount == 0) {
					return 0 + "-" + 0 + " / " + "总共 " + 0 + " 条";
				} else {
					return a + "-" + b + " / " + "总共 " + totalCount + " 条";
				}

			},
			centerArr() {
				let currentPage = this.data.currentPage;
				let maxPage = this.data.maxPage;
				let arr = [];
				if (maxPage == 1) {
					arr = [];
				} else if (maxPage <= 4) {
					for (let i = 2; i <= maxPage; i++) {
						arr.push(i);
					}
				} else if (maxPage == 5) {
					arr = [2, 3, 4];
				} else if (maxPage > 5) {
					if (currentPage < 4) {
						arr = [2, 3, 4];
					} else if (currentPage >= maxPage - 3) {
						arr = [maxPage - 3, maxPage - 2, maxPage - 1];
					} else if (currentPage < maxPage - 2) {
						for (let i = currentPage - 1; i < currentPage + 2; i++) {
							arr.push(i);
						}
					}
				}
				return arr;
			}
		},
		data() {
			return {

			};
		},
		methods: {
			jump(page) {
				if (page !== this.data.currentPage) {
					this.$emit("jump", page);
				}
			},
			jumpPrevious() {
				if (this.data.currentPage == 1) {
					return;
				}
				this.jump(this.data.currentPage - 1);
			},
			jumpNext() {
				if (this.data.currentPage == this.data.maxPage) {
					return;
				}
				this.jump(this.data.currentPage + 1);
			}

		}
	}
</script>

<style>

</style>