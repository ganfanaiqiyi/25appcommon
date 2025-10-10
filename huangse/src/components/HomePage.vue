<template>
  <div class="home-page">
    <!-- 主要内容区域 -->
    <main class="main-content">
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

      <!-- 分割线 -->
      <div class="divider"></div>

      <!-- 列表式广告区域 -->
      <section class="list-ads-section">
        <div
          class="list-ad-item"
          v-for="(ad, index) in listAds"
          :key="index"
          @click="handleAdClick(ad.url)"
        >
          <ImageWithFallback :src="ad.image" :alt="ad.title" class="list-ad-thumbnail" />
          <div class="list-ad-info">
            <h3 class="list-ad-title">{{ ad.title }}</h3>
            <p class="list-ad-downloads">下载次数: {{ ad.downloads }}</p>
          </div>
          <button class="list-ad-button" @click.stop="handleAdClick(ad.url)">下载</button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import adsConfig from '../config/ads.json'
import appConfig from '../config/appConfig.json'
import { getIconUrl } from '../assets/import-icons.js'
import ImageWithFallback from './ImageWithFallback.vue'
import { openUrl } from '../utils/webviewUtils.js'

// 过滤与排序：去掉包含“直播/约炮”，将“棋牌/开元棋牌”置前
const baseIconAds = adsConfig.ads.icon
  .filter(ad => !/直播|约炮/.test(ad.title))
  .sort((a, b) => {
    const aQp = /棋牌|开元棋牌/.test(a.title) ? 1 : 0
    const bQp = /棋牌|开元棋牌/.test(b.title) ? 1 : 0
    return bQp - aQp
  })

// 根据配置获取广告数据，并处理图标路径
const iconAds = ref(baseIconAds.slice(0, appConfig.ads.iconAdsCount).map(ad => ({
  ...ad,
  image: getIconUrl(ad.image.split('/').pop()) || ad.image
})))
// list 改为从 icon 取前 N 个（默认10）
const listAds = ref(baseIconAds.slice(0, appConfig.ads.listAdsCount || 10).map(ad => ({
  ...ad,
  image: getIconUrl(ad.image.split('/').pop()) || ad.image
})))

const handleAdClick = (url) => {
  if (url) {
    openUrl(url, '_blank')
  }
}
</script>

<style scoped>
.home-page {
  height: 100vh;
  background-color: #0e0e0e;
  color: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.main-content {
  flex: 1;
  margin: 0 auto;
  padding-top: 0.278rem; /* 20px = 0.278rem (20/72) */
  padding-bottom: 1.221rem; /* 70px = 1.221rem (70/57.33) - 为底部菜单栏留出空间 */
  width: 100%;
  overflow-y: auto;
  /* 隐藏滚动条 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

/* 隐藏Webkit浏览器的滚动条 */
.main-content::-webkit-scrollbar {
  display: none;
}

/* 小图标广告区域 */
.icon-ads-grid {
  display: grid;
  grid-template-columns: repeat(5, 1.047rem); /* 60px = 1.047rem (60/57.33) */
  gap: 0.349rem; /* 20px = 0.349rem (20/57.33) */
  justify-content: center; /* 整个网格居中 */
  align-items: start; /* 垂直顶部对齐 */
  width: 100%;
}

.icon-ad-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  width: 1.047rem; /* 60px = 1.047rem (60/57.33) */
  transition: transform 0.2s ease;
}

.icon-ad-item:hover {
  transform: scale(1.05);
}

.icon-ad-image {
  width: 1.047rem; /* 60px = 1.047rem (60/57.33) */
  height: 1.047rem; /* 60px = 1.047rem (60/57.33) */
  object-fit: cover; /* 确保图片填充，可能裁剪 */
  border-radius: 0.139rem; /* 8px = 0.139rem (8/57.33) */
  margin-bottom: 0.087rem; /* 5px = 0.087rem (5/57.33) */
  box-shadow: 0 0.035rem 0.087rem rgba(0, 0, 0, 0.3); /* 2px 5px = 0.035rem 0.087rem */
}

.icon-ad-title {
  font-size: 0.22rem; /* 14px = 0.244rem (14/57.33) */
  color: #ffffff;
  white-space: nowrap; /* 防止标题换行 */
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 显示省略号 */
  max-width: 1.047rem; /* 60px = 1.047rem (60/57.33) */
  margin: 0;
  line-height: 1.2;
}

/* 分割线样式 */
.divider {
  height: 0.035rem; /* 2px = 0.035rem (2/57.33) */
  background-color: #333333;
  margin: 0.349rem 0; /* 20px = 0.349rem (20/57.33) */
}

/* 列表式广告区域样式 */
.list-ads-section {
  padding: 0 0.349rem; /* 20px = 0.349rem (20/57.33) */
}

.list-ad-item {
  display: flex;
  align-items: center;
  border-radius: 0.139rem; /* 8px = 0.139rem (8/57.33) */
  padding: 0.244rem; /* 14px = 0.244rem (14/57.33) */
  margin-bottom: 0.174rem; /* 10px = 0.174rem (10/57.33) */
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.list-ad-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.list-ad-thumbnail {
  width: 1.221rem; /* 70px = 1.221rem (70/57.33) */
  height: 1.221rem; /* 70px = 1.221rem (70/57.33) */
  object-fit: cover;
  border-radius: 0.087rem; /* 5px = 0.087rem (5/57.33) */
  margin-right: 0.244rem; /* 14px = 0.244rem (14/57.33) */
}

.list-ad-info {
  flex: 1;
  margin-right: 0.244rem; /* 14px = 0.244rem (14/57.33) */
}

.list-ad-title {
  font-size: 0.244rem; /* 14px = 0.244rem (14/57.33) */
  color: #ffffff;
  margin: 0 0 0.087rem 0; /* 5px = 0.087rem (5/57.33) */
  font-weight: 500;
}

.list-ad-downloads {
  font-size: 0.192rem; /* 11px = 0.192rem (11/57.33) */
  color: #cccccc;
  margin: 0;
}

.list-ad-button {
  background-color: #ffd700;
  color: #000000;
  border: none;
  border-radius: 0.087rem; /* 5px = 0.087rem (5/57.33) */
  padding: 0.139rem 0.244rem; /* 8px 14px = 0.139rem 0.244rem */
  font-size: 0.192rem; /* 11px = 0.192rem (11/57.33) */
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  min-width: 0.697rem; /* 40px = 0.697rem (40/57.33) */
}

.list-ad-button:hover {
  background-color: #ffed4e;
}
</style>