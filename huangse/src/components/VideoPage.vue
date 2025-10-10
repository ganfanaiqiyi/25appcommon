<template>
  <div class="video-page">
    <!-- 顶部导航栏 -->
    <header class="top-nav">
      <div class="nav-left">
        <img :src="wz_logo" alt="黄色仓库" class="app-logo" />
      </div>
      <div class="nav-right">
        <div class="search-icon" @click="openSearch">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </header>

    <!-- 小图标广告（来自 ads.json 的 icon） -->
    <section class="icon-ads-section">
      <div class="icon-ads-grid">
        <div
          class="icon-ad-item"
          v-for="(ad, index) in iconAds"
          :key="index"
          @click="openAd(ad)"
        >
          <ImageWithFallback :src="ad.image" :alt="ad.title" class="icon-ad-image" />
          <div class="icon-ad-title">{{ ad.title }}</div>
        </div>
      </div>
    </section>

    

    <!-- 分类按钮网格 -->
    <section class="category-buttons">
      <div class="button-grid">
        <div 
          class="category-button" 
          v-for="(button, index) in categoryButtons" 
          :key="index"
          :class="{ active: isCategoryActive(button) }"
          @click="selectCategory(button)"
        >
          {{ button }}
        </div>
      </div>
    </section>

    <!-- 视频列表区域 -->
    <section class="video-list-section">
      <div class="list-tabs">
        <div 
          class="list-tab" 
          v-for="(tab, index) in listTabs" 
          :key="index"
          :class="{ active: activeListTab === index }"
          @click="setActiveListTab(index)"
        >
          {{ tab }}
        </div>
      </div>
      
      <div class="video-list">
        <div 
          class="list-video-item" 
          v-for="(video, index) in displayedVideos" 
          :key="video.id"
          @click="playVideo(video)"
        >
          <div class="list-thumbnail">
            <ImageWithFallback :src="video.thumbnail" :alt="video.title" />
            <div class="play-count">{{ video.views }}</div>
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
        
        <!-- 加载更多按钮 -->
        <div class="load-more-container" v-if="hasMore">
          <button 
            class="load-more-btn" 
            @click="loadMoreVideos"
            :disabled="isLoading"
          >
            {{ isLoading ? '加载中...' : '加载更多' }}
          </button>
        </div>
        
        <!-- 加载完成提示 -->
        <div class="load-complete" v-if="!hasMore && videos.length > 0">
          <p>已加载全部视频</p>
        </div>
      </div>
    </section>
    
    <!-- 分页器 - 页面最底部 -->
    <div class="pagination">
      <button 
        class="page-btn prev-btn" 
        @click="prevPage"
        :disabled="featuredCurrentPage <= 1 || isFeaturedLoading"
      >
        {{ isFeaturedLoading ? '加载中...' : '上一页' }}
      </button>
      <span class="page-info">
        第 {{ featuredCurrentPage }} 页 / 共 {{ featuredTotalPages }} 页
      </span>
      <button 
        class="page-btn next-btn" 
        @click="nextPage"
        :disabled="featuredCurrentPage >= featuredTotalPages || isFeaturedLoading"
      >
        {{ isFeaturedLoading ? '加载中...' : '下一页' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import adsConfig from '../config/ads.json'
import menuConfig from '../config/menu.json'
import appConfig from '../config/appConfig.json'
import { getIconUrl } from '../assets/import-icons.js'
import wz_logo from '../assets/wz_logo.jpg'
import { fetchVideoList } from '../utils/api.js'
import ImageWithFallback from './ImageWithFallback.vue'

// 接收父组件传递的函数
const props = defineProps({
  showSearchPage: {
    type: Function,
    required: true
  }
})

// 定义事件
const emit = defineEmits(['playVideo'])

// 小图标广告（前10个，处理图标路径）
const iconAds = ref(adsConfig.ads.icon.slice(0, 10).map(ad => ({
  ...ad,
  image: getIconUrl(ad.image.split('/').pop()) || ad.image
})))

// 分类导航 - 使用配置文件中的前5个
const activeCategory = ref(0)
const categories = ref(menuConfig.categories.topNav.map(item => item.type_name))

// 推荐视频数据 - 使用API数据
const featuredVideos = ref([])

// 分类按钮数据 - 使用配置文件中的其余数据，限制为25个（5行×5列）
const categoryButtons = ref(menuConfig.categories.categoryButtons.slice(0, 25).map(item => item.type_name))

// 列表标签
const activeListTab = ref(0)
const listTabs = ref(['最新更新', '本周最热', '最多观看', '十分钟以上'])

// 生成随机播放次数
const generateRandomViews = () => {
  const views = Math.floor(Math.random() * 50) + 1 // 1-50万
  return `${views}万次播放`
}

// API相关状态
const videos = ref([])
const currentPage = ref(1)
const isLoading = ref(false)
const hasMore = ref(true)
const selectedCategoryId = ref(0)
const searchKeyword = ref('')
const totalPages = ref(1)
const featuredCurrentPage = ref(1)
const featuredTotalPages = ref(1)
const isFeaturedLoading = ref(false)

// 计算属性：当前显示的视频列表
const displayedVideos = computed(() => {
  return videos.value.slice(0, appConfig.api.cms.pagination.initialCount + 
    (currentPage.value - 1) * appConfig.api.cms.pagination.loadMoreCount)
})

// 推荐视频API调用函数
const fetchFeaturedVideos = async (page = 1) => {
  try {
    isFeaturedLoading.value = true
    
    console.log('推荐视频API 页码:', page)
    
    const data = await fetchVideoList(page, 0, '')
    
    console.log('API响应数据:', data)
    
    if (data.code === 1 && data.list) {
      // 清空现有数据
      featuredVideos.value = []
      
      // 使用nextTick确保DOM更新
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // 设置新数据
      featuredVideos.value = data.list.slice(0, 10).map(item => ({
        id: item.vod_id,
        title: item.vod_name,
        thumbnail: item.vod_pic || '/src/assets/ad_icon.gif', // 使用真实封面图片
        tag: item.vod_remarks || '高清',
        vod_play_url: item.vod_play_url, // 添加播放地址
        categoryId: item.type_id,
        description: item.vod_blurb,
        views: item.vod_hits || '0'
      }))
      
      featuredTotalPages.value = Math.ceil(data.total / 10) // 每页10个推荐视频
      
      console.log('更新后的推荐视频:', featuredVideos.value)
      console.log('总页数:', featuredTotalPages.value)
    }
  } catch (error) {
    console.error('获取推荐视频数据失败:', error)
  } finally {
    isFeaturedLoading.value = false
  }
}

// API调用函数
const fetchVideos = async (page = 1, categoryId = 0, keyword = '') => {
  try {
    isLoading.value = true
    
    console.log('API请求参数:', { page, categoryId, keyword })
    
    const data = await fetchVideoList(page, categoryId, keyword)
    
    if (data.code === 1 && data.list) {
      const newVideos = data.list.map(item => ({
        id: item.vod_id,
        title: item.vod_name,
        thumbnail: item.vod_pic || '/src/assets/ad_icon.gif', // 使用真实封面图片
        views: generateRandomViews(), // 随机播放次数
        category: item.type_name,
        remarks: item.vod_remarks || '高清',
        vod_play_url: item.vod_play_url, // 添加播放地址
        categoryId: item.type_id,
        description: item.vod_blurb,
        time: item.vod_time_add || item.vod_time // 使用vod_time_add，如果没有则用vod_time
      }))
      
      if (page === 1) {
        videos.value = newVideos
      } else {
        videos.value.push(...newVideos)
      }
      
      // 检查是否还有更多数据
      hasMore.value = page < data.pagecount && videos.value.length < data.total
      totalPages.value = data.pagecount
    }
  } catch (error) {
    console.error('获取视频数据失败:', error)
  } finally {
    isLoading.value = false
  }
}

// 加载更多视频
const loadMoreVideos = () => {
  if (!isLoading.value && hasMore.value) {
    currentPage.value++
    fetchVideos(currentPage.value, selectedCategoryId.value, searchKeyword.value)
  }
}

// 判断分类是否激活
const isCategoryActive = (categoryName) => {
  const categoryData = menuConfig.categories.categoryButtons.find(item => item.type_name === categoryName)
  return categoryData && categoryData.type_id === selectedCategoryId.value
}

// 选择分类
const selectCategory = (category) => {
  console.log('选择分类:', category)
  // 根据分类名称找到对应的ID
  const categoryData = menuConfig.categories.categoryButtons.find(item => item.type_name === category)
  if (categoryData) {
    selectedCategoryId.value = categoryData.type_id
    currentPage.value = 1
    videos.value = []
    fetchVideos(1, categoryData.type_id, searchKeyword.value)
  }
}

// 搜索功能
const searchVideos = (keyword) => {
  searchKeyword.value = keyword
  currentPage.value = 1
  videos.value = []
  fetchVideos(1, selectedCategoryId.value, keyword)
}

// 方法
const setActiveCategory = (index) => {
  activeCategory.value = index
}

const setActiveListTab = (index) => {
  activeListTab.value = index
  console.log('切换到标签:', listTabs.value[index])
  
  // 根据标签重新请求API刷新封面（只刷新推荐视频网格）
  switch(index) {
    case 0: // 最新更新
      console.log('显示最新更新内容')
      featuredCurrentPage.value = 1
      fetchFeaturedVideos(1)
      break
    case 1: // 本周最热
      console.log('显示本周最热内容')
      featuredCurrentPage.value = 1
      fetchFeaturedVideos(1)
      break
    case 2: // 最多观看
      console.log('显示最多观看内容')
      featuredCurrentPage.value = 1
      fetchFeaturedVideos(1)
      break
    case 3: // 十分钟以上
      console.log('显示十分钟以上内容')
      featuredCurrentPage.value = 1
      fetchFeaturedVideos(1)
      break
  }
}

const playVideo = (video) => {
  console.log('播放视频:', video.title)
  console.log('视频播放地址:', video.vod_play_url)
  // 发送视频信息到父组件
  emit('playVideo', {
    ...video,
    vod_play_url: video.vod_play_url || '正片$https://hsckyun.yeffpe.com/share/20251009/EJMo2U35$$$正片$https://hsm3.fhu3hh.com/20251009/EJMo2U35/index.m3u8'
  })
}

// 打开搜索页面
const openSearch = () => {
  props.showSearchPage()
}

// 打开广告
const openAd = (ad) => {
  if (ad && ad.url) {
    window.open(ad.url, '_blank')
  }
}

// 分页器方法
const prevPage = () => {
  if (featuredCurrentPage.value > 1) {
    featuredCurrentPage.value--
    fetchFeaturedVideos(featuredCurrentPage.value)
  }
}

const nextPage = () => {
  if (featuredCurrentPage.value < featuredTotalPages.value) {
    featuredCurrentPage.value++
    fetchFeaturedVideos(featuredCurrentPage.value)
  }
}

// 组件挂载时加载初始数据
onMounted(() => {
  // 默认请求第一个菜单类型（最新更新）
  activeListTab.value = 0
  
  // 默认选择第一个分类按钮（网红主播）
  const firstCategory = categoryButtons.value[0] // 网红主播
  const categoryData = menuConfig.categories.categoryButtons.find(item => item.type_name === firstCategory)
  if (categoryData) {
    selectedCategoryId.value = categoryData.type_id
    console.log('默认选择分类:', firstCategory, 'ID:', categoryData.type_id)
  }
  
  fetchFeaturedVideos(1)
  fetchVideos(1, selectedCategoryId.value, '')
})
</script>

<style scoped>
.video-page {
  height: 100vh;
  background-color: #0e0e0e;
  color: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 小图标广告样式 */
.icon-ads-section {
  padding: 0.244rem;
}

.icon-ads-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.349rem;
}

.icon-ad-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
}

.icon-ad-image {
  width: 1.047rem;
  height: 1.047rem;
  object-fit: cover;
  border-radius: 0.139rem;
  margin-bottom: 0.087rem;
  box-shadow: 0 0.035rem 0.087rem rgba(0,0,0,0.3);
}

.icon-ad-title {
  font-size: 0.22rem;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 1.047rem;
}

/* 顶部导航栏 */
.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.174rem 0.244rem;
  background-color: #0e0e0e;
  height: 0.697rem;
}

