// 封装 aes加密算法，要求密码必须是16位纯数字
const CryptoJS = require("crypto-js");

class AES {
	constructor(password) {
		if (password.toString().length === 16) {
			this.password = password.toString(); //密码必须是16位数
		} else {
			throw '密码必须是16位纯数字';
		}
	}
	encrypt(word) {
		let key = CryptoJS.enc.Utf8.parse(this.password);
		let iv = CryptoJS.enc.Utf8.parse('');
		let srcs = CryptoJS.enc.Utf8.parse(word);
		let encrypted = CryptoJS.AES.encrypt(srcs, key, {
			iv: iv,
			mode: CryptoJS.mode.CBC
		});
		return encrypted.toString();
	}
	decrypt(word) {
		let key = CryptoJS.enc.Utf8.parse(this.password);
		let iv = CryptoJS.enc.Utf8.parse('');
		let decrypt = CryptoJS.AES.decrypt(word, key, {
			iv: iv,
			mode: CryptoJS.mode.CBC
		});
		return CryptoJS.enc.Utf8.stringify(decrypt).toString();
	}

	decryptECB(word) {
		let key = CryptoJS.enc.Utf8.parse(this.password);
		let iv = CryptoJS.enc.Utf8.parse('');
		let decrypt = CryptoJS.AES.decrypt(word, key, {
			iv: iv,
			mode: CryptoJS.mode.ECB
		});
		return CryptoJS.enc.Utf8.stringify(decrypt).toString();
	}
};

module.exports = AES;