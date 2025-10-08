import $http from "./http.js";
import CryptoJs from "crypto-js";
import clientConfig from "./clientConfig.js";
export default {
	goAd(item) {
		if (item.id) {
			$http.ad_report(item.id);
		}
		if (item.url) {
			this.openUrl(item.url);
		}
	},
	generateUUid() {
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for (var i = 0; i < 32; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	},
	buildUuid() {
		if (!uni.getStorageSync("uuid")) {
			let uuid;
			let param = this.getQueryParams();
			if (param.uuid) {
				uuid = param.uuid;
			} else {
				uuid = this.generateUUid();
			}
			uni.setStorageSync("uuid", uuid);
		}
	},
	formatTimestamp(timestamp) {
		var date = new Date(timestamp * 1000);
		var year = date.getFullYear();
		var month = (date.getMonth() + 1).toString().padStart(2, '0');
		var day = date.getDate().toString().padStart(2, '0');
		var hours = date.getHours().toString().padStart(2, '0');
		var minutes = date.getMinutes().toString().padStart(2, '0');
		var seconds = date.getSeconds().toString().padStart(2, '0');
		return `${year}.${month}.${day}  ${hours}:${minutes}:${seconds}`;
	},
	getDate() {
		var date = new Date();
		var year = date.getFullYear();
		var month = (date.getMonth() + 1).toString().padStart(2, '0');
		var day = date.getDate().toString().padStart(2, '0');
		var hours = date.getHours().toString().padStart(2, '0');
		var minutes = date.getMinutes().toString().padStart(2, '0');
		var seconds = date.getSeconds().toString().padStart(2, '0');
		return `${year}年${month}月${day}日`;
	},
	addWatchCount() {
		var date = new Date();
		var year = date.getFullYear();
		var month = (date.getMonth() + 1).toString().padStart(2, '0');
		var day = date.getDate().toString().padStart(2, '0');
		let count = Number(uni.getStorageSync(year + month + day + 'watchCount'));
		count++;
		uni.setStorageSync(year + month + day + 'watchCount', count)
	},
	getWatchCount() {
		var date = new Date();
		var year = date.getFullYear();
		var month = (date.getMonth() + 1).toString().padStart(2, '0');
		var day = date.getDate().toString().padStart(2, '0');
		let count = Number(uni.getStorageSync(year + month + day + 'watchCount'));
		return count;
	},
	getQueryParams() {
		var queryParams = {};
		return queryParams;
	},
	addImgKeyParam(t) {
		let orgin = t;
		t = t.substring(t.indexOf("com") + 3, t.length);
		var r, i;
		const n = "Z7tSXMjByKCFzF5tyApk8cFpjQXD8zWd";
		r = Math.floor(Date.now() / 1e3);
		i = uni.getStorageSync("timestamp");
		let o;
		i && r - parseInt(i) < 300 ? o = parseInt(i) + 300 : (o = r + 300, uni.setStorageSync("timestamp", r
			.toString()));
		const a = n + t + o;
		let result = orgin + "?wsSecret=" + CryptoJs.MD5(a.toString()) + "&wsTime=" + o;
		return result;
	},
	dividedArray(arrVideo) {
		let resultArr = [];
		let tempArr = [];
		arrVideo.forEach(item => {
			tempArr.push({
				id: item.id,
				title: item.title,
				private: item.private,
				play_month: item.play_month,
				collect_count: item.collect_count,
				oldPreview: item.preview,
				preview: this.addImgKeyParam(item.preview)
			});
		});
		for (let i = 0; i < tempArr.length; i++) {
			if (!resultArr[Math.floor(i / 4)]) {
				resultArr[Math.floor(i / 4)] = [];
			}
			resultArr[Math.floor(i / 4)].push(tempArr[i]);
		}

		return resultArr;
	},
	getSystemInfo() {
		let systemInfo = uni.getStorageSync("systemInfo");
		return JSON.parse(systemInfo);
	},
	goDetail(item, site=1,isRed=false) {
		let videoInfo = {
			id: item.id,
			private: item.private,
			title: item.title,
			oldPreview: item.oldPreview,
			preview: item.preview,
			play_month: item.play_month,
			collect_count: item.collect_count,
			site: site
		};
		uni.setStorageSync("videoInfo", JSON.stringify(videoInfo));
		
		if(isRed){
			uni.redirectTo({
				url:"/pages/detail1/detail1"
			})
		}else{
			uni.navigateTo({
				url: "/pages/detail1/detail1"
			})
		}
		
	},
	dealVideo(res) {
		let fyData = {
			totalCount: res.total,
			pageCount: res.per_page,
			currentPage: res.current_page,
			maxPage: res.last_page
		}
		let shabi = {};
		let list = res.data;
		let list2 = [];
		for (let i = 0; i < list.length; i++) {
			list2.push({
				id: list[i].id,
				title: list[i].title,
				play_month: list[i].play_month,
				collect_count: list[i].collect_count,
				private: list[i].private,
				oldPreview: list[i].preview,
				preview: this.addImgKeyParam(list[i].preview)
			})
		}
		shabi.list = list2;
		shabi.fyData = fyData;
		return shabi;
	},
	openUrl(sbUrl){
		// #ifdef APP
		plus.runtime.openURL(sbUrl);
		// #endif
		// #ifdef H5
		window.open(sbUrl);
		// #endif
	}
}