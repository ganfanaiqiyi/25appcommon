<script setup>
import { ref, computed, markRaw, onMounted } from 'vue'
import HomePage from './components/HomePage.vue'
import VideoPage from './components/VideoPage.vue'
import AcgPage from './components/AcgPage.vue'
import ProfilePage from './components/ProfilePage.vue'
import SearchPage from './components/SearchPage.vue'
import PlayerPage from './components/PlayerPage.vue'
import appConfig from './config/appConfig.json'

// 底部菜单数据
const menuItems = ref(appConfig.menu.items.map(item => ({
  ...item,
  component: markRaw(getComponentByText(item.text))
})))

// 根据文字获取对应的组件
function getComponentByText(text) {
  switch(text) {
    case '首页': return HomePage
    case '视频': return VideoPage
    case 'ACG': return AcgPage
    case '我的': return ProfilePage
    default: return HomePage
  }
}

// 当前激活的菜单索引
const activeMenuIndex = ref(0)

// 当前页面状态：'menu'、'search' 或 'player'
const currentPage = ref('menu')

// 当前视频信息
const currentVideoInfo = ref(null)

// 是否隐藏“APP内打开”按钮（根据 URL 参数 app=true）
const shouldHideOpenButton = ref(false)
onMounted(() => {
  try {
    const params = new URLSearchParams(window.location.search)
    shouldHideOpenButton.value = params.get('app') === 'true'
  } catch (e) {
    shouldHideOpenButton.value = false
  }
})

// 设置激活菜单
const setActiveMenu = (index) => {
  activeMenuIndex.value = index
  currentPage.value = 'menu'
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

  const apkUrl = '/huangse_101.apk'
  const iosProfileUrl = '/huangse_101.mobileconfig'

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
      v-if="!shouldHideOpenButton" 
      class="fixed-button" 
      @click="openExternalLink"
    >
      <img src="/src/assets/hs_logo.png" alt="黄色仓库" class="logo-image" />
      <span class="button-text">{{ appConfig.button.text }}</span>
    </button>

    <!-- 底部菜单栏 -->
    <nav v-if="appConfig.menu.enabled && currentPage === 'menu'" class="bottom-menu">
      <button
        class="menu-item"
        v-for="(item, index) in menuItems.filter(item => item.enabled)"
        :key="index"
        :class="{ active: activeMenuIndex === index }"
        @click="setActiveMenu(index)"
        :aria-label="item.text"
        type="button"
      >
        <img
          :src="activeMenuIndex === index ? item.activeIcon : item.icon"
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
  background-color: #000000;
  height: 100vh;
  width: 100%;
  max-width: 430px; /* 430px = 5.972rem (430/72) */
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
  background-color: #0e0e0e;
  z-index: -1;
}

/* 底部菜单栏样式 */
.bottom-menu {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  height: 1.221rem; /* 70px = 1.221rem (70/57.33) */
  background-color: #000000;
  border-top: 0.017rem solid #333333; /* 1px = 0.017rem (1/57.33) */
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
  width: 0.418rem; /* 24px = 0.418rem (24/57.33) */
  height: 0.418rem; /* 24px = 0.418rem (24/57.33) */
  margin-bottom: 0.087rem; /* 5px = 0.087rem (5/57.33) */
  object-fit: contain;
}

.menu-text {
  font-size: 0.174rem; /* 10px = 0.174rem (10/57.33) */
  color: #ffffff;
  transition: color 0.2s ease;
}

.menu-item.active .menu-text {
  color: #f6bf00;
}

/* 固定按钮样式 */
.fixed-button {
  position: fixed;
  bottom: 1.744rem; /* 100px = 1.744rem (100/57.33) - 底部菜单高度70px + 30px间距 */
  left: 50%;
  transform: translateX(-50%);
  width: 3.839rem; /* 220px = 3.839rem (220/57.33) */
  height: 0.523rem; /* 30px = 0.523rem (30/57.33) */
  background-color: rgba(255, 140, 0, 0.8); /* 80%透明度 */
  border: none;
  border-radius: 0.262rem; /* 15px = 0.262rem (15/57.33) */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.174rem; /* 10px = 0.174rem (10/57.33) */
  cursor: pointer;
  z-index: 1001;
  box-shadow: 0 0.035rem 0.139rem rgba(0, 0, 0, 0.3); /* 2px 8px */
  transition: all 0.2s ease;
}

.fixed-button:hover {
  background-color: rgba(255, 149, 0, 0.9); /* 90%透明度 */
  transform: translateX(-50%) translateY(-0.017rem); /* 向上移动1px */
}

.fixed-button:active {
  transform: translateX(-50%) translateY(0.017rem); /* 向下移动1px */
}

.logo-image {
  width: 0.418rem; /* 24px = 0.418rem (24/57.33) */
  height: 0.418rem; /* 24px = 0.418rem (24/57.33) */
  object-fit: contain;
  margin-right: 0.035rem; /* 2px = 0.035rem (2/57.33) - 更紧贴文字 */
}

.button-text {
  /* flex: 1; */
  font-size: 0.192rem; /* 11px = 0.192rem (11/57.33) */
  color: #000000;
  font-weight: 500;
  text-align: center;
}
</style>