.nav-left .app-logo {
  width: 0.872rem; /* 50px = 0.872rem (50/57.33) */
  height: 0.872rem; /* 50px = 0.872rem (50/57.33) */
  object-fit: contain;
}

.nav-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-tabs {
  display: flex;
  gap: 0.349rem;
}

.nav-tab {
  font-size: 0.192rem;
  color: #cccccc;
  cursor: pointer;
  padding: 0.087rem 0.174rem;
  transition: color 0.2s ease;
}

.nav-tab.active {
  color: #f6bf00;
}

.nav-right .search-icon {
  font-size: 0.244rem;
  cursor: pointer;
}

/* 分页器样式 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.244rem;
  padding: 0.244rem 0;
  margin-top: 0.244rem;
}

.page-btn {
  background-color: #333333;
  color: #ffffff;
  border: none;
  padding: 0.087rem 0.174rem; /* 5px 10px */
  border-radius: 0.087rem; /* 5px */
  font-size: 0.157rem; /* 9px */
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.page-btn:hover:not(:disabled) {
  background-color: #444444;
}

.page-btn:disabled {
  background-color: #222222;
  color: #666666;
  cursor: not-allowed;
}

.page-info {
  font-size: 0.157rem; /* 9px */
  color: #cccccc;
  padding: 0 0.174rem;
}

