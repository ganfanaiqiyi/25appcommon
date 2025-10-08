import App from './App'
import store from 'store'
import Vue from 'vue'
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
import './uni.promisify.adaptor'
Vue.config.productionTip = false
//用于app.vue初始化完再运行首页
Vue.prototype.$onLaunched = new Promise(resolve => {
	Vue.prototype.$isResolve = resolve;
});
App.mpType = 'app'

Vue.prototype.$store = store;

const app = new Vue({
	store,
  ...App
})
app.$mount()