<template>
  <div class="search-page">
    <!-- 顶部导航栏 -->
    <header class="top-nav">
      <div class="nav-left">
        <button class="back-btn" @click="goBack">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M12 19L5 12L12 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <img src="/src/assets/wz_logo.jpg" alt="黄色仓库" class="app-logo" />
      </div>
    </header>

    <!-- 搜索框区域 -->
    <section class="search-section">
      <div class="search-box">
        <input 
          type="text" 
          v-model="searchKeyword" 
          placeholder="请输入搜索关键词..."
          class="search-input"
          @keyup.enter="performSearch"
          ref="searchInput"
        />
        <button class="search-btn" @click="performSearch" :disabled="!searchKeyword.trim()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      
      <!-- 搜索历史 -->
      <div class="search-history" v-if="searchHistory.length > 0 && !isSearching">
        <div class="history-title">搜索历史</div>
        <div class="history-tags">
          <span 
            class="history-tag" 
            v-for="(keyword, index) in searchHistory" 
            :key="index"
            @click="searchFromHistory(keyword)"
          >
            {{ keyword }}
          </span>
        </div>
        <button class="clear-history-btn" @click="clearHistory">清空历史</button>
      </div>

      <!-- 热门搜索 -->
      <div class="hot-search" v-if="!isSearching && searchKeyword === ''">
        <div class="hot-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="flame-icon">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" fill="#ff6b35"/>
          </svg>
          热门搜索
        </div>
        <div class="hot-list">
          <div 
            class="hot-item" 
            v-for="(item, index) in hotKeywords" 
            :key="index"
            @click="searchFromHot(item.keyword)"
          >
            <div class="hot-rank">
              <div v-if="item.rank <= 3" class="crown-rank">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 16L3 8l5.5 5L12 4l3.5 9L21 8l-2 8H5z" fill="#ffd700"/>
                  <text x="12" y="16" text-anchor="middle" font-size="10" fill="#000" font-weight="bold">{{ item.rank }}</text>
                </svg>
              </div>
              <div v-else class="number-rank">{{ item.rank }}</div>
            </div>
            <div class="hot-keyword">{{ item.keyword }}</div>
            <div class="hot-heat">{{ item.heat }}热度</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 搜索结果区域 -->
    <section class="search-results" v-if="isSearching">
      <div class="results-header">
        <span class="results-count">找到 {{ searchResults.length }} 个结果</span>
        <div class="sort-options">
          <button 
            class="sort-btn" 
            :class="{ active: sortBy === 'time' }"
            @click="setSortBy('time')"
          >
            时间
          </button>
          <button 
            class="sort-btn" 
            :class="{ active: sortBy === 'views' }"
            @click="setSortBy('views')"
          >
            热度
          </button>
        </div>
      </div>

      <div class="results-list" v-if="searchResults.length > 0">
        <div 
          class="result-item" 
          v-for="(video, index) in sortedResults" 
          :key="video.id"
          @click="playVideo(video)"
        >
          <div class="result-thumbnail">
            <ImageWithFallback :src="video.thumbnail" :alt="video.title" />
            <div class="video-duration" v-if="video.duration">{{ video.duration }}</div>
            <div class="video-quality" v-if="video.quality">{{ video.quality }}</div>
          </div>
          <div class="result-content">
            <h3 class="result-title">{{ video.title }}</h3>
            <div class="result-meta">
              <span class="result-category">{{ video.category }}</span>
              <span class="result-views">{{ video.views }}</span>
              <span class="result-time">{{ video.time }}</span>
            </div>
            <div class="result-description" v-if="video.description">
              {{ video.description }}
            </div>
          </div>
        </div>
      </div>

      <!-- 加载更多 -->
      <div class="load-more-container" v-if="hasMoreResults">
        <button 
          class="load-more-btn" 
          @click="loadMoreResults"
          :disabled="isLoadingMore"
        >
          {{ isLoadingMore ? '加载中...' : '加载更多' }}
        </button>
      </div>

      <!-- 无结果提示 -->
      <div class="no-results" v-if="searchResults.length === 0 && !isLoading">
        <div class="no-results-icon">🔍</div>
        <p>没有找到相关结果</p>
        <p class="no-results-tip">试试其他关键词或检查拼写</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import appConfig from '../config/appConfig.json'
