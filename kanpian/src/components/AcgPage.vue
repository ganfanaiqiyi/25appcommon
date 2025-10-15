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
          <!-- 羞羞漫画 -->
          <div class="main-category manga-category">
            <div class="category-icon-section">
              <div class="category-icon">
                <img src="/src/assets/c1.webp" alt="羞羞漫画" class="category-icon-img" />
              </div>
              <div class="category-title">羞羞漫画</div>
            </div>
            <div class="sub-categories">
              <div class="sub-category-row">
                <span class="sub-category" v-for="(item, index) in mangaCategories.slice(0, 4)" :key="index" @click="refreshPage">{{ item }}</span>
              </div>
              <div class="sub-category-row">
                <span class="sub-category" v-for="(item, index) in mangaCategories.slice(4, 8)" :key="index + 4" @click="refreshPage">{{ item }}</span>
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
            <div class="icon-ad-title">{{ ad.title }}</div>
          </div>
        </div>
      </section>

       <!-- 网红博主横幅 -->
       <section class="domestic-banner">
         <div class="banner-content" @click="switchCategory">
           <span class="domestic-text">{{ currentCategoryName }}</span>
         </div>
       </section>

       <!-- 漫画封面区域 -->
       <section class="manga-covers-section">
         <div class="manga-covers-grid">
           <div
             class="manga-cover-item"
             v-for="(manga, index) in mangaCovers"
             :key="index"
             @click="goToLogin"
           >
             <ImageWithFallback 
               :src="manga.image" 
               :alt="manga.title" 
               class="manga-cover-image"
               fallbackBackgroundColor="#fff7fa"
             />
             <div class="manga-cover-title">{{ manga.title }}</div>
           </div>
         </div>
       </section>

     </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import adsConfig from '../config/ads.json'
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

// 小图标广告
const iconAds = ref(adsConfig.ads.icon || [])

// 漫画专区子分类
const mangaCategories = ref(['都市', '校园', '偷情', '后宫', '学生', '萝莉', '乱伦', '调教'])

const selectedCategory = ref(0) // 默认选中网红主播

// 计算当前分类名称
const currentCategoryName = computed(() => {
  const category = mangaCategories[selectedCategory.value];
  return category ? category.type_name : '都市'
})

// 漫画封面数据
const mangaCovers = ref([
  { image: new URL('../assets/s1.jpg', import.meta.url).href, title: '隱秘的同居' },
  { image: new URL('../assets/s2.jpg', import.meta.url).href, title: '暴君會長的嬌媳們' },
  { image: new URL('../assets/s3.jpg', import.meta.url).href, title: '煉慾:色魔再臨' },
  { image: new URL('../assets/s4.jpg', import.meta.url).href, title: '調教開關：第二季' },
  { image: new URL('../assets/s5.jpg', import.meta.url).href, title: '垃圾堆撿到寵物系萌妹' },
  { image: new URL('../assets/s6..jpg', import.meta.url).href, title: '校花的雙面生活' },
  { image: new URL('../assets/s7.jpg', import.meta.url).href, title: '欲演越烈/捕捉美少女' },
  { image: new URL('../assets/s8.jpg', import.meta.url).href, title: '神雕闖都市/強雕：都市潤女傳說' },
  { image: new URL('../assets/s9.jpg', import.meta.url).href, title: '硬也要拍完' },
  { image: new URL('../assets/s10.jpg', import.meta.url).href, title: '不要戀愛要打砲' },
  { image: new URL('../assets/s11.jpg', import.meta.url).href, title: '超導體覺醒/超導體大叔' },
  { image: new URL('../assets/s12.jpg', import.meta.url).href, title: '獵艷管理員' }
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

  // 处理漫画点击
  const openManga = (manga) => {
    console.log('打开漫画:', manga.title)
    // 这里可以添加打开漫画的逻辑
  }

  // 切换分类
  const switchCategory = () => {
    console.log('切换分类')
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

/* 顶部导航栏 */
.top-header {
  height: 0.45rem; /* 30px */
  background-color: #eb9eb6;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  z-index: 1000;
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 0.24rem; /* 16px */
  height: 0.24rem; /* 16px */
  color: white;
}

.vip-text {
  color: white;
  font-size: 0.18rem; /* 12px */
  font-weight: bold;
}

.main-content {
  padding-top: 0.45rem; /* 30px */
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
  width: 100%;
  max-width: 500px;
  height: 4.2rem; /* 280px */
  position: relative;
  overflow: hidden;
  border-radius: 0;
}

.carousel-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.carousel-slide {
  min-width: 100%;
  height: 100%;
  cursor: pointer;
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
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.12rem; /* 8px */
}

.indicator {
  width: 0.12rem; /* 8px */
  height: 0.12rem; /* 8px */
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.indicator.active {
  background-color: white;
}

/* 分类菜单样式 */
.category-menu-section {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
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


.manga-category {
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
  height: 0.6rem; /* 40px */
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
}

/* 官方推荐横幅 */
.recommendation-banner {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.banner-content {
  padding: 0.15rem 0.225rem; /* 10px 15px */
  background-color: #fff7fa;
  border-radius: 0.12rem; /* 8px */
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  width: 1.047rem;
  height: 1.047rem;
  object-fit: cover;
  border-radius: 0.139rem;
  margin-bottom: 0.087rem;
  box-shadow: 0 0.035rem 0.087rem rgba(0,0,0,0.3);
}

.icon-ad-title {
  max-width: 1.047rem;
  color: rgb(141, 95, 110);
  font-size: 0.192rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 国产专区横幅样式 */
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

/* 漫画封面样式 */
.manga-covers-section {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 0.15rem 0.75rem 0.15rem; /* 0 10px 50px 10px */
  box-sizing: border-box;
}

.manga-covers-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.225rem; /* 15px */
  margin: 0.225rem 0 0.45rem 0; /* 15px 0 30px 0 */
}

.manga-cover-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
}

.manga-cover-image {
  width: 100%;
  height: 3rem; /* 200px */
  object-fit: cover;
  border-radius: 0.12rem; /* 8px */
  margin-bottom: 0.12rem; /* 8px */
}

.manga-cover-title {
  font-size: 0.18rem; /* 12px */
  color: #333;
  line-height: 1.4;
  text-align: center;
  word-break: break-all;
  max-width: 100%;
}

</style>