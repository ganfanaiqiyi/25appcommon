import CryptoJs from "crypto-js";
import clientConfig from "./clientConfig.js";
import $utils from "./utils.js";
import {
	getBaseUrl
} from "./apiLines.js";
export default {
	request(options = {}) {
		return new Promise((resolve, reject) => {
			let baseUrl = "";

			// #ifdef H5
			baseUrl = getBaseUrl();
			// #endif

			options.url = baseUrl + options.url;
			if (options.header.token) {
				options.header["token"] = uni.getStorageSync("token");
				// console.warn(uni.getStorageSync("token"))
			} else {
				options.header = {};
			}

			options.header["Content-Type"] = "application/x-www-form-urlencoded";

			options.data = {
				data: this.aesEncrypt(JSON.stringify(options.data))
			};

			options.method = "POST";
			// options.dataType = options.dataType || "text";
			options.timeout = 10000;
			uni.request({
				...options,
				success: (result) => {
					// console.warn(result)
					if (result.statusCode != 200) {
						// console.error("请求失败!result:" + JSON.stringify(result));
						return reject();
					}
					if (result.data.code != 1) {
						return reject(result.data.msg);
					}
					if (result.data.data) {
						// console.warn(this.aesDecrypt(result.data.data))
						let resultData = JSON.parse(this.aesDecrypt(result.data.data));
						// console.warn(resultData)
						return resolve(resultData);
					} else {
						return resolve(result.data.msg);
					}
				},
				fail: (result) => {
					// console.error(result)
					return reject(result);
				}
			})
		})
	},
	aesEncrypt(word) {
		let key = CryptoJs.enc.Utf8.parse(clientConfig.appKEY);
		let iv = CryptoJs.enc.Utf8.parse(clientConfig.appIV);
		let srcs = CryptoJs.enc.Utf8.parse(word);
		let encrypted = CryptoJs.AES.encrypt(srcs, key, {
			iv: iv,
			mode: CryptoJs.mode.CBC,
			padding: CryptoJs.pad.Pkcs7
		});
		return encrypted.ciphertext.toString(CryptoJs.enc.Base64);
	},
	aesDecrypt(message) {
		let key = CryptoJs.enc.Utf8.parse(clientConfig.appKEY);
		let iv = CryptoJs.enc.Utf8.parse(clientConfig.appIV);
		let decrypted = CryptoJs.AES.decrypt(message, key, {
			iv: iv,
			mode: CryptoJs.mode.CBC,
			padding: CryptoJs.pad.Pkcs7
		});
		return decrypted.toString(CryptoJs.enc.Utf8);
	},
	ad_report(id) {
		this.request({
			url: "/api.php/addons/appbox/api/ad_report",
			method: "POST",
			header: {
				token: true
			},
			data: {
				"id": id
			},
		}).then((res) => {
			// console.log(res);
		}).catch((e) => {
			// console.error(e)
			//登录失败
			return;
		})
	},
	async getVideoUrl(id, site = 1) {
		return new Promise((resolve, reject) => {
			this.request({
				url: "/api.php/addons/appbox/api/getVideoUrl",
				method: "POST",
				header: {
					token: true
				},
				data: {
					"vid": id,
					'site': site
				},
			}).then((res) => {
				// console.log(res);
				resolve(res.url);
			}).catch((e) => {
				// console.error(e)
				resolve("");
				return;
			})
		});
	}
}