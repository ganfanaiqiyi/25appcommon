import CryptoJs, {
	MD5
} from "crypto-js";
import $utils from "./utils.js"
export default {
	request(options = {}) {
		let clientConfig = JSON.parse(uni.getStorageSync('insConfig'));
		return new Promise((resolve, reject) => {
			let baseUrl = clientConfig.insBaseUrl;
			options.url = baseUrl + options.url;
			options.header = options.header || {};
			options.header["Content-Type"] = "application/json";
			options.header["suffix"] = clientConfig.insSuffix;
			let postData = options.data;
			postData["encode_sign"] = this.base64Sign(clientConfig, postData);
			options.data = {
				'post-data': this.aesEncrypt(clientConfig, JSON.stringify(postData), clientConfig.insSuffix)
			}

			options.method = "POST";
			options.dataType = options.dataType || "text";
			options.timeout = 5000;
			// console.warn(options)
			uni.request({
				...options,
				success: (result) => {
					// console.warn(result);
					if (result.statusCode != 200) {
						console.error("请求失败!result:" + JSON.stringify(result));
						return reject();
					}
					let jsonData = JSON.parse(result.data);
					let resultData = JSON.parse(this.aesDecrypt(clientConfig, jsonData.data,
						jsonData
						.suffix));
					// console.warn(resultData)
					if (resultData.code != 1) {
						return reject();
					}
					return resolve(resultData.data);
				},
				fail: (result) => {
					console.error(result)
					return reject(result);
				}
			})
		})
	},
	aesEncrypt(clientConfig, word, suffix) {
		let key = CryptoJs.enc.Utf8.parse(clientConfig.insKEY);
		let iv = CryptoJs.enc.Utf8.parse(clientConfig.insIV + suffix);
		let srcs = CryptoJs.enc.Utf8.parse(word);
		let encrypted = CryptoJs.AES.encrypt(srcs, key, {
			iv: iv,
			mode: CryptoJs.mode.CBC,
			padding: CryptoJs.pad.Pkcs7
		});
		return encrypted.ciphertext.toString(CryptoJs.enc.Base64);
	},
	aesDecrypt(clientConfig, message, suffix) {
		let key = CryptoJs.enc.Utf8.parse(clientConfig.insKEY);
		let iv = CryptoJs.enc.Utf8.parse(clientConfig.insIV + suffix);
		let decrypted = CryptoJs.AES.decrypt(message, key, {
			iv: iv,
			mode: CryptoJs.mode.CBC,
			padding: CryptoJs.pad.Pkcs7
		});
		return decrypted.toString(CryptoJs.enc.Utf8);
	},
	base64Sign(clientConfig, t) {
		t = this.objKeySort(t);
		let n = "";
		for (const r in t) n += r + "=" + t[r] + "&";
		return n += clientConfig.insSign, MD5(n).toString();
	},
	objKeySort(t) {
		const n = {},
			r = Object.keys(t).sort();
		for (let i = 0; i < r.length; i++) n[r[i]] = t[r[i]];
		return n
	},
	async indexList(type) {
		return new Promise((resolve, reject) => {
			this.request({
				url: "/api/video/indexLists",
				data: {
					"site": 1,
					"device": 1,
					"timestamp": new Date().getTime(),
					"page": 1,
					"limit": 12,
					"type": type
				}
			}).then((res) => {
				let shabi = $utils.dividedArray(res.data);
				resolve(shabi);
			}).catch((e) => {
				console.error(e)
				resolve([]);
			})
		})
	},
	async actList(page = 1) {
		return new Promise((resolve, reject) => {
			this.request({
				url: "/api/actor/lists",
				data: {
					"site": 1,
					"device": 1,
					"timestamp": new Date().getTime(),
					"page": page,
					"limit": 30,
					"order": "1"
				}
			}).then((res) => {
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
						name: list[i].name,
						image: $utils.addImgKeyParam(list[i].image),
						rank: i + 1 + (res.current_page - 1) * 30,
					})
				}
				shabi.list = list2;
				shabi.fyData = fyData;
				resolve(shabi);
			}).catch((e) => {
				console.error(e)
				resolve([]);
			})
		})
	},
	async publishList(page = 1) {
		return new Promise((resolve, reject) => {
			this.request({
				url: "/api/publisher/lists",
				data: {
					"site": 1,
					"device": 1,
					"timestamp": new Date().getTime(),
					"page": page,
					"limit": 60
				}
			}).then((res) => {
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
						name: list[i].name
					})
				}
				shabi.list = list2;
				shabi.fyData = fyData;
				resolve(shabi);
			}).catch((e) => {
				console.error(e)
				resolve([]);
			})
		})
	},
	async tagList(page = 1) {
		return new Promise((resolve, reject) => {
			this.request({
				url: "/api/tag/lists",
				data: {
					"site": 1,
					"device": 1,
					"timestamp": new Date().getTime(),
					"page": page,
					"limit": 120
				}
			}).then((res) => {
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
						name: list[i].name,
						private: list[i].private,
						image: $utils.addImgKeyParam(list[i].image)
					})
				}
				shabi.list = list2;
				shabi.fyData = fyData;
				resolve(shabi);
			}).catch((e) => {
				console.error(e)
				resolve([]);
			})
		})
	},
	async seachList(keyword, page = 1) {
		return new Promise((resolve, reject) => {
			this.request({
				url: "/api/video/lists",
				data: {
					"site": 1,
					"device": 1,
					"timestamp": new Date().getTime(),
					"page": page,
					"limit": 12,
					"keyword": keyword
				}
			}).then((res) => {
				let shabi = $utils.dealVideo(res);
				resolve(shabi);
			}).catch((e) => {
				console.error(e)
				resolve([]);
			})
		})
	},
	async newList(page = 1, site = 1) {
		return new Promise((resolve, reject) => {
			this.request({
				url: "/api/video/lists",
				data: {
					"site": site,
					"device": 1,
					"timestamp": new Date().getTime(),
					"page": page,
					"limit": 12
				}
			}).then((res) => {
				let shabi = $utils.dealVideo(res);
				resolve(shabi);
			}).catch((e) => {
				console.error(e)
				resolve([]);
			})
		})
	},
	async hotList(page = 1) {
		return new Promise((resolve, reject) => {
			this.request({
				url: "/api/video/hotLists",
				data: {
					"site": 1,
					"device": 1,
					"timestamp": new Date().getTime(),
					"page": page,
					"limit": 12,
					"order": "1"
				}
			}).then((res) => {
				let shabi = $utils.dealVideo(res);
				resolve(shabi);
			}).catch((e) => {
				console.error(e)
				resolve([]);
			})
		})
	},
	async zwList(page = 1) {
		return new Promise((resolve, reject) => {
			this.request({
				url: "/api/video/lists",
				data: {
					"site": 1,
					"device": 1,
					"timestamp": new Date().getTime(),
					"page": page,
					"limit": 12,
					"type": "4"
				}
			}).then((res) => {
				let shabi = $utils.dealVideo(res);
				resolve(shabi);
			}).catch((e) => {
				console.error(e)
				resolve([]);
			})
		})
	},
	async getUrl(id, site = 1) {
		return new Promise((resolve, reject) => {
			this.request({
				url: "/api/video/getVideoUrl",
				data: {
					"site": site,
					"device": 1,
					"timestamp": new Date().getTime(),
					"vid": id
				}
			}).then((res) => {
				console.warn(res);
				resolve(res);
			}).catch((e) => {
				console.error(e)
				resolve([]);
			})
		})
	},
	async recommend(page = 1, site = 1) {
		return new Promise((resolve, reject) => {
			this.request({
				url: "/api/video/lists",
				data: {
					"site": site,
					"device": 1,
					"timestamp": new Date().getTime(),
					"page": page,
					"limit": 12
				}
			}).then((res) => {
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
						preview: $utils.addImgKeyParam(list[i].preview)
					})
				}
				resolve(list2);
			}).catch((e) => {
				console.error(e)
				resolve([]);
			})
		})
	},
	async login() {
		return new Promise((resolve, reject) => {
			this.request({
				url: "/api/user/login",
				data: {
					"site": 1,
					"device": 1,
					"username": "shabi123321",
					"password": "shabi123",
					"timestamp": new Date().getTime(),
				}
			}).then((res) => {
				console.warn(res);
				resolve(res);
			}).catch((e) => {
				console.error(e)
				resolve([]);
			})
		})
	},
	async indexList2(type, page = 1, site = 1) {
		return new Promise((resolve, reject) => {
			this.request({
				url: "/api/video/indexLists",
				data: {
					"site": site,
					"device": 1,
					"timestamp": new Date().getTime(),
					"page": page,
					"limit": 20,
					"type": type
				}
			}).then((res) => {
				let shabi = $utils.dealVideo(res);
				resolve(shabi);
			}).catch((e) => {
				console.error(e)
				resolve([]);
			})
		})
	},
	async actList2(id, page = 1, site = 1) {
		return new Promise((resolve, reject) => {
			this.request({
				url: "/api/video/lists",
				data: {
					"actor_id": id,
					"site": site,
					"device": 1,
					"timestamp": new Date().getTime(),
					"page": page,
					"limit": 20,
				}
			}).then((res) => {
				let shabi = $utils.dealVideo(res);
				resolve(shabi);
			}).catch((e) => {
				console.error(e)
				resolve([]);
			})
		})
	},
	async publishList2(id, page = 1, site = 1) {
		return new Promise((resolve, reject) => {
			this.request({
				url: "/api/video/lists",
				data: {
					"publisher_id": id,
					"site": site,
					"device": 1,
					"timestamp": new Date().getTime(),
					"page": 1,
					"limit": 20,
				}
			}).then((res) => {
				let shabi = $utils.dealVideo(res);
				resolve(shabi);
			}).catch((e) => {
				console.error(e)
				resolve([]);
			})
		})
	},
	async tagList2(id, page = 1, site = 1) {
		return new Promise((resolve, reject) => {
			this.request({
				url: "/api/video/lists",
				data: {
					"tag_id": id,
					"site": site,
					"device": 1,
					"timestamp": new Date().getTime(),
					"page": page,
					"limit": 20,
				}
			}).then((res) => {
				let shabi = $utils.dealVideo(res);
				resolve(shabi);
			}).catch((e) => {
				console.error(e)
				resolve([]);
			})
		})
	},
}