/* 推荐视频网格已移除 */


/* 分类按钮网格 */
.category-buttons {
  padding: 0.244rem;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.139rem;
}

.category-button {
  background-color: #333333;
  color: #ffffff;
  font-size: 0.157rem; /* 9px = 0.157rem (9/57.33) */
  padding: 0.139rem 0.087rem;
  border-radius: 0.052rem;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.category-button:hover {
  background-color: #444444;
}

.category-button.active {
  background-color: #f6bf00;
  color: #000000;
}


/* 视频列表区域 */
.video-list-section {
  flex: 1;
  padding: 0 0.244rem;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.video-list-section::-webkit-scrollbar {
  display: none;
}

.list-tabs {
  display: flex;
  gap: 0.244rem;
  margin-bottom: 0.244rem;
}

.list-tab {
  font-size: 0.192rem; /* 11px = 0.192rem (11/57.33) */
  color: #999999;
  cursor: pointer;
  padding: 0.087rem 0.174rem;
  transition: color 0.2s ease;
}

.list-tab.active {
  color: #f6bf00;
}

.video-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.244rem; /* 14px = 0.244rem (14/57.33) */
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
  border-radius: 0.087rem;
  overflow: hidden;
  margin-bottom: 0.087rem;
}

.list-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-count {
  position: absolute;
  bottom: 0.035rem;
  left: 0.035rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 0.122rem;
  padding: 0.017rem 0.052rem;
  border-radius: 0.035rem;
}

.list-content {
  flex: 1;
}

.list-title {
  font-size: 0.209rem; /* 12px = 0.209rem (12/57.33) */
  color: #ffffff;
  line-height: 1.3;
  margin: 0 0 0.052rem 0; /* 3px = 0.052rem (3/57.33) */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-remarks {
  position: absolute;
  top: 0.035rem;
  left: 0.035rem;
  background-color: rgba(246, 191, 0, 0.9);
  color: #000000;
  font-size: 0.105rem; /* 6px = 0.105rem (6/57.33) */
  padding: 0.017rem 0.035rem;
  border-radius: 0.035rem;
  font-weight: bold;
}

.video-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.122rem; /* 7px = 0.122rem (7/57.33) */
  color: #999999;
  margin-top: 0.035rem;
}

.video-category {
  background-color: rgba(246, 191, 0, 0.2);
  color: #f6bf00;
  padding: 0.017rem 0.035rem;
  border-radius: 0.035rem;
  font-size: 0.105rem; /* 6px = 0.105rem (6/57.33) */
}

.video-time {
  font-size: 0.105rem; /* 6px = 0.105rem (6/57.33) */
}

/* 加载更多按钮样式 */
.load-more-container {
  grid-column: 1 / -1; /* 跨越所有列 */
  display: flex;
  justify-content: center;
  padding: 0.244rem 0;
}

.load-more-btn {
  background-color: #333333;
  color: #ffffff;
  border: none;
  padding: 0.139rem 0.349rem; /* 8px 20px */
  border-radius: 0.139rem; /* 8px */
  font-size: 0.157rem; /* 9px */
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.load-more-btn:hover:not(:disabled) {
  background-color: #444444;
}

.load-more-btn:disabled {
  background-color: #222222;
  color: #666666;
  cursor: not-allowed;
}

/* 加载完成提示 */
.load-complete {
  grid-column: 1 / -1; /* 跨越所有列 */
  text-align: center;
  padding: 0.244rem 0;
  color: #999999;
  font-size: 0.157rem; /* 9px */
}
</style>