import ImageWithFallback from './ImageWithFallback.vue'

// 定义事件
const emit = defineEmits(['goBack', 'playVideo'])

// 搜索相关状态
const searchKeyword = ref('')
const searchResults = ref([])
const isSearching = ref(false)
const isLoadingMore = ref(false)
const hasMoreResults = ref(true)
const currentPage = ref(1)
const sortBy = ref('time') // 'time' 或 'views'

// 搜索历史
const searchHistory = ref([])

// 热门搜索关键词（带排名和热度值）
const hotKeywords = ref([
  { keyword: '自慰', heat: 100876, rank: 1 },
  { keyword: '抖音', heat: 79107, rank: 2 },
  { keyword: 'cos', heat: 61874, rank: 3 },
  { keyword: '萝莉', heat: 58395, rank: 4 },
  { keyword: '巨乳', heat: 54746, rank: 5 },
  { keyword: '快手', heat: 46699, rank: 6 },
  { keyword: '喷水', heat: 43036, rank: 7 },
  { keyword: '熟女', heat: 42287, rank: 8 },
  { keyword: '户外', heat: 41033, rank: 9 },
  { keyword: '足交', heat: 40340, rank: 10 }
])

// 计算属性：排序后的结果
const sortedResults = computed(() => {
  if (sortBy.value === 'views') {
    return [...searchResults.value].sort((a, b) => {
      const aViews = parseInt(a.views.replace(/[^\d]/g, ''))
      const bViews = parseInt(b.views.replace(/[^\d]/g, ''))
      return bViews - aViews
    })
  } else {
    return [...searchResults.value].sort((a, b) => {
      return new Date(b.time) - new Date(a.time)
    })
  }
})

// 生成随机播放次数
const generateRandomViews = () => {
  const views = Math.floor(Math.random() * 50) + 1
  return `${views}万次播放`
}

