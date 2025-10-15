<template>
  <div class="home-page">
    <!-- 顶部导航栏 -->
    <header class="top-header">
      <!-- 左侧：菜单按钮和铃铛按钮 -->
      <div class="header-left">
        <button class="header-button menu-button" @click="toggleMenu">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <button class="header-button bell-button" @click="showNotifications">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </button>
      </div>

      <!-- 中间：标题 -->
      <div class="header-center">
        <h1 class="header-title">看片视频</h1>
      </div>

      <!-- 右侧：VIP图标和搜索图标 -->
      <div class="header-right">
        <button class="header-button vip-button" @click="showVip">
          <span class="vip-text">VIP</span>
        </button>
        <button class="header-button search-button" @click="showSearch">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
        </button>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 轮播图区域 -->
      <section class="carousel-section">
        <div class="carousel-container">
          <div class="carousel-wrapper" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
            <div
              class="carousel-slide"
              v-for="(item, index) in carouselAds"
              :key="index"
              @click="handleAdClick(item.url)"
            >
              <ImageWithFallback :src="item.image" :alt="item.title" class="carousel-image" />
            </div>
          </div>
          <!-- 轮播图指示器 -->
          <div class="carousel-indicators">
            <button
              v-for="(item, index) in carouselAds"
              :key="index"
              class="indicator"
              :class="{ active: currentSlide === index }"
              @click="goToSlide(index)"
            ></button>
          </div>
        </div>
      </section>

      <!-- 分类菜单区域 -->
      <section class="category-menu-section">
        <div class="category-menu-container">
          <!-- 小说专区 -->
          <div class="main-category novel-category">
            <div class="category-icon-section">
              <div class="category-icon">
                <img src="/src/assets/c2.webp" alt="小说专区" class="category-icon-img" />
              </div>
              <div class="category-title">小说专区</div>
            </div>
            <div class="sub-categories">
              <div class="sub-category-row">
                <span class="sub-category" v-for="(item, index) in novelCategories.slice(0, 4)" :key="index" @click="refreshPage">{{ item }}</span>
              </div>
              <div class="sub-category-row">
                <span class="sub-category" v-for="(item, index) in novelCategories.slice(4, 8)" :key="index + 4" @click="refreshPage">{{ item }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 官方推荐横幅 -->
      <section class="recommendation-banner">
        <div class="banner-content">
          <span class="official-text">官方推荐</span>
          <span class="description-text">APP亲测无毒，狼友多下载几款防丢失</span>
        </div>
      </section>

      <!-- 小图标广告区域 -->
      <section class="icon-ads-section">
        <div class="icon-ads-grid">
          <div
            class="icon-ad-item"
            v-for="(ad, index) in iconAds"
            :key="index"
            @click="handleAdClick(ad.url)"
          >
            <ImageWithFallback :src="ad.image" :alt="ad.title" class="icon-ad-image" />
            <p class="icon-ad-title">{{ ad.title }}</p>
          </div>
        </div>
      </section>

      <!-- 小说横幅 -->
      <section class="domestic-banner">
        <div class="banner-content" @click="switchCategory">
          <span class="domestic-text">{{ currentCategoryName }}</span>
        </div>
      </section>

      <!-- 小说列表区域 -->
      <section class="novel-list-section">
        <div class="novel-list-container">
          <div 
            class="novel-list-item" 
            v-for="(novel, index) in novelList" 
            :key="index"
            @click="goToLogin"
          >
            <span class="novel-category-tag">[全部]</span>
            <span class="novel-title">{{ novel.title }}</span>
          </div>
        </div>
        
        <!-- 分页控件 -->
        <div class="pagination-container">
          <div class="pagination">
            <button class="page-btn prev-btn">&lt;</button>
            <button class="page-btn current-page">1</button>
            <button class="page-btn">2</button>
            <button class="page-btn">3</button>
            <button class="page-btn">4</button>
            <button class="page-btn">5</button>
            <span class="page-ellipsis">...</span>
            <button class="page-btn">431</button>
            <button class="page-btn next-btn">&gt;</button>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import adsConfig from '../config/ads.json'
import appConfig from '../config/appConfig.json'
import menuConfig from '../config/menu.json'
import ImageWithFallback from './ImageWithFallback.vue'
import { openUrl } from '../utils/webviewUtils.js'

// 接收父组件传递的函数
const props = defineProps({
  showSearchPage: {
    type: Function,
    required: true
  }
})

// 轮播图数据
const carouselAds = ref(adsConfig.ads.carousel || [])
const currentSlide = ref(0)
const slideInterval = ref(null)

// 小图标广告（与首页一致）
const iconAds = ref((adsConfig.ads.icon || []).slice(0, appConfig.ads.iconAdsCount))

// 小说专区子分类
const novelCategories = ref(['近亲乱伦', '学生校园', '明星系列', 'MG电子', '以小博大', '电子游艺', '视讯真人', '武侠小说'])

const selectedCategory = ref(0) // 默认选中近亲乱伦

// 计算当前分类名称
const currentCategoryName = computed(() => {
  const category = novelCategories[selectedCategory.value];
  return category ? category.type_name : '近亲乱伦'
})

// 小说列表数据
const novelList = ref([
  { title: '风雨夜母子情' },
  { title: '与女朋友同房' },
  { title: '哥' },
  { title: '被挟持的一家人!!' },
  { title: '春暖花开' },
  { title: '打烊后' },
  { title: '师生与师母' },
  { title: '往日情怀' },
  { title: '狙击女教官' },
  { title: '钱包桃花运' },
  { title: '花木兰演义' },
  { title: '小文的经历' },
  { title: '若妻 凌辱生人形' },
  { title: '如娼的旋律' },
  { title: '超级淫妇' },
  { title: '悦乐学园' },
  { title: '让女友暴露吧' },
  { title: '欢喜禅' },
  { title: '婚姻之外' },
  { title: '倚天屠龙别记' },
  { title: '狂拳传说' },
  { title: '江湖行' },
  { title: '伐国舅' },
  { title: '献给哥哥' },
  { title: '新妻情如' },
  { title: '失控的母子' },
  { title: '梧桐影' },
  { title: '淫母与美少女及家庭老师' },
  { title: '吾妻玲玲' },
  { title: '新覆雨翻云' }
])


// 轮播图方法
const goToSlide = (index) => {
  currentSlide.value = index
}

const startCarousel = () => {
  slideInterval.value = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % carouselAds.value.length
  }, 3000)
}

