<script setup>
import { ref, computed, markRaw, onMounted } from 'vue'
import HomePage from './components/HomePage.vue'
import DarkWebPage from './components/DarkWebPage.vue'
import AcgPage from './components/AcgPage.vue'
import NovelPage from './components/NovelPage.vue'
import ProfilePage from './components/ProfilePage.vue'
import SearchPage from './components/SearchPage.vue'
import PlayerPage from './components/PlayerPage.vue'
import LoginPage from './components/LoginPage.vue'
import RegisterPage from './components/RegisterPage.vue'
import appConfig from './config/appConfig.json'
import hs_logo from './assets/hs_logo.png'
import t1 from './assets/t1.jpg'
import t11 from './assets/t11.jpg'
import t2 from './assets/t2.jpg'
import t22 from './assets/t22.jpg'
import t3 from './assets/t3.jpg'
import t33 from './assets/t33.jpg'
import t4 from './assets/t4.jpg'
import t44 from './assets/t44.jpg'
import t5 from './assets/t5.jpg'
import t55 from './assets/t55.jpg'

// 菜单图标映射
const menuIconMap = {
  '/src/assets/t1.jpg': t1,
  '/src/assets/t11.jpg': t11,
  '/src/assets/t2.jpg': t2,
  '/src/assets/t22.jpg': t22,
  '/src/assets/t3.jpg': t3,
  '/src/assets/t33.jpg': t33,
  '/src/assets/t4.jpg': t4,
  '/src/assets/t44.jpg': t44,
  '/src/assets/t5.jpg': t5,
  '/src/assets/t55.jpg': t55
}


// 底部菜单数据
const menuItems = ref(appConfig.menu.items.map(item => ({
  ...item,
  component: markRaw(getComponentByText(item.text)),
  icon: menuIconMap[item.icon] || item.icon,
  activeIcon: menuIconMap[item.activeIcon] || item.activeIcon
})))

// 根据文字获取对应的组件
function getComponentByText(text) {
  switch(text) {
    case '看片': return HomePage
    case '暗网': return DarkWebPage
    case '漫画': return AcgPage
    case '小说': return NovelPage
    case '赚钱': return HomePage
    case '我的': return ProfilePage
    default: return HomePage
  }
}


// 当前激活的菜单索引
const activeMenuIndex = ref(0)

// 当前页面状态：'menu'、'search'、'player'、'login' 或 'register'
const currentPage = ref('menu')

// 当前视频信息
const currentVideoInfo = ref(null)

// 是否隐藏"APP内打开"按钮（根据 URL 参数 app=true）
const shouldHideOpenButton = ref(false)

// 监听URL变化，处理路由
const handleRouteChange = () => {
  const hash = window.location.hash.substring(1)
  if (hash === 'login') {
    currentPage.value = 'login'
  } else if (hash === 'register') {
    currentPage.value = 'register'
  } else {
    // 如果没有hash，保持在当前菜单状态，不要强制跳转到首页
    if (currentPage.value === 'menu') {
      // 只有在已经是menu状态时才保持menu状态
      currentPage.value = 'menu'
    }
    // 其他情况保持当前状态不变
  }
}

onMounted(() => {
  try {
    const params = new URLSearchParams(window.location.search)
    shouldHideOpenButton.value = params.get('app') === 'true'
  } catch (e) {
    shouldHideOpenButton.value = false
  }
  
  // 监听hash变化
  window.addEventListener('hashchange', handleRouteChange)
  // 初始化路由
  handleRouteChange()
})

// 设置激活菜单
const setActiveMenu = (index) => {
  activeMenuIndex.value = index
  currentPage.value = 'menu'
}

// 根据菜单文本获取在原始菜单中的索引（避免启用/禁用导致的索引错位）
const getIndexByText = (text) => {
  return menuItems.value.findIndex((i) => i.text === text)
}

// 通过菜单文本设置激活菜单
const setActiveMenuByText = (text) => {
  const idx = getIndexByText(text)
  if (idx !== -1) {
    activeMenuIndex.value = idx
    currentPage.value = 'menu'
  }
}

// 显示搜索页面
const showSearchPage = () => {
  currentPage.value = 'search'
}

// 返回菜单页面
const goBackToMenu = () => {
  currentPage.value = 'menu'
  currentVideoInfo.value = null
}

// 显示播放器页面
const showPlayerPage = (videoInfo) => {
  currentVideoInfo.value = videoInfo
  currentPage.value = 'player'
}

// 播放相关视频
const playRelatedVideo = (videoInfo) => {
  currentVideoInfo.value = videoInfo
  // 保持在播放器页面，只更新视频信息
}

