import line from '../uni_modules/uview-ui/libs/config/props/line';
import AES from '@/libs/aes.js'
import clientConfig from "@/libs/clientConfig.js";

let LINES = clientConfig.LINES;

let TASKS = []

function abortTasks() {
	if (TASKS && TASKS.length >= 1) {
		for (let i = 0; i < TASKS.length; i++) {
			TASKS[i]?.abort();
		}
	}
}

function firstCheckLines(line) {
	checkLine(line,
		res => {
			if (res.statusCode === 200) {
				abortTasks();
				setBaseUrl(line, 'firstCheckLines');
				console.warn('firstCheckLines-res-Code == 200', line)
			} else {
				checkLines();
				console.warn('firstCheckLines-res-else', line)
			}
		},
		err => {
			console.error('firstCheckLines-err', line)
			checkLines();
		})
}

function checkLines() {
	for (let i = 0; i < LINES.length; i++) {
		let curLine = LINES[i];
		if (curLine.includes('.txt')) {
			try {
				let down_task_http = uni.request({
					sslVerify: false,
					url: curLine,
					timeout: 60 * 1000,
					success: res => {
						const aes = new AES('1234567890123456')
						if (res.statusCode === 200) {
							const data = res.data
							let result = ''
							if (data.includes('http')) {
								result = data
							} else {
								result = aes.decrypt(data)
							}

							let domainlist = result.split(/[(\r\n)\r\n]+/)

							console.log('checkLines-all解密：', 'curLine:', curLine, result)

							for (let j = 0; j < domainlist.length; j++) {
								let task_http = checkLine(domainlist[j],
									res => {
										if (res.statusCode === 200) {
											abortTasks();
											setBaseUrl(domainlist[j],
												'checkLines-APP-PLUS')
										}
									}, res => {})
								TASKS.push(task_http)
							}
						}

					},
					fail: err => {
						console.error("APP-PLUS-line-request-fail", curLine, err);
					}
				})
				TASKS.push(down_task_http)
			} catch (e) {
				console.error("APP-PLUS-line-catch", e);
			}
		} else {
			let task_http = checkLine(curLine, res => {
				// console.log('成功url:'+ curLine)
				if (res.statusCode === 200) {
					abortTasks();
					setBaseUrl(curLine, 'checkLines-else')
				}
			}, res => {})
			TASKS.push(task_http)
		}

		if (i % 20 == 0) {
			new Promise(resolve => setTimeout(resolve, 200));
		}
	}
}

function checkLine(url, success, fail) {
	console.warn("检测 url = " + url);
	try {
		// #ifdef H5
			url="";
		// #endif
		return uni.request({
			sslVerify: false,
			url: url + '/api.php/addons/appbox/api/checkline',
			// url: '/api.php/addons/appbox/api/checkline',
			timeout: 60 * 1000,

			success: res => {
				if (res.statusCode === 200) {
					// console.warn("线路成功:", 'url=', url, res);
					success(res)
				} else {
					console.error("线路失败1:", 'url=', url, res);
					fail(res)
				}
			},
			fail: res => {
				// console.error("线路失败2:", 'url=', url, res);
				fail(res)
			}
		});

	} catch (e) {
		//TODO handle the exception
	}

}

function setBaseUrl(newUrl, from = 'setBaseUrl') {
	uni.setStorageSync("domain_api", newUrl);
	console.warn("获取最快路线:", newUrl, ",来自:", from);
	return true
}

export function getBaseUrl() {
	let ret = uni.getStorageSync("domain_api")
	return ret
}

//先检测第1条线路，如果在2秒内超时，则开始遍历所有线路，选择速度最快的
export async function checkBaseUrl() {
	var domain_api = uni.getStorageSync("domain_api");
	console.log(domain_api);
	if(domain_api){
		console.warn('之前能用的:',domain_api)
	}
	let b = false;
	if (domain_api) {
		console.warn(domain_api);
		for (let i = 0; i < LINES.length; i++) {
			if (domain_api == LINES[i]) {
				b = true;
			}
		}
	}
	if(!b&&domain_api){
		LINES.unshift(domain_api);
	}
	// console.warn(b);
	console.warn(LINES);
	
	try {
		uni.removeStorageSync('domain_api');
	} catch (e) {
		// error
		console.error(e);
	}
	

	// uni.setStorageSync(, "");
	checkLines();
	// console.log("检查线路:" + domain_api);
	//先检测第1条线路，如果在2秒内超时，则开始遍历所有线路，选择速度最快的
	// if (domain_api && domain_api.startsWith("http")) {
	// 	firstCheckLines(domain_api)
	// } else {
	// 	checkLines()
	// }
}