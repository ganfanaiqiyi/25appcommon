<template>
  <div class="home-page">
    <!-- 顶部导航栏 -->
    <header class="top-header">
      <!-- 左侧：菜单按钮和铃铛按钮 -->
      <div class="header-left">
        <button class="header-button menu-button" @click="goToLogin">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <button class="header-button bell-button" @click="goToLogin">
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
      
      <!-- 右侧：VIP图标 -->
      <div class="header-right">
        <button class="header-button vip-button" @click="goToLogin">
          <span class="vip-text">VIP</span>
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
          <!-- VIP专区 -->
          <div class="main-category vip-category">
            <div class="category-icon-section">
              <div class="category-icon">
                <img src="/src/assets/m1.webp" alt="VIP专区" class="category-icon-img" />
              </div>
              <div class="category-title">VIP专区</div>
            </div>
            <div class="sub-categories">
              <div class="sub-category-row">
                <span class="sub-category" :class="{ active: selectedCategory === item.type_id }" v-for="(item, index) in vipCategories" :key="index" @click="selectCategory(item)">{{ item.type_name }}</span>
              </div>
            </div>
          </div>

          <!-- 精品分享 -->
          <div class="main-category share-category">
            <div class="category-icon-section">
              <div class="category-icon">
                <img src="/src/assets/m2.webp" alt="精品分享" class="category-icon-img" />
              </div>
              <div class="category-title">精品分享</div>
            </div>
            <div class="sub-categories">
              <div class="sub-category-row">
                <span class="sub-category" :class="{ active: selectedCategory === item.type_id }" v-for="(item, index) in shareCategories" :key="index" @click="selectCategory(item)">{{ item.type_name }}</span>
              </div>
            </div>
          </div>

          <!-- 在线电影 -->
          <div class="main-category movie-category">
            <div class="category-icon-section">
              <div class="category-icon">
                <img src="/src/assets/m3.webp" alt="在线电影" class="category-icon-img" />
              </div>
              <div class="category-title">在线电影</div>
            </div>
            <div class="sub-categories">
              <div class="sub-category-row">
                <span class="sub-category" :class="{ active: selectedCategory === item.type_id }" v-for="(item, index) in movieCategories" :key="index" @click="selectCategory(item)">{{ item.type_name }}</span>
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

      <!-- 网红博主横幅 -->
      <section class="domestic-banner">
        <div class="banner-content" @click="switchCategory">
          <span class="domestic-text">{{ currentCategoryName }}</span>
        </div>
      </section>

      <!-- 网红专区视频列表 -->
      <section class="influencer-videos-section" @scroll="handleScroll">
        <div v-if="isLoadingVideos && influencerVideos.length === 0" class="loading-text">加载中...</div>
        <div v-else-if="influencerVideos.length === 0" class="no-data-text">暂无数据</div>
        <div v-else class="video-list-container">
          <div
            class="list-video-item"
            v-for="(video, index) in influencerVideos"
            :key="video.id"
            @click="goToLogin"
          >
            <div class="list-thumbnail">
              <ImageWithFallback :src="video.thumbnail" :alt="video.title" fallbackBackgroundColor="#fff7fa" />
              <div class="video-remarks" v-if="video.remarks">{{ video.remarks }}</div>
            </div>
            <div class="list-content">
              <h3 class="list-title">{{ video.title }}</h3>
              <div class="video-meta">
                <span class="video-category">{{ video.category }}</span>
                <span class="video-time">{{ video.time }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 加载更多按钮 -->
        <div v-if="hasMoreVideos && influencerVideos.length > 0" class="load-more-container">
          <button 
            class="load-more-btn" 
            @click="loadMoreVideos"
            :disabled="isLoadingVideos"
          >
            {{ isLoadingVideos ? '加载中...' : '加载更多' }}
          </button>
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
import { fetchVideoList } from '../utils/api.js'

// 直接使用广告配置数据
const baseIconAds = adsConfig.ads.icon
const carouselAds = ref(adsConfig.ads.carousel || [])

// 根据配置获取广告数据
const iconAds = ref(baseIconAds.slice(0, appConfig.ads.iconAdsCount))

// 分类按钮数据
const categoryButtons = ref(menuConfig.categories.categoryButtons)
const selectedCategory = ref(54) // 默认选中分类改为 54

// 计算当前分类名称
const currentCategoryName = computed(() => {
  const category = categoryButtons.value.find(btn => btn.type_id === selectedCategory.value)
  return category ? category.type_name : '网红主播'
})

// 分类菜单数据 - 将categoryButtons按分类分组
const vipCategories = computed(() => {
  return categoryButtons.value.slice(0, 8) // 前8个分类
})

const shareCategories = computed(() => {
  return categoryButtons.value.slice(8, 16) // 第9-16个分类
})

const movieCategories = computed(() => {
  return categoryButtons.value.slice(16, 24) // 第17-24个分类
})


// 网红专区视频数据
const influencerVideos = ref([])
const isLoadingVideos = ref(false)
const currentPage = ref(1)
const hasMoreVideos = ref(true)

// 加载视频数据
const loadVideos = async (categoryId = 54, page = 1, isLoadMore = false) => {
  console.log('开始加载视频数据，分类ID:', categoryId, '页码:', page)
  isLoadingVideos.value = true
  try {
    // 使用VideoPage.vue中的API方法
    const data = await fetchVideoList(page, categoryId, '')
    console.log('API响应数据:', data)
    
    if (data.code === 1 && data.list) {
      // 转换数据格式
      const newVideos = data.list.map(item => ({
        id: item.vod_id,
        title: item.vod_name,
        thumbnail: item.vod_pic || '',
        views: item.vod_hits || '0',
        category: categoryButtons.value.find(btn => btn.type_id === categoryId)?.type_name || '网红主播',
        time: item.vod_time || '2024-01-15',
        remarks: 'VIP',
        vod_play_url: item.vod_play_url
      }))
      
      if (isLoadMore) {
        // 加载更多时追加数据
        influencerVideos.value = [...influencerVideos.value, ...newVideos]
      } else {
        // 首次加载或切换分类时替换数据
        influencerVideos.value = newVideos
      }
      
      // 检查是否还有更多数据
      hasMoreVideos.value = data.list.length >= 10
      currentPage.value = page
      
      console.log('转换后的视频数据:', influencerVideos.value)
    } else {
      console.log('API返回数据格式错误，使用模拟数据')
      influencerVideos.value = getMockVideosByCategory(categoryId)
      hasMoreVideos.value = false
    }
  } catch (error) {
    console.log('API请求异常，使用模拟数据:', error)
    influencerVideos.value = getMockVideosByCategory(categoryId)
    hasMoreVideos.value = false
  } finally {
    isLoadingVideos.value = false
  }
  console.log('最终视频数据:', influencerVideos.value)
}

// 根据分类获取模拟视频数据
const getMockVideosByCategory = (categoryId) => {
  const categoryName = categoryButtons.value.find(btn => btn.type_id === categoryId)?.type_name || '网红主播'
  
  return [
    {
      id: 1,
      title: `${categoryName}精彩视频1`,
      thumbnail: '',
      views: '1.2万',
      category: categoryName,
      time: '2024-01-15',
      remarks: 'VIP'
    },
    {
      id: 2,
      title: `${categoryName}精彩视频2`,
      thumbnail: '',
      views: '8.5千',
      category: categoryName,
      time: '2024-01-14',
      remarks: 'VIP'
    },
    {
      id: 3,
      title: `${categoryName}精彩视频3`,
      thumbnail: '',
      views: '2.1万',
      category: categoryName,
      time: '2024-01-13',
      remarks: 'VIP'
    },
    {
      id: 4,
      title: `${categoryName}精彩视频4`,
      thumbnail: '',
      views: '5.7千',
      category: categoryName,
      time: '2024-01-12',
      remarks: 'VIP'
    }
  ]
}

// 播放视频方法
const playVideo = (video) => {
  console.log('播放视频:', video.title)
  // 这里可以添加播放视频的逻辑
}

// 切换分类方法
const switchCategory = () => {
  // 循环切换到下一个分类
  const currentIndex = categoryButtons.value.findIndex(btn => btn.type_id === selectedCategory.value)
  const nextIndex = (currentIndex + 1) % categoryButtons.value.length
  const nextCategory = categoryButtons.value[nextIndex]
  
  selectedCategory.value = nextCategory.type_id
  currentPage.value = 1
  hasMoreVideos.value = true
  loadVideos(nextCategory.type_id, 1, false)
}

// 选择分类方法
const selectCategory = (category) => {
  console.log('选择分类:', category.type_name, 'ID:', category.type_id)
  selectedCategory.value = category.type_id
  currentPage.value = 1
  hasMoreVideos.value = true
  influencerVideos.value = [] // 清空当前视频列表
  loadVideos(category.type_id, 1, false)
}

// 加载更多视频
const loadMoreVideos = () => {
  if (!isLoadingVideos.value && hasMoreVideos.value) {
    loadVideos(selectedCategory.value, currentPage.value + 1, true)
  }
}

// 滚动处理
const handleScroll = (event) => {
  const { scrollTop, scrollHeight, clientHeight } = event.target
  // 当滚动到底部附近时自动加载更多
  if (scrollHeight - scrollTop <= clientHeight + 100) {
    loadMoreVideos()
  }
}

// 轮播图相关
const currentSlide = ref(0)
let slideInterval = null

const handleAdClick = (url) => {
  if (url) {
    openUrl(url, '_blank')
  }
}

// 顶部导航栏方法
const toggleMenu = () => {
  console.log('切换菜单')
  // 这里可以添加菜单切换逻辑
}

const showNotifications = () => {
  console.log('显示通知')
  // 这里可以添加通知显示逻辑
}

const showVip = () => {
  console.log('显示VIP页面')
  // 这里可以添加VIP页面逻辑
}

const showSearch = () => {
  console.log('显示搜索页面')
  // 这里可以添加搜索页面逻辑
}

// 跳转到登录页面
const goToLogin = () => {
  console.log('跳转到登录页面')
  window.location.href = '#login'
}

// 轮播图方法
const goToSlide = (index) => {
  currentSlide.value = index
}

const startCarousel = () => {
  if (carouselAds.value.length <= 1) return
  
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % carouselAds.value.length
  }, 3000) // 3秒切换一次
}