// 打开外部链接：按平台下载 APK 或 mobileconfig
const openExternalLink = () => {
  const ua = navigator.userAgent || ''
  const isIOS = /iPhone|iPad|iPod/i.test(ua)
  const isAndroid = /Android/i.test(ua)

  const apkUrl = '/kanpian.apk'
  const iosProfileUrl = '/kanpian.mobileconfig'

  const targetUrl = isIOS ? iosProfileUrl : apkUrl

  // 直接触发下载/打开
  const a = document.createElement('a')
  a.href = targetUrl
  a.download = ''
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

// 获取当前页面组件
const currentComponent = computed(() => {
  if (currentPage.value === 'search') {
    return SearchPage
  } else if (currentPage.value === 'player') {
    return PlayerPage
  } else if (currentPage.value === 'login') {
    return LoginPage
  } else if (currentPage.value === 'register') {
    return RegisterPage
  }
  return menuItems.value[activeMenuIndex.value].component
})
</script>

<template>
  <div id="app">
    <!-- 动态页面内容 -->
    <component 
      :is="currentComponent" 
      :showSearchPage="showSearchPage"
      :videoInfo="currentVideoInfo"
      @goBack="goBackToMenu"
      @playVideo="showPlayerPage"
      @playRelatedVideo="playRelatedVideo"
    />

    <!-- 固定按钮 -->
    <button 
      v-if="!shouldHideOpenButton && currentPage === 'menu'" 
      class="fixed-button" 
      @click="openExternalLink"
    >
      <svg class="download-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 15.75L12 3.75M12 15.75L8.25 12M12 15.75L15.75 12M3.75 15.75L3.75 19.5C3.75 20.3284 4.42157 21 5.25 21L18.75 21C19.5784 21 20.25 20.3284 20.25 19.5L20.25 15.75" stroke="#eb9eb6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="button-text">下载APP</span>
    </button>

    <!-- 底部菜单栏 -->
    <nav v-if="appConfig.menu.enabled && currentPage === 'menu'" class="bottom-menu">
      <button
        class="menu-item"
        v-for="(item, index) in menuItems.filter(item => item.enabled)"
        :key="item.text"
        :class="{ active: activeMenuIndex === getIndexByText(item.text) }"
        @click="setActiveMenuByText(item.text)"
        :aria-label="item.text"
        type="button"
      >
        <img
          :src="activeMenuIndex === getIndexByText(item.text) ? item.activeIcon : item.icon"
          :alt="item.text"
          class="menu-icon"
        />
        <span class="menu-text">{{ item.text }}</span>
      </button>
    </nav>
  </div>
</template>

<style scoped>
#app {
  background-color: #ffffff;
  height: 100vh;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

/* 为中间内容区域设置不同的背景色 */
#app::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  z-index: -1;
}

/* 底部菜单栏样式 */
.bottom-menu {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 500px;
  height: 0.75rem; /* 50px = 0.75rem (50/66.67) */
  background-color: #eb9eb6;
  border-top: 0.015rem solid #333333; /* 1px = 0.015rem (1/66.67) */
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex: 1;
  height: 100%;
  transition: all 0.2s ease;
  border: none;
  background: none;
  outline: none;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.menu-item:focus {
  outline: none;
  background-color: rgba(255, 255, 255, 0.05);
}

.menu-item:active {
  background-color: rgba(255, 255, 255, 0.1);
}

.menu-icon {
  width: 0.36rem; /* 24px = 0.36rem (24/66.67) */
  height: 0.36rem; /* 24px = 0.36rem (24/66.67) */
  margin-bottom: 0.075rem; /* 5px = 0.075rem (5/66.67) */
  object-fit: contain;
}

.svg-icon {
  width: 0.36rem; /* 24px = 0.36rem (24/66.67) */
  height: 0.36rem; /* 24px = 0.36rem (24/66.67) */
  margin-bottom: 0.075rem; /* 5px = 0.075rem (5/66.67) */
  transition: all 0.2s ease;
}


.menu-text {
  font-size: 0.15rem; /* 10px = 0.15rem (10/66.67) */
  color: #ffffff;
  transition: color 0.2s ease;
}

.menu-item.active .menu-text {
  color: #eeff3c;
}

/* 固定按钮样式 */
.fixed-button {
  position: fixed;
  bottom: 0.825rem; /* 55px = 0.825rem (55/66.67) - 底部菜单50px + 10px间距 */
  left: 50%;
  transform: translateX(-50%);
  width: 2.4rem; /* 160px = 2.4rem (160/66.67) - 减小宽度 */
  height: 0.45rem; /* 30px = 0.45rem (30/66.67) */
  background-color: #ffffff; /* 白色背景 */
  border: none;
  border-radius: 0.225rem; /* 15px = 0.225rem (15/66.67) */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.15rem; /* 10px = 0.15rem (10/66.67) */
  cursor: pointer;
  z-index: 1001;
  box-shadow: 0 0.03rem 0.12rem rgba(0, 0, 0, 0.3); /* 2px 8px */
  transition: all 0.2s ease;
}

.fixed-button:hover {
  background-color: #f5f5f5; /* 浅灰色悬停效果 */
  transform: translateX(-50%) translateY(-0.015rem); /* 向上移动1px */
}

.fixed-button:active {
  transform: translateX(-50%) translateY(0.015rem); /* 向下移动1px */
}

.download-icon {
  width: 0.24rem; /* 16px = 0.24rem (16/66.67) */
  height: 0.24rem; /* 16px = 0.24rem (16/66.67) */
  margin-right: 0.075rem; /* 5px = 0.075rem (5/66.67) */
}

.button-text {
  font-size: 0.165rem; /* 11px = 0.165rem (11/66.67) */
  color: #eb9eb6; /* 粉色文字 */
  font-weight: 500;
  text-align: center;
}
</style>