const stopCarousel = () => {
  if (slideInterval.value) {
    clearInterval(slideInterval.value)
    slideInterval.value = null
  }
}

// 处理广告点击
const handleAdClick = (url) => {
  if (url) {
    openUrl(url, '_blank')
  }
}

// 顶部导航栏方法
const toggleMenu = () => {
  console.log('切换菜单')
}

const showNotifications = () => {
  console.log('显示通知')
}

const showVip = () => {
  console.log('显示VIP')
}

const showSearch = () => {
  props.showSearchPage()
}

// 跳转到登录页面
const goToLogin = () => {
  console.log('跳转到登录页面')
  window.location.href = '#login'
}

// 切换分类
const switchCategory = () => {
  console.log('切换分类')
}

// 处理小说点击
const openNovel = (novel) => {
  console.log('打开小说:', novel.title)
  // 这里可以添加打开小说的逻辑
}

// 刷新页面
const refreshPage = () => {
  window.location.reload()
}

// 生命周期
onMounted(() => {
  startCarousel()
})

onUnmounted(() => {
  stopCarousel()
})
</script>

<style scoped>
.home-page {
  background-color: #fff7fa;
  height: 100vh;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding-top: 0.45rem; /* 30px */
  background-color: #fff7fa;
}

/* 顶部导航栏样式 */
.top-header {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 500px;
  height: 0.45rem; /* 30px */
  background-color: #eb9eb6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
  padding: 0;
}

.header-left, .header-right {
  display: flex;
  align-items: center;
  gap: 0.12rem; /* 8px */
}

.header-left {
  margin-left: 0.15rem; /* 10px */
}

.header-right {
  margin-right: 0.15rem; /* 10px */
}

.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.header-title {
  font-size: 0.24rem; /* 16px */
  font-weight: bold;
  color: white;
  margin: 0;
}

.header-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-button .icon {
  width: 0.24rem; /* 16px */
  height: 0.24rem; /* 16px */
  stroke: white;
}

.vip-text {
  font-size: 0.21rem; /* 14px */
  font-weight: bold;
  color: white;
}

/* 轮播图样式 */
.carousel-section {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 0.3rem; /* 20px */
  padding: 0;
}

.carousel-container {
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 4.2rem; /* 280px */
  overflow: hidden;
  border-radius: 0;
}

.carousel-wrapper {
  display: flex;
  height: 100%;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  min-width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
}

.carousel-indicators {
  position: absolute;
  bottom: 0.15rem; /* 10px */
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 0.12rem; /* 8px */
}

.indicator {
  width: 0.12rem; /* 8px */
  height: 0.12rem; /* 8px */
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.indicator.active {
  background-color: white;
}

/* 分类菜单区域 */
.category-menu-section {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 0.3rem; /* 20px 菜单下方间距 */
}

.category-menu-container {
  display: flex;
  flex-direction: column;
}

.main-category {
  height: 1.05rem; /* 70px */
  width: 100%;
  max-width: 500px;
  display: flex;
  align-items: center;
  gap: 0.375rem; /* 25px */
}

.novel-category {
  background-color: #fff7fa;
}

.category-icon-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  min-width: 1.2rem; /* 80px */
}

