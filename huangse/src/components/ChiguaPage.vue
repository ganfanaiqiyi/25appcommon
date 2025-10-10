<template>
  <div class="video-page">
    <!-- 顶部导航栏 -->
    <header class="top-nav">
      <div class="nav-left">
        <span class="app-name">黄色仓库</span>
      </div>
      <div class="nav-center">
        <div class="nav-tabs">
          <div class="nav-tab" :class="{ active: activeTab === 'home' }" @click="setActiveTab('home')">首页</div>
          <div class="nav-tab" :class="{ active: activeTab === 'douyin' }" @click="setActiveTab('douyin')">抖阴</div>
          <div class="nav-tab" :class="{ active: activeTab === 'drama' }" @click="setActiveTab('drama')">短剧</div>
        </div>
      </div>
      <div class="nav-right">
        <div class="search-icon">🔍</div>
      </div>
    </header>

    <!-- 分类导航 -->
    <div class="category-nav">
      <div class="category-scroll">
        <div 
          class="category-item" 
          v-for="(category, index) in categories" 
          :key="index"
          :class="{ active: activeCategory === index }"
          @click="setActiveCategory(index)"
        >
          {{ category }}
        </div>
      </div>
    </div>

    <!-- 推荐视频网格 -->
    <section class="featured-videos">
      <div class="video-grid">
        <div 
          class="video-card" 
          v-for="(video, index) in featuredVideos" 
          :key="index"
          @click="playVideo(video)"
        >
          <div class="video-thumbnail">
            <img :src="video.thumbnail" :alt="video.title" />
            <div class="video-overlay" v-if="video.tag">{{ video.tag }}</div>
          </div>
          <div class="video-title">{{ video.title }}</div>
        </div>
      </div>
    </section>

    <!-- 广告横幅 -->
    <section class="ad-banners">
      <div 
        class="banner-item" 
        v-for="(banner, index) in banners" 
        :key="index"
        @click="openBanner(banner.url)"
      >
        <div class="banner-content">
          <div class="banner-title">{{ banner.title }}</div>
          <div class="banner-subtitle">{{ banner.subtitle }}</div>
          <div class="banner-url">{{ banner.url }}</div>
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
          @click="selectCategory(button)"
        >
          {{ button }}
        </div>
      </div>
    </section>

    <!-- 分割线 -->
    <div class="divider"></div>

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
          v-for="(video, index) in listVideos" 
          :key="index"
          @click="playVideo(video)"
        >
          <div class="list-thumbnail">
            <img :src="video.thumbnail" :alt="video.title" />
            <div class="play-count">{{ video.views }}</div>
            <div class="duration">{{ video.duration }}</div>
          </div>
          <div class="list-content">
            <h3 class="list-title">{{ video.title }}</h3>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 顶部导航状态
const activeTab = ref('douyin')

// 分类导航
const activeCategory = ref(0)
const categories = ref([
  '热门推荐', '禁忌乱伦', '国产专区', '日韩欧美', '华语AV'
])

// 推荐视频数据
const featuredVideos = ref([
  {
    title: '同城约炮',
    thumbnail: '/src/assets/ad_icon.gif',
    tag: '无色无味'
  },
  {
    title: '催情春药',
    thumbnail: '/src/assets/ad_icon.gif',
    tag: '全国空降'
  },
  {
    title: '迷药',
    thumbnail: '/src/assets/ad_icon.gif',
    tag: ''
  },
  {
    title: '快速约炮',
    thumbnail: '/src/assets/ad_icon.gif',
    tag: ''
  },
  {
    title: '情趣用品',
    thumbnail: '/src/assets/ad_icon.gif',
    tag: ''
  }
])

// 广告横幅数据
const banners = ref([
  {
    title: '9B娱乐',
    subtitle: '20年 诚信新平台',
    url: '9B.com'
  },
  {
    title: '澳门新葡京赌场',
    subtitle: '一注翻身 就在今晚',
    url: '008.com'
  },
  {
    title: '永利皇宫',
    subtitle: '',
    url: '595.COM'
  },
  {
    title: '存83 送89',
    subtitle: 'PG爆大奖',
    url: '8389.com'
  }
])

// 分类按钮数据
const categoryButtons = ref([
  'JK萝莉', '无套内射', '肉欲调教', '本月人气',
  '乱伦换妻', '知名网黄', '肥臀巨乳', '公共性爱',
  '原创自拍', '极品反差', '会所按摩', '探花外围',
  '粉嫩少女', '媚黑母狗', '浪淫孕妇', '白虎美穴'
])

// 列表标签
const activeListTab = ref(0)
const listTabs = ref(['最新更新', '本周最热', '最多观看', '十分钟以上'])

