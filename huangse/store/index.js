import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

export default new Vuex.Store({
	plugins: [
	  createPersistedState({
	    key: 'myApp',
	    paths: ['systemInfo', 'userInfo', 'goods', 'pipes', 'launchAd', 'floatAd', 'iconAd', 'bannerAd', 'yuepaoAd','chunyaoAd','forumDetail','insConfig','mmConfig'],
	    storage: {
	      getItem: key => uni.getStorageSync(key),
	      setItem: (key, value) => uni.setStorageSync(key, value),
	      removeItem: key => uni.removeStorageSync(key)
	    }
	  })
	],
	state: {
		systemInfo: null,
		userInfo: null,
		goods:[],
		pipes:[],
		//广告id对应 1:开屏广告 2:首页弹窗广告 3:小图标广告 4:轮播图广告
		launchAd: [], //1
		floatAd: [], //2
		iconAd: [], //3
		bannerAd: [], //4
		yuepaoAd:[],//5
		chunyaoAd:[],
		forumDetail:{},
		insConfig:[],
		mmConfig:[]
	},
	getters: {},
	mutations: {
		initSystemInfo(state, value) {
			// console.log("initSystemInfo......")
			// console.log(value)
			state.systemInfo = value;
		},
		//第一次获取 时配置，用户信息和1:开屏广告 2:首页浮动广告 3:小图标广告 4:轮播图广告 
		initConfig(state, value) {
			// console.log("initConfig......")
			// console.log(value)
			state.token = value.token;
			state.goods = value.goods;
			state.pipes = value.pipes;
			uni.setStorageSync("token", value.token);
			state.appConfig = value.appConfig;
			state.insConfig = value.appConfig.insConfig;
			uni.setStorageSync("insConfig", JSON.stringify(value.appConfig.insConfig));
			state.mmConfig = value.mmConfig;
			uni.setStorageSync("mmConfig", JSON.stringify(value.appConfig.mmConfig));
			uni.setStorageSync("mmImageUrl", value.appConfig.mmConfig.mmImageUrl);
			state.userInfo = value.userinfo;
			uni.setStorageSync("userInfo", JSON.stringify(value.userinfo));
			state.launchAd = [];
			state.floatAd = [];
			state.iconAd = [];
			state.bannerAd = [ {
            "id": 1454,
            "positionId": 3,
            "title": "vip",
            "image": "/static/images/bannerVIP.jpg",
            "url": "",
            "desc": ""
        }];
			state.yuepaoAd = [];
			state.chunyaoAd = [];
			for(let ad of value.adConfig){
				if(ad.positionId=="1"){
					state.launchAd.push(ad);
				}else if(ad.positionId=="2"){
					state.floatAd.push(ad);
				}else if(ad.positionId=="3"){
					state.iconAd.push(ad);
				}else if(ad.positionId=="4"){
					state.bannerAd.push(ad);
				}else if(ad.positionId=="5"){
					state.yuepaoAd.push(ad);
				}else if(ad.positionId=="6"){
					state.chunyaoAd.push(ad);
				}
			}
			
			// state.launchAd.sort((a, b) => b.sort - a.sort);
			// state.floatAd.sort((a, b) => b.sort - a.sort);
			// state.iconAd.sort((a, b) => b.sort - a.sort);
			// state.bannerAd.sort((a, b) => b.sort - a.sort);
		},
		updateUser(state, value){
			console.log("updateUser......");
			console.log(value);
			state.token = value.token;
			uni.setStorageSync("token", value.token);
			uni.setStorageSync("uuid", value.userinfo.deviceid);
			state.userInfo = value.userinfo;
			uni.setStorageSync("userInfo", JSON.stringify(value.userinfo));
		},
		updateVipInfo(state, value) {
			// console.log("updateVipInfo......");
			// console.log(value);
			state.userInfo = value;
			uni.setStorageSync("userInfo", JSON.stringify(value));
		},
		setForum(state,value){
			state.forumDetail = value;
		}
	},
	actions: {},
})