const stopCarousel = () => {
  if (slideInterval) {
    clearInterval(slideInterval)
    slideInterval = null
  }
}

// 组件挂载时启动轮播
onMounted(() => {
  startCarousel()
  // 初始化加载默认分类(54)视频数据
  loadVideos(54, 1, false)
})

// 组件卸载时停止轮播
onUnmounted(() => {
  stopCarousel()
})
</script>

<style scoped>
.home-page {
  height: 100vh;
  background-color: #fff7fa;
  color: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 顶部导航栏样式 */
.top-header {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 500px;
  height: 0.45rem; /* 30px = 0.45rem (30/66.67) */
  background-color: #eb9eb6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  box-shadow: 0 0.03rem 0.12rem rgba(0, 0, 0, 0.3); /* 2px 8px = 0.03rem 0.12rem */
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.12rem; /* 8px = 0.12rem (8/66.67) */
  margin-left: 0.15rem; /* 10px = 0.15rem (10/66.67) */
}

.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.12rem; /* 8px = 0.12rem (8/66.67) */
  margin-right: 0.15rem; /* 10px = 0.15rem (10/66.67) */
}

.header-button {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.06rem; /* 4px = 0.06rem (4/66.67) */
  border-radius: 0.06rem; /* 4px = 0.06rem (4/66.67) */
  transition: background-color 0.2s ease;
}