.category-icon {
  width: 0.75rem; /* 50px */
  height: 0.6rem; /* 40px */
  border-radius: 0.12rem; /* 8px */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.category-icon-img {
  width: 0.6rem; /* 40px */
  height: 0.45rem; /* 30px */
  object-fit: cover;
  border-radius: 0.12rem; /* 8px */
}

.category-title {
  color: rgb(188, 107, 128);
  font-size: 0.195rem; /* 13px */
  font-family: sans-serif;
  font-weight: normal;
  margin-top: 0.03rem; /* 2px */
  word-break: break-all;
  text-align: center;
}

.sub-categories {
  display: flex;
  flex-direction: column;
  gap: 0.06rem; /* 4px */
  justify-content: center;
}

.sub-category-row {
  display: flex;
  gap: 0.15rem; /* 10px */
  justify-content: flex-start;
}

.sub-category {
  height: 0.15rem; /* 10px */
  width: 1.05rem; /* 70px */
  margin: 0.03rem 0px; /* 2px */
  padding: 0.03rem 0.06rem; /* 2px 4px */
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.06rem; /* 4px */
  color: rgb(201, 161, 172);
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.195rem; /* 13px */
  cursor: pointer;
}

/* 官方推荐横幅样式 */
.recommendation-banner {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 0.15rem; /* 10px */
  box-sizing: border-box;
}

.recommendation-banner .banner-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff7fa;
  border-radius: 0.12rem; /* 8px */
  padding: 0.15rem 0.225rem; /* 10px 15px */
}

.official-text {
  color: #eb9eb6;
  font-size: 0.24rem; /* 16px */
  font-weight: bold;
}

.description-text {
  color: #cba4ac;
  font-size: 0.18rem; /* 12px */
}

/* 小图标广告样式 */
.icon-ads-section {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 0.15rem; /* 10px */
  box-sizing: border-box;
}

.icon-ads-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.15rem 0; /* 10px */
  margin: 0.15rem 0; /* 10px */
}

.icon-ad-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
}

.icon-ad-image {
  width: 0.9rem; /* 60px */
  height: 0.9rem; /* 60px */
  object-fit: cover;
  border-radius: 0.12rem; /* 8px */
  margin-bottom: 0.075rem; /* 5px */
}

.icon-ad-title {
  font-size: 0.165rem; /* 11px */
  color: rgb(141, 95, 110);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 0.9rem; /* 60px */
}

/* 小说横幅样式 */
.domestic-banner {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 0.15rem; /* 10px */
}

.domestic-banner .banner-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.15rem 0.375rem; /* 10px 25px */
  background-color: #eb9eb6;
  border-radius: 0.12rem; /* 8px */
}

.domestic-text {
  color: #ffffff;
  font-size: 0.21rem; /* 14px */
  font-weight: bold;
}

/* 小说列表样式 */
.novel-list-section {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 0.15rem 0.75rem 0.15rem; /* 0 10px 50px 10px */
  box-sizing: border-box;
}

.novel-list-container {
  background-color: #fff7fa;
  border-radius: 0.12rem; /* 8px */
  overflow: hidden;
}

.novel-list-item {
  display: flex;
  align-items: center;
  padding: 0.18rem 0.225rem; /* 12px 15px */
  border-bottom: 1px solid rgba(188, 107, 128, 0.1);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.novel-list-item:hover {
  background-color: rgba(235, 158, 182, 0.05);
}

.novel-list-item:last-child {
  border-bottom: none;
}

.novel-category-tag {
  color: rgb(188, 107, 128);
  font-size: 0.21rem; /* 14px */
  margin-right: 0.12rem; /* 8px */
  flex-shrink: 0;
}

.novel-title {
  color: rgb(188, 107, 128);
  font-size: 0.21rem; /* 14px */
  font-weight: normal;
  flex: 1;
}

/* 分页样式 */
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 0.3rem; /* 20px */
  padding: 0.225rem 0; /* 15px */
}

.pagination {
  display: flex;
  align-items: center;
  gap: 0.12rem; /* 8px */
  background-color: #fff7fa;
  padding: 0.12rem 0.225rem; /* 8px 15px */
  border-radius: 0.12rem; /* 8px */
}

.page-btn {
  background: none;
  border: none;
  color: rgb(188, 107, 128);
  font-size: 0.21rem; /* 14px */
  padding: 0.09rem 0.15rem; /* 6px 10px */
  cursor: pointer;
  border-radius: 0.06rem; /* 4px */
  transition: all 0.2s ease;
}

.page-btn:hover {
  background-color: rgba(235, 158, 182, 0.1);
}

.current-page {
  background-color: #eb9eb6;
  color: white;
}

.page-ellipsis {
  color: rgb(188, 107, 128);
  font-size: 0.21rem; /* 14px */
  padding: 0 0.075rem; /* 5px */
}

</style>
