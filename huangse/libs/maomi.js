import CryptoJs from "crypto-js";
import $utils from "./utils.js"
export default {
	request(options = {}) {
		let clientConfig = JSON.parse(uni.getStorageSync('mmConfig'));
		return new Promise((resolve, reject) => {
			options.url = clientConfig.mmBaseUrl + options.page + clientConfig.mmCateListSuffix[options.index];
			options.page = null;
			options.index = null;
			options.header = options.header || {};

			// options.header["Content-Type"] = "application/json";
			// options.header["suffix"] = "NWSdef";

			options.method = "GET";
			options.dataType = options.dataType || "text";
			options.timeout = 5000;
			// console.warn(options)
			uni.request({
				...options,
				timeout: 5000,
				success: (result) => {
					if (result.statusCode != 200) {
						console.error("请求失败!result:" + JSON.stringify(result));
						return reject();
					}
					let jsonData = JSON.parse(result.data);
					if (jsonData.code != 200) {
						return reject(jsonData.msg);
					}

					let resultData = JSON.parse(this.aesDecryptMM(clientConfig, jsonData.data.data,
						jsonData.data
						.suffix));
					// console.warn(resultData)
					return resolve(resultData);
				},
				fail: (result) => {
					console.error(result)
					return reject(result);
				}
			})
		})
	},
	aesDecryptMM(clientConfig, message, suffix) {
		let key = CryptoJs.enc.Utf8.parse(clientConfig.mmKEY);
		let iv = CryptoJs.enc.Utf8.parse(clientConfig.mmIV + suffix);
		let decrypted = CryptoJs.AES.decrypt(message, key, {
			iv: iv,
			mode: CryptoJs.mode.CBC,
			padding: CryptoJs.pad.Pkcs7
		});
		return decrypted.toString(CryptoJs.enc.Utf8);
	},
	async indexList(index = 0, page = 1) {
		return new Promise((resolve, reject) => {
			this.request({
				page: page,
				index: index
			}).then((res) => {
				let shabi = {};
				let fyData = {
					totalCount: res.totalSize,
					pageCount: res.size,
					currentPage: res.page,
					maxPage: res.totalPage
				}
				let newList = [];
				let lenlen = 12;
				if (res.list && res.list.length < 12) {
					lenlen = res.list.len;
				}
				for (let i=0;i<lenlen;i++) {
					let item = res.list[i];
					if (item.title.indexOf("猫咪") == -1) {
						newList.push(item);
					}
				}

				for (let item of newList) {
					let arr = [];
					let len2 = 2;
					if (item.video_cover) {
						arr.push(item.video_cover);
						item.hasVideo = true;
						len2 = 1;
					}
					if (item.photo_albums) {
						let len = item.photo_albums.length <= len2 ? item.photo_albums.length :
							len2;
						for (let i = 0; i < len; i++) {
							arr.push(item.photo_albums[i]);
						}
						item.arrCover = arr;
					}
					// item.content = item.content.replace(/<\/?p>/g, "");
				}
				shabi.list = newList;
				shabi.fyData = fyData;
				resolve(shabi);
			}).catch((e) => {
				console.error(e)
				resolve(false);
			})
		})
	}
}