.header-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.header-button:active {
  background-color: rgba(255, 255, 255, 0.2);
}

.icon {
  width: 0.24rem; /* 16px = 0.24rem (16/66.67) */
  height: 0.24rem; /* 16px = 0.24rem (16/66.67) */
  stroke: white;
  fill: none;
}

.header-title {
  font-size: 0.24rem; /* 16px = 0.24rem (16/66.67) */
  color: white;
  margin: 0;
  font-weight: 600;
  text-align: center;
}

.vip-text {
  font-size: 0.165rem; /* 11px = 0.165rem (11/66.67) */
  color: white;
  font-weight: 600;
  text-transform: uppercase;
}

.main-content {
  flex: 1;
  margin: 0 auto;
  padding-top: 0.45rem; /* 为30px高度的顶部导航栏留出空间 */
  padding-bottom: 1.05rem; /* 为底部菜单栏留出空间 */
  width: 100%;
  overflow-y: auto;
  /* 隐藏滚动条 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

/* 轮播图样式 */
.carousel-section {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 0.3rem; /* 20px = 0.3rem (20/66.67) */
  padding: 0;
}

.carousel-container {
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 4.2rem; /* 280px = 4.2rem (280/66.67) */
  overflow: hidden;
  box-shadow: 0 0.06rem 0.18rem rgba(0, 0, 0, 0.3); /* 4px 12px = 0.06rem 0.18rem */
}

.carousel-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-indicators {
  position: absolute;
  bottom: 0.15rem; /* 10px = 0.15rem (10/66.67) */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.12rem; /* 8px = 0.12rem (8/66.67) */
}

.indicator {
  width: 0.12rem; /* 8px = 0.12rem (8/66.67) */
  height: 0.12rem; /* 8px = 0.12rem (8/66.67) */
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.indicator.active {
  background-color: #ff69b4;
}

/* 分类菜单样式 */
.category-menu-section {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

/* 官方推荐横幅样式 */
.recommendation-banner {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.banner-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.15rem 0.225rem; /* 10px 15px = 0.15rem 0.225rem */
  background-color: #fff7fa;
  border-radius: 0.12rem; /* 8px = 0.12rem (8/66.67) */
}

.official-text {
  color: #eb9eb6;
  font-size: 0.24rem; /* 16px = 0.24rem (16/66.67) */
  font-weight: bold;
}

.description-text {
  color: #cba4ac;
  font-size: 0.18rem; /* 12px = 0.18rem (12/66.67) */
}

.category-menu-container {
  display: flex;
  flex-direction: column;
}

.main-category {
  display: flex;
  align-items: center;
  gap: 0.375rem; /* 25px = 0.375rem (25/66.67) */
  width: 100%;
  max-width: 500px;
  height: 1.05rem; /* 70px = 1.05rem (70/66.67) */
}

.vip-category {
  background-color: #fff7fa;
}

.share-category {
  background-color: #f9ebf0;
}

.movie-category {
  background-color: #fff7fa;
}


.category-icon-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  min-width: 80px;
}

.category-icon {
  width: 0.75rem; /* 50px = 0.75rem (50/66.67) */
  height: 0.6rem; /* 40px = 0.6rem (40/66.67) */
  border-radius: 0.12rem; /* 8px = 0.12rem (8/66.67) */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.category-icon-img {
  width: 0.6rem; /* 40px = 0.6rem (40/66.67) */
  height: 0.45rem; /* 30px = 0.45rem (30/66.67) */
  object-fit: cover;
  border-radius: 0.12rem; /* 8px = 0.12rem (8/66.67) */
}

.category-title {
  color: rgb(188, 107, 128);
  font-size: 0.195rem; /* 13px = 0.195rem (13/66.67) */
  font-family: sans-serif;
  font-weight: normal;
  margin-top: 0.03rem; /* 2px = 0.03rem (2/66.67) */
  word-break: break-all;
  text-align: center;
}

.sub-categories {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.06rem; /* 4px = 0.06rem (4/66.67) */
  justify-content: center;
}

.sub-category-row {
  display: flex;
  gap: 0.15rem; /* 10px = 0.15rem (10/66.67) */
  flex-wrap: wrap;
  justify-content: flex-start;
}

.sub-category {
  color: rgb(201, 161, 172);
  font-size: 0.195rem; /* 13px = 0.195rem (13/66.67) */
  height: 0.15rem; /* 10px = 0.15rem (10/66.67) */
  width: 1.05rem; /* 70px = 1.05rem (70/66.67) */
  margin: 0.03rem 0px; /* 2px = 0.03rem (2/66.67) */
  padding: 0.03rem 0.06rem; /* 2px 4px = 0.03rem 0.06rem */
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.06rem; /* 4px = 0.06rem (4/66.67) */
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sub-category:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.sub-category.active {
  color: #eb9eb6;
  font-weight: bold;
}

/* 隐藏Webkit浏览器的滚动条 */
.main-content::-webkit-scrollbar {
  display: none;
}

/* 小图标广告区域 */
.icon-ads-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.15rem 0; /* 10px = 0.15rem (10/66.67) */
  justify-content: center; /* 整个网格居中 */
  align-items: start; /* 垂直顶部对齐 */
  width: 100%;
  margin: 0.15rem 0; /* 10px = 0.15rem (10/66.67) */
}

.icon-ad-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  width: 100%;
  transition: transform 0.2s ease;
}

.icon-ad-item:hover {
  transform: scale(1.05);
}

.icon-ad-image {
  width: 0.9rem; /* 60px = 0.9rem (60/66.67) */
  height: 0.9rem; /* 60px = 0.9rem (60/66.67) */
  object-fit: cover; /* 确保图片填充，可能裁剪 */
  border-radius: 0.12rem; /* 8px = 0.12rem (8/66.67) */
  margin-bottom: 0.075rem; /* 5px = 0.075rem (5/66.67) */
  box-shadow: 0 0.03rem 0.075rem rgba(0, 0, 0, 0.3); /* 2px 5px = 0.03rem 0.075rem */
}

.icon-ad-title {
  font-size: 0.165rem; /* 11px = 0.165rem (11/66.67) */
  color: rgb(141, 95, 110);
  white-space: nowrap; /* 防止标题换行 */
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 显示省略号 */
  max-width: 0.9rem; /* 60px = 0.9rem (60/66.67) */
  margin: 0;
  line-height: 1.2;
}

/* 国产专区横幅样式 */
.domestic-banner {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 0.15rem; /* 10px = 0.15rem (10/66.67) */
}

.domestic-banner .banner-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.15rem 0.375rem; /* 10px 25px = 0.15rem 0.375rem */
  background-color: #eb9eb6;
  border-radius: 0.12rem; /* 8px = 0.12rem (8/66.67) */
}

.domestic-text {
  color: #ffffff;
  font-size: 0.21rem; /* 14px = 0.21rem (14/66.67) */
  font-weight: bold;
}

/* 网红专区视频列表样式 */
.influencer-videos-section {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 0.15rem 0; /* 10px = 0.15rem (10/66.67) */
  max-height: 9rem; /* 600px = 9rem (600/66.67) */
  overflow-y: auto;
}

.loading-text, .no-data-text {
  text-align: center;
  color: #666;
  font-size: 0.21rem; /* 14px = 0.21rem (14/66.67) */
  padding: 0.3rem; /* 20px = 0.3rem (20/66.67) */
}

.video-list-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.15rem; /* 10px = 0.15rem (10/66.67) */
}

