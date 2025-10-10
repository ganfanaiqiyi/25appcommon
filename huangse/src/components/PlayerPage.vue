<template>
  <div class="player-page">
    <!-- 顶部导航栏 -->
    <header class="top-nav">
      <div class="nav-left">
        <button class="back-btn" @click="goBack">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M12 19L5 12L12 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <img :src="wz_logo" alt="黄色仓库" class="app-logo" />
      </div>
    </header>

    <!-- 视频播放器区域 -->
    <section class="video-player-section">
      <div class="video-player">
        <iframe 
          class="player-iframe" 
          :src="iframeUrl" 
          allowfullscreen 
          frameborder="0"
          referrerpolicy="no-referrer"
        ></iframe>
      </div>
    </section>

    <!-- 视频信息区域 -->
    <section class="video-info-section">
      <div class="info-tabs">
        <div 
          class="info-tab" 
          :class="{ active: activeTab === 'info' }"
          @click="setActiveTab('info')"
        >
          简介
        </div>
        <div 
          class="info-tab" 
          :class="{ active: activeTab === 'comments' }"
          @click="setActiveTab('comments')"
        >
          评论({{ comments.length }})
        </div>
      </div>

      <!-- 视频详情 -->
      <div class="video-details" v-if="activeTab === 'info'">
        <h1 class="video-title">{{ videoInfo.title }}</h1>
        <div class="video-meta">
          <span class="play-count">{{ videoInfo.views }}次播放</span>
          <div class="action-buttons">
            <button class="action-btn" @click="toggleFavorite">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" :fill="isFavorited ? '#f6bf00' : 'none'" :stroke="isFavorited ? '#f6bf00' : 'white'" stroke-width="2"/>
              </svg>
              {{ favoriteCount }}
            </button>
            <button class="action-btn" @click="shareVideo">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" fill="white"/>
              </svg>
              分享
            </button>
          </div>
        </div>
        <div class="video-description" v-if="videoInfo.description">
          {{ videoInfo.description }}
        </div>
      </div>

      <!-- 评论区域 -->
      <div class="comments-section" v-if="activeTab === 'comments'">
        <div class="comment-input">
          <input 
            type="text" 
            v-model="newComment" 
            placeholder="说点什么..."
            class="comment-field"
            @keyup.enter="addComment"
          />
          <button class="comment-btn" @click="addComment">发送</button>
        </div>
        <div class="comments-list">
          <div 
            class="comment-item" 
            v-for="comment in comments" 
            :key="comment.id"
          >
            <div class="comment-avatar">
              <ImageWithFallback :src="comment.avatar" :alt="comment.username" />
            </div>
            <div class="comment-content">
              <div class="comment-header">
                <span class="comment-username">{{ comment.username }}</span>
                <span class="comment-time">{{ comment.time }}</span>
              </div>
              <div class="comment-text">{{ comment.text }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 广告区域 -->
    <section class="ads-section" v-if="ads.length > 0">
      <div class="ads-scroll">
        <div class="ads-grid">
          <div 
            class="ad-item" 
            v-for="(ad, index) in ads.slice(0, 10)" 
            :key="index"
            @click="openAd(ad)"
          >
            <ImageWithFallback :src="ad.image" :alt="ad.title" class="ad-image" />
            <div class="ad-content">
              <div class="ad-title">{{ ad.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 相关视频推荐 -->
    <section class="related-videos-section">
      <div class="section-title">相关推荐</div>
      <div class="related-videos-scroll">
        <div class="related-videos">
          <div 
            class="related-video-item" 
            v-for="video in relatedVideos" 
            :key="video.id"
            @click="playRelatedVideo(video)"
          >
            <div class="related-thumbnail">
              <ImageWithFallback :src="video.thumbnail" :alt="video.title" />
              <div class="video-duration">{{ video.duration }}</div>
            </div>
            <div class="related-content">
              <h3 class="related-title">{{ video.title }}</h3>
              <div class="related-meta">
                <span class="related-views">{{ video.views }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import adsConfig from '../config/ads.json'
import appConfig from '../config/appConfig.json'
import wz_logo from '../assets/wz_logo.jpg'
import avatar from '../assets/avatar.png'
import ad_icon from '../assets/ad_icon.gif'
import { fetchVideoList } from '../utils/api.js'
import ImageWithFallback from './ImageWithFallback.vue'
import { openUrl } from '../utils/webviewUtils.js'

// 定义事件
const emit = defineEmits(['goBack', 'playRelatedVideo'])

// 接收视频信息
const props = defineProps({
  videoInfo: {
    type: Object,
    required: true
  }
})

// 视频播放相关状态
const videoUrl = ref('')
const iframeUrl = computed(() => {
  if (!videoUrl.value) return ''
  return `https://jx.bfhsck.com/m3u8/?url=${encodeURIComponent(videoUrl.value)}`
})

// 界面状态
const activeTab = ref('info')
const isFavorited = ref(false)
const favoriteCount = ref(0)

// 评论相关
const comments = ref([])
const newComment = ref('')

// 广告数据
const ads = ref([])

// 相关视频
const relatedVideos = ref([])

// 计算属性：解析播放地址
const parsedPlayUrl = computed(() => {
  if (!props.videoInfo.vod_play_url) return ''
  
  // 解析播放地址格式：正片$https://hsckyun.yeffpe.com/share/20251009/EJMo2U35$$$正片$https://hsm3.fhu3hh.com/20251009/EJMo2U35/index.m3u8
  const urlParts = props.videoInfo.vod_play_url.split('$$$')
  for (const part of urlParts) {
    if (part.includes('$')) {
      const segments = part.split('$')
      if (segments.length >= 2) {
        const url = segments[1]
        if (url.includes('.m3u8')) {
          return url
        }
      }
    }
  }
  return ''
})

// 由于改为 iframe 播放，移除原 video 控制逻辑

// 设置激活标签
const setActiveTab = (tab) => {
  activeTab.value = tab
}

// 切换收藏
const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value
  favoriteCount.value += isFavorited.value ? 1 : -1
}

// 分享视频
const shareVideo = () => {
  if (navigator.share) {
    navigator.share({
      title: props.videoInfo.title,
      url: window.location.href
    })
  } else {
    // 复制链接到剪贴板
    navigator.clipboard.writeText(window.location.href)
    alert('链接已复制到剪贴板')
  }
}

// 添加评论
const addComment = () => {
  if (!newComment.value.trim()) return
  
  const comment = {
    id: Date.now(),
    username: '匿名用户',
    avatar: '/src/assets/avatar.png',
    text: newComment.value,
    time: '刚刚'
  }
  
  comments.value.unshift(comment)
  newComment.value = ''
}

// 打开广告
const openAd = (ad) => {
  if (ad.url) {
    openUrl(ad.url, '_blank')
  }
}

// 播放相关视频
const playRelatedVideo = (video) => {
  console.log('播放相关视频:', video.title)
  // 通过事件通知父组件切换视频
  emit('playRelatedVideo', {
    ...video,
    vod_play_url: video.vod_play_url || '正片$https://hsckyun.yeffpe.com/share/20251009/EJMo2U35$$$正片$https://hsm3.fhu3hh.com/20251009/EJMo2U35/index.m3u8'
  })
}

// 返回上一页
const goBack = () => {
  emit('goBack')
}

// 生成随机播放次数
const generateRandomViews = () => {
  const views = Math.floor(Math.random() * 100) + 1
  return `${views}万次播放`
}

// 生成随机时长
const generateRandomDuration = () => {
  const minutes = Math.floor(Math.random() * 60) + 1
  const seconds = Math.floor(Math.random() * 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

// 加载广告数据
const loadAds = () => {
  // 从广告配置中获取前10个小图标广告
  ads.value = adsConfig.ads.icon.slice(0, 10).map((ad, index) => ({
    id: index + 1,
    title: ad.title,
    description: ad.description,
    image: ad.image,
    url: ad.url
  }))
}

// 加载相关视频
const loadRelatedVideos = async () => {
  try {
    console.log('加载相关视频，分类ID:', props.videoInfo.categoryId || 0)
    
    const data = await fetchVideoList(1, props.videoInfo.categoryId || 0, '')
    
    if (data.code === 1 && data.list) {
      relatedVideos.value = data.list.slice(0, 10).map(item => ({
        id: item.vod_id,
        title: item.vod_name,
        thumbnail: item.vod_pic || ad_icon,
        views: generateRandomViews(),
        duration: generateRandomDuration(),
        categoryId: item.type_id,
        vod_play_url: item.vod_play_url || '正片$https://hsckyun.yeffpe.com/share/20251009/EJMo2U35$$$正片$https://hsm3.fhu3hh.com/20251009/EJMo2U35/index.m3u8'
      }))
    }
  } catch (error) {
    console.error('加载相关视频失败:', error)
  }
}

// 监听 props.videoInfo 变化，更新播放地址
watch(() => props.videoInfo?.vod_play_url, (newUrl) => {
  if (newUrl) {
    // 解析播放地址格式：正片$https://hsckyun.yeffpe.com/share/20251009/EJMo2U35$$$正片$https://hsm3.fhu3hh.com/20251009/EJMo2U35/index.m3u8
    const urlParts = newUrl.split('$$$')
    for (const part of urlParts) {
      if (part.includes('$')) {
        const segments = part.split('$')
        if (segments.length >= 2) {
          const url = segments[1]
          if (url.includes('.m3u8')) {
            videoUrl.value = url
            return
          }
        }
      }
    }
    videoUrl.value = ''
  }
}, { immediate: true })

// 组件挂载时初始化
onMounted(() => {
  // 初始化收藏状态
  favoriteCount.value = Math.floor(Math.random() * 1000) + 100
  
  // 加载数据
  loadAds()
  loadRelatedVideos()
  
  // 添加一些模拟评论
  comments.value = [
    {
      id: 1,
      username: '用户001',
      avatar: avatar,
      text: '这个视频很不错！',
      time: '2分钟前'
    },
    {
      id: 2,
      username: '用户002',
      avatar: avatar,
      text: '感谢分享！',
      time: '5分钟前'
    }
  ]
})
</script>

<style scoped>
.player-page {
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
  position: sticky;
  top: 0;
  z-index: 100;
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

/* 视频播放器区域 */
.video-player-section {
  flex-shrink: 0;
}

.video-player {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  background-color: #000;
}

.player-video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.player-iframe {
  width: 100%;
  height: 100%;
}

/* 取消原视频覆盖与按钮样式 */

/* 视频信息区域 */
.video-info-section {
  flex: 1;
  padding: 0.244rem;
}

.info-tabs {
  display: flex;
  gap: 0.244rem;
  margin-bottom: 0.244rem;
  border-bottom: 0.017rem solid #333333;
}

.info-tab {
  font-size: 0.192rem;
  color: #999999;
  cursor: pointer;
  padding: 0.087rem 0.174rem;
  transition: color 0.2s ease;
}

.info-tab.active {
  color: #f6bf00;
  border-bottom: 0.017rem solid #f6bf00;
}

.video-details {
  margin-bottom: 0.244rem;
}

.video-title {
  font-size: 0.244rem;
  color: #ffffff;
  line-height: 1.3;
  margin: 0 0 0.139rem 0;
}

.video-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.139rem;
}

.play-count {
  font-size: 0.157rem;
  color: #999999;
}

.action-buttons {
  display: flex;
  gap: 0.174rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.052rem;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 0.157rem;
  cursor: pointer;
  padding: 0.052rem 0.087rem;
  border-radius: 0.052rem;
  transition: background-color 0.2s ease;
}

.action-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.video-description {
  font-size: 0.174rem;
  color: #cccccc;
  line-height: 1.4;
  margin-top: 0.139rem;
}

/* 评论区域 */
.comments-section {
  margin-bottom: 0.244rem;
}

.comment-input {
  display: flex;
  gap: 0.139rem;
  margin-bottom: 0.244rem;
}

.comment-field {
  flex: 1;
  background-color: #333333;
  border: 0.017rem solid #555555;
  border-radius: 0.139rem;
  padding: 0.139rem 0.174rem;
  color: white;
  font-size: 0.174rem;
  outline: none;
}

.comment-field:focus {
  border-color: #f6bf00;
}

.comment-btn {
  background-color: #f6bf00;
  border: none;
  border-radius: 0.139rem;
  padding: 0.139rem 0.174rem;
  color: #000000;
  font-size: 0.174rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.comment-btn:hover {
  background-color: #e6af00;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 0.174rem;
}

.comment-item {
  display: flex;
  gap: 0.139rem;
}

.comment-avatar {
  width: 0.349rem;
  height: 0.349rem;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.comment-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.052rem;
}

.comment-username {
  font-size: 0.157rem;
  color: #f6bf00;
  font-weight: 500;
}

.comment-time {
  font-size: 0.122rem;
  color: #999999;
}

.comment-text {
  font-size: 0.174rem;
  color: #ffffff;
  line-height: 1.4;
}

/* 广告区域 */
.ads-section {
  margin-bottom: 0.244rem;
}

.ads-scroll {
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.ads-scroll::-webkit-scrollbar {
  display: none;
}

.ads-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.139rem;
  padding: 0.087rem 0;
}

.ad-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  padding: 0.087rem;
  border-radius: 0.087rem;
  transition: background-color 0.2s ease;
}

.ad-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.ad-image {
  width: 0.872rem;
  height: 0.872rem;
  border-radius: 0.087rem;
  object-fit: cover;
  margin-bottom: 0.052rem;
}

.ad-content {
  width: 100%;
}

.ad-title {
  font-size: 0.157rem;
  color: #ffffff;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 相关视频推荐 */
.related-videos-section {
  margin-bottom: 0.244rem;
  padding: 0 0.244rem;
}

.section-title {
  font-size: 0.192rem;
  color: #f6bf00;
  font-weight: 500;
  margin-bottom: 0.139rem;
}

.related-videos-scroll {
  max-height: 4.872rem; /* 限制最大高度 */
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.related-videos-scroll::-webkit-scrollbar {
  display: none;
}

.related-videos {
  display: flex;
  flex-direction: column;
  gap: 0.174rem;
}

.related-video-item {
  display: flex;
  gap: 0.174rem;
  cursor: pointer;
  padding: 0.087rem;
  border-radius: 0.087rem;
  transition: background-color 0.2s ease;
}

.related-video-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.related-thumbnail {
  position: relative;
  width: 1.744rem;
  height: 0.981rem;
  border-radius: 0.087rem;
  overflow: hidden;
  flex-shrink: 0;
}

.related-thumbnail img {
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

.related-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.related-title {
  font-size: 0.174rem;
  color: #ffffff;
  line-height: 1.3;
  margin: 0 0 0.052rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-meta {
  margin-top: auto;
}

.related-views {
  font-size: 0.122rem;
  color: #999999;
}

/* 视频错误样式 */
.video-error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #ffffff;
}

.error-icon {
  font-size: 0.697rem;
  margin-bottom: 0.244rem;
}

.video-error p {
  font-size: 0.192rem;
  margin: 0.087rem 0;
}

.error-tip {
  font-size: 0.157rem;
  color: #999999;
}

.retry-btn {
  background-color: #f6bf00;
  border: none;
  border-radius: 0.139rem;
  padding: 0.139rem 0.244rem;
  color: #000000;
  font-size: 0.174rem;
  cursor: pointer;
  margin-top: 0.174rem;
  transition: background-color 0.2s ease;
}

.retry-btn:hover {
  background-color: #e6af00;
}
</style>
