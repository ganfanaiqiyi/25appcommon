<script>
	import clientConfig from 'libs/clientConfig.js'
	export default {
		methods: {},
		onLaunch() {
			console.log('App Show')
			// #ifdef H5
				uni.getSystemInfo({
					success(e) {
						/* 窗口宽度大于420px且不在PC页面且不在移动设备时跳转至 PC.html 页面 */
						if (
							e.windowWidth > 420 &&
							!window.top.isPC &&
							!/iOS|Android/i.test(e.system)
						) {
							// 跳转到PC端专用页面
							window.location.pathname = "/static/html/pc.html";
						}
					},
				});
			// #endif
			let systemInfo = uni.getSystemInfoSync();
			// console.warn(systemInfo);
			uni.setStorageSync("systemInfo", JSON.stringify(systemInfo));
			this.$store.commit("initSystemInfo", systemInfo);

			//初始化完成
			this.$isResolve();
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	@import url("/common/free.css");
	@import url("/common/common.css");

	/* #ifdef H5 */
	page {
		background-color: #0e0e0e;
	}

	/* #endif */
</style>