.load-more-container {
  text-align: center;
  margin-top: 0.3rem; /* 20px = 0.3rem (20/66.67) */
}

.load-more-btn {
  background-color: #eb9eb6;
  color: white;
  border: none;
  border-radius: 0.3rem; /* 20px = 0.3rem (20/66.67) */
  padding: 0.15rem 0.45rem; /* 10px 30px = 0.15rem 0.45rem */
  font-size: 0.21rem; /* 14px = 0.21rem (14/66.67) */
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.load-more-btn:hover:not(:disabled) {
  background-color: #d88ba0;
}

.load-more-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.list-video-item {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.list-thumbnail {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 0.12rem; /* 8px = 0.12rem (8/66.67) */
  overflow: hidden;
  margin-bottom: 0.12rem; /* 8px = 0.12rem (8/66.67) */
}

.list-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-remarks {
  position: absolute;
  top: 0.12rem; /* 8px = 0.12rem (8/66.67) */
  left: 0.12rem; /* 8px = 0.12rem (8/66.67) */
  background-color: #eb9eb6;
  color: white;
  font-size: 0.18rem; /* 12px = 0.18rem (12/66.67) */
  padding: 0.03rem 0.09rem; /* 2px 6px = 0.03rem 0.09rem */
  border-radius: 0.06rem; /* 4px = 0.06rem (4/66.67) */
}

.list-content {
  padding: 0 0.06rem; /* 4px = 0.06rem (4/66.67) */
}

.list-title {
  font-size: 0.21rem; /* 14px = 0.21rem (14/66.67) */
  color: #333;
  margin: 0 0 0.06rem 0; /* 4px = 0.06rem (4/66.67) */
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.18rem; /* 12px = 0.18rem (12/66.67) */
  color: #666;
}

.video-category {
  color: #eb9eb6;
}

.video-time {
  color: #999;
}

</style>