// 生成随机时长
const generateRandomDuration = () => {
  const minutes = Math.floor(Math.random() * 60) + 1
  const seconds = Math.floor(Math.random() * 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

// 执行搜索
const performSearch = async () => {
  if (!searchKeyword.value.trim()) return
  
  const keyword = searchKeyword.value.trim()
  
  // 添加到搜索历史
  addToHistory(keyword)
  
  // 开始搜索
  isSearching.value = true
  currentPage.value = 1
  searchResults.value = []
  
  await searchVideos(keyword, 1)
}

// 搜索视频API调用
const searchVideos = async (keyword, page = 1) => {
  try {
    if (page === 1) {
      isLoadingMore.value = false
    } else {
      isLoadingMore.value = true
    }
    
    const url = `${appConfig.api.cms.baseUrl}${appConfig.api.cms.endpoints.videoList}`
      .replace('${page}', page)
      .replace('${id}', 0)
      .replace('${keyword}', encodeURIComponent(keyword))
    
    console.log('搜索API URL:', url)
    
    const response = await fetch(url)
    const data = await response.json()
    
    if (data.code === 1 && data.list) {
      const newVideos = data.list.map(item => ({
        id: item.vod_id,
        title: item.vod_name,
        thumbnail: item.vod_pic || '/src/assets/ad_icon.gif',
        views: generateRandomViews(),
        category: item.type_name,
        time: item.vod_time_add || item.vod_time,
        duration: generateRandomDuration(),
        quality: item.vod_remarks || '高清',
        description: item.vod_content ? item.vod_content.substring(0, 100) + '...' : '',
        vod_play_url: item.vod_play_url, // 添加播放地址
        categoryId: item.type_id
      }))
      
      if (page === 1) {
        searchResults.value = newVideos
      } else {
        searchResults.value.push(...newVideos)
      }
      
      // 检查是否还有更多数据
      hasMoreResults.value = page < data.pagecount && searchResults.value.length < data.total
    } else {
      if (page === 1) {
        searchResults.value = []
      }
      hasMoreResults.value = false
    }
  } catch (error) {
    console.error('搜索失败:', error)
    if (page === 1) {
      searchResults.value = []
    }
  } finally {
    isLoadingMore.value = false
  }
}

// 加载更多结果
const loadMoreResults = () => {
  if (!isLoadingMore.value && hasMoreResults.value) {
    currentPage.value++
    searchVideos(searchKeyword.value, currentPage.value)
  }
}

// 设置排序方式
const setSortBy = (type) => {
  sortBy.value = type
}

// 从历史记录搜索
const searchFromHistory = (keyword) => {
  searchKeyword.value = keyword
  performSearch()
}

// 从热门搜索搜索
const searchFromHot = (keyword) => {
  searchKeyword.value = keyword
  performSearch()
}

// 添加到搜索历史
const addToHistory = (keyword) => {
  // 移除已存在的相同关键词
  const index = searchHistory.value.indexOf(keyword)
  if (index > -1) {
    searchHistory.value.splice(index, 1)
  }
  
  // 添加到开头
  searchHistory.value.unshift(keyword)
  
  // 限制历史记录数量
  if (searchHistory.value.length > 10) {
    searchHistory.value = searchHistory.value.slice(0, 10)
  }
  
  // 保存到本地存储
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
}

// 清空搜索历史
const clearHistory = () => {
  searchHistory.value = []
  localStorage.removeItem('searchHistory')
}

// 播放视频
const playVideo = (video) => {
  console.log('播放视频:', video.title)
  console.log('搜索视频播放地址:', video.vod_play_url)
  // 发送视频信息到父组件
  emit('playVideo', {
    ...video,
    vod_play_url: video.vod_play_url || '正片$https://hsckyun.yeffpe.com/share/20251009/EJMo2U35$$$正片$https://hsm3.fhu3hh.com/20251009/EJMo2U35/index.m3u8'
  })
}

// 返回上一页
const goBack = () => {
  // 通过事件通知父组件返回
  emit('goBack')
}

// 组件挂载时加载搜索历史
onMounted(() => {
  const savedHistory = localStorage.getItem('searchHistory')
  if (savedHistory) {
    try {
      searchHistory.value = JSON.parse(savedHistory)
    } catch (error) {
      console.error('加载搜索历史失败:', error)
    }
  }
  
  // 自动聚焦搜索框
  nextTick(() => {
    if (searchInput.value) {
      searchInput.value.focus()
    }
  })
})
</script>

<style scoped>
.search-page {
  height: 100vh;
  background-color: #0e0e0e;
  color: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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

.nav-left {
  display: flex;
  align-items: center;
  gap: 0.174rem;
}

.back-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.087rem;
  border-radius: 0.052rem;
  transition: background-color 0.2s ease;
}

.back-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-left .app-logo {
  width: 0.872rem;
  height: 0.872rem;
  object-fit: contain;
}

.nav-right .search-icon {
  font-size: 0.244rem;
  cursor: pointer;
}

/* 搜索区域 */
.search-section {
  padding: 0.244rem;
}

.search-box {
  display: flex;
  gap: 0.139rem;
  margin-bottom: 0.244rem;
}

.search-input {
  flex: 1;
  background-color: #333333;
  border: 0.017rem solid #555555;
  border-radius: 0.139rem;
  padding: 0.139rem 0.174rem;
  color: white;
  font-size: 0.192rem;
  outline: none;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  border-color: #f6bf00;
}

.search-input::placeholder {
  color: #999999;
}

.search-btn {
  background-color: #f6bf00;
  border: none;
  border-radius: 0.139rem;
  padding: 0.139rem 0.174rem;
  color: #000000;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-btn:hover:not(:disabled) {
  background-color: #e6af00;
}

.search-btn:disabled {
  background-color: #666666;
  cursor: not-allowed;
}

/* 搜索历史 */
.search-history {
  margin-bottom: 0.244rem;
}

.history-title {
  font-size: 0.157rem;
  color: #cccccc;
  margin-bottom: 0.139rem;
}

.history-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.087rem;
  margin-bottom: 0.139rem;
}

.history-tag {
  background-color: #333333;
  color: #ffffff;
  padding: 0.052rem 0.139rem;
  border-radius: 0.087rem;
  font-size: 0.157rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.history-tag:hover {
  background-color: #444444;
}

.clear-history-btn {
  background: none;
  border: none;
  color: #999999;
  font-size: 0.122rem;
  cursor: pointer;
  text-decoration: underline;
}

/* 热门搜索 */
.hot-search {
  margin-bottom: 0.244rem;
}

.hot-title {
  display: flex;
  align-items: center;
  gap: 0.087rem;
  font-size: 0.157rem;
  color: #f6bf00;
  margin-bottom: 0.139rem;
  font-weight: 500;
}

.flame-icon {
  flex-shrink: 0;
}

.hot-list {
  display: flex;
  flex-direction: column;
  gap: 0.087rem;
}

.hot-item {
  display: flex;
  align-items: center;
  gap: 0.139rem;
  padding: 0.087rem 0;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-radius: 0.052rem;
}

.hot-item:hover {
  background-color: rgba(246, 191, 0, 0.1);
}

.hot-rank {
  width: 0.349rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.crown-rank {
  display: flex;
  align-items: center;
  justify-content: center;
}

.number-rank {
  font-size: 0.157rem;
  color: #ff8c00;
  font-weight: bold;
  min-width: 0.174rem;
  text-align: center;
}

.hot-keyword {
  flex: 1;
  font-size: 0.157rem;
  color: #f6bf00;
  font-weight: 400;
}

.hot-heat {
  font-size: 0.122rem;
  color: #ff8c00;
  font-weight: 400;
}

/* 搜索结果区域 */
.search-results {
  flex: 1;
  padding: 0 0.244rem;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.search-results::-webkit-scrollbar {
  display: none;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.244rem;
  padding-bottom: 0.139rem;
  border-bottom: 0.017rem solid #333333;
}

.results-count {
  font-size: 0.157rem;
  color: #cccccc;
}

.sort-options {
  display: flex;
  gap: 0.139rem;
}

.sort-btn {
  background-color: #333333;
  color: #ffffff;
  border: none;
  padding: 0.052rem 0.139rem;
  border-radius: 0.052rem;
  font-size: 0.122rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.sort-btn.active {
  background-color: #f6bf00;
  color: #000000;
}

.sort-btn:hover:not(.active) {
  background-color: #444444;
}

/* 搜索结果列表 */
.results-list {
  display: flex;
  flex-direction: column;
  gap: 0.244rem;
}

.result-item {
  display: flex;
  gap: 0.174rem;
  cursor: pointer;
  padding: 0.139rem;
  border-radius: 0.087rem;
  transition: background-color 0.2s ease;
}

.result-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.result-thumbnail {
  position: relative;
  width: 1.744rem;
  height: 0.981rem;
  border-radius: 0.087rem;
  overflow: hidden;
  flex-shrink: 0;
}

.result-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-duration {
  position: absolute;
  bottom: 0.035rem;
  right: 0.035rem;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 0.105rem;
  padding: 0.017rem 0.035rem;
  border-radius: 0.035rem;
}

.video-quality {
  position: absolute;
  top: 0.035rem;
  left: 0.035rem;
  background-color: rgba(246, 191, 0, 0.9);
  color: #000000;
  font-size: 0.105rem;
  padding: 0.017rem 0.035rem;
  border-radius: 0.035rem;
  font-weight: bold;
}

.result-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.result-title {
  font-size: 0.192rem;
  color: #ffffff;
  line-height: 1.3;
  margin: 0 0 0.087rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.result-meta {
  display: flex;
  gap: 0.139rem;
  margin-bottom: 0.052rem;
  font-size: 0.122rem;
  color: #999999;
}

.result-category {
  background-color: rgba(246, 191, 0, 0.2);
  color: #f6bf00;
  padding: 0.017rem 0.035rem;
  border-radius: 0.035rem;
}

.result-description {
  font-size: 0.122rem;
  color: #cccccc;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 加载更多 */
.load-more-container {
  display: flex;
  justify-content: center;
  padding: 0.244rem 0;
}

.load-more-btn {
  background-color: #333333;
  color: #ffffff;
  border: none;
  padding: 0.139rem 0.349rem;
  border-radius: 0.139rem;
  font-size: 0.157rem;
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

/* 无结果提示 */
.no-results {
  text-align: center;
  padding: 0.697rem 0;
  color: #999999;
}

.no-results-icon {
  font-size: 0.697rem;
  margin-bottom: 0.244rem;
}

.no-results p {
  font-size: 0.192rem;
  margin: 0.087rem 0;
}

.no-results-tip {
  font-size: 0.157rem;
  color: #666666;
}
</style>