// 列表视频数据
const listVideos = ref([
  {
    title: '杏吧鞭妇侠1-今天约了个打扮酷酷的御姐!很骚但会...',
    thumbnail: '/src/assets/ad_icon.gif',
    views: '1.6万次播放',
    duration: '27:56'
  },
  {
    title: '杏吧渣男8-约了个以前在东莞做技术指导的老师来,...',
    thumbnail: '/src/assets/ad_icon.gif',
    views: '1.2万次播放',
    duration: '32:19'
  }
])

// 方法
const setActiveTab = (tab) => {
  activeTab.value = tab
}

const setActiveCategory = (index) => {
  activeCategory.value = index
}

const setActiveListTab = (index) => {
  activeListTab.value = index
}

const playVideo = (video) => {
  console.log('播放视频:', video.title)
}

const openBanner = (url) => {
  window.open(`https://${url}`, '_blank')
}

const selectCategory = (category) => {
  console.log('选择分类:', category)
}
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

/* 顶部导航栏 */
.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.174rem 0.244rem;
  background-color: #000000;
  border-bottom: 0.017rem solid #333333;
  height: 0.697rem;
}

.nav-left .app-name {
  font-size: 0.244rem;
  color: #f6bf00;
  font-weight: bold;
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

/* 分类导航 */
.category-nav {
  background-color: #1a1a1a;
  padding: 0.139rem 0;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.category-nav::-webkit-scrollbar {
  display: none;
}

.category-scroll {
  display: flex;
  gap: 0.244rem;
  padding: 0 0.244rem;
  white-space: nowrap;
}

.category-item {
  font-size: 0.174rem;
  color: #999999;
  cursor: pointer;
  padding: 0.087rem 0.174rem;
  border-radius: 0.139rem;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.category-item.active {
  color: #f6bf00;
  background-color: rgba(246, 191, 0, 0.1);
}

/* 推荐视频网格 */
.featured-videos {
  padding: 0.244rem;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.139rem;
}

.video-card {
  cursor: pointer;
}

.video-thumbnail {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 0.087rem;
  overflow: hidden;
  margin-bottom: 0.087rem;
}

.video-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-overlay {
  position: absolute;
  top: 0.035rem;
  right: 0.035rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 0.122rem;
  padding: 0.017rem 0.052rem;
  border-radius: 0.035rem;
}

.video-title {
  font-size: 0.139rem;
  color: #ffffff;
  text-align: center;
  line-height: 1.2;
}

/* 广告横幅 */
.ad-banners {
  padding: 0.139rem 0.244rem;
  display: flex;
  gap: 0.139rem;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.ad-banners::-webkit-scrollbar {
  display: none;
}

.banner-item {
  flex-shrink: 0;
  width: 2.791rem;
  height: 0.697rem;
  background: linear-gradient(135deg, #ff6b6b, #ff8e53);
  border-radius: 0.087rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 0.139rem;
}

.banner-content {
  color: white;
}

.banner-title {
  font-size: 0.174rem;
  font-weight: bold;
  margin-bottom: 0.017rem;
}

.banner-subtitle {
  font-size: 0.122rem;
  opacity: 0.9;
  margin-bottom: 0.017rem;
}

.banner-url {
  font-size: 0.122rem;
  opacity: 0.8;
}

/* 分类按钮网格 */
.category-buttons {
  padding: 0.244rem;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.139rem;
}

.category-button {
  background-color: #333333;
  color: #ffffff;
  font-size: 0.139rem;
  padding: 0.139rem 0.087rem;
  border-radius: 0.052rem;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.category-button:hover {
  background-color: #444444;
}

/* 分割线 */
.divider {
  height: 0.017rem;
  background-color: #333333;
  margin: 0.139rem 0;
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
  font-size: 0.174rem;
  color: #999999;
  cursor: pointer;
  padding: 0.087rem 0.174rem;
  transition: color 0.2s ease;
}

.list-tab.active {
  color: #f6bf00;
}

.video-list {
  display: flex;
  flex-direction: column;
  gap: 0.244rem;
}

.list-video-item {
  display: flex;
  gap: 0.174rem;
  cursor: pointer;
}

.list-thumbnail {
  position: relative;
  width: 2.791rem;
  height: 1.569rem;
  border-radius: 0.087rem;
  overflow: hidden;
  flex-shrink: 0;
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

.duration {
  position: absolute;
  bottom: 0.035rem;
  right: 0.035rem;
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
  font-size: 0.174rem;
  color: #ffffff;
  line-height: 1.3;
  margin: 0;
}
</style>
