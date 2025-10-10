<template>
  <div class="profile-page">
    <!-- 返回按钮 -->
    <div class="back-header" v-if="currentPage !== 'profile'">
      <button class="back-btn" @click="goBack">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M12 19L5 12L12 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        返回
      </button>
    </div>

    <!-- 个人中心页面 -->
    <div v-if="currentPage === 'profile'">
      <!-- 用户信息头部 -->
      <div class="user-header">
        <div class="profile-section">
          <div class="profile-picture">
            <ImageWithFallback :src="avatar" alt="用户头像" />
          </div>
          <div class="user-info">
            <h2 class="username">活泼仙人掌</h2>
            <p class="user-id">ID: 3617710</p>
          </div>
        </div>
        <button class="login-btn" @click="goToLogin">
          立即登录
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- 功能选项网格 -->
      <div class="options-grid">
        <div class="option-item" @click="goToPage('favorites')">
          <div class="option-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="option-text">我的收藏</span>
        </div>

        <div class="option-item" @click="goToPage('history')">
          <div class="option-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3H7L9.68 14.39C9.89 15.34 10.7 16 11.66 16H17.34C18.3 16 19.11 15.34 19.32 14.39L21 7H5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 21C9.55228 21 10 20.5523 10 20C10 19.4477 9.55228 19 9 19C8.44772 19 8 19.4477 8 20C8 20.5523 8.44772 21 9 21Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20 21C20.5523 21 21 20.5523 21 20C21 19.4477 20.5523 19 20 19C19.4477 19 19 19.4477 19 20C19 20.5523 19.4477 21 20 21Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="option-text">浏览历史</span>
        </div>

        <div class="option-item" @click="goToPage('posts')">
          <div class="option-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 20H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16.5 3.5C16.8978 3.10218 17.4374 2.87868 18 2.87868C18.5626 2.87868 19.1022 3.10218 19.5 3.5C19.8978 3.89782 20.1213 4.43739 20.1213 5C20.1213 5.56261 19.8978 6.10218 19.5 6.5L12 14L8 10L16.5 3.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="option-text">我的帖子</span>
        </div>

        <div class="option-item" @click="goToPage('comments')">
          <div class="option-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 9H16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 13H12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="option-text">评论回复</span>
        </div>

        <div class="option-item" @click="goToPage('faq')">
          <div class="option-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2"/>
              <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 17H12.01" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="option-text">常见问题</span>
        </div>

        <div class="option-item" @click="goToPage('share')">
          <div class="option-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 6L12 2L8 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 2V15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="option-text">分享邀请</span>
        </div>
      </div>
    </div>

    <!-- 动态页面内容 -->
    <component :is="getCurrentComponent()" v-if="currentPage !== 'profile'" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FavoritesPage from './FavoritesPage.vue'
import HistoryPage from './HistoryPage.vue'
import PostsPage from './PostsPage.vue'
import CommentsPage from './CommentsPage.vue'
import FaqPage from './FaqPage.vue'
import SharePage from './SharePage.vue'
import LoginPage from './LoginPage.vue'
import avatar from '../assets/avatar.png'
import ImageWithFallback from './ImageWithFallback.vue'

// 当前显示的页面
const currentPage = ref('profile')

// 页面组件映射
const pageComponents = {
  profile: null, // 当前页面
  favorites: FavoritesPage,
  history: HistoryPage,
  posts: PostsPage,
  comments: CommentsPage,
  faq: FaqPage,
  share: SharePage,
  login: LoginPage
}

// 处理选项点击
const goToPage = (page) => {
  console.log('跳转到页面:', page)
  currentPage.value = page
}

const goToLogin = () => {
  console.log('跳转到登录页面')
  currentPage.value = 'login'
}

// 返回个人中心
const goBack = () => {
  currentPage.value = 'profile'
}

// 获取当前页面组件
const getCurrentComponent = () => {
  return pageComponents[currentPage.value]
}
</script>

<style scoped>
.profile-page {
  height: 100vh;
  background-color: #0e0e0e;
  color: white;
  padding: 0.244rem;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.profile-page::-webkit-scrollbar {
  display: none;
}

/* 返回按钮 */
.back-header {
  padding: 0.139rem 0; /* 8px 0 */
  margin-bottom: 0.139rem; /* 8px */
}

.back-btn {
  background: none;
  border: none;
  color: white;
  font-size: 0.192rem; /* 11px */
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.052rem; /* 3px */
  padding: 0.087rem 0.174rem; /* 5px 10px */
  border-radius: 0.087rem; /* 5px */
  transition: background-color 0.2s ease;
}

.back-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* 用户信息头部 */
.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.349rem 0;
  margin-bottom: 0.349rem;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 0.244rem;
}

.profile-picture {
  width: 1.047rem; /* 60px */
  height: 1.047rem; /* 60px */
  border-radius: 50%;
  border: 0.035rem solid #f6bf00; /* 2px */
  overflow: hidden;
  flex-shrink: 0;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  flex: 1;
}

.username {
  font-size: 0.244rem; /* 14px */
  color: white;
  margin: 0 0 0.035rem 0; /* 2px */
  font-weight: 500;
}

.user-id {
  font-size: 0.157rem; /* 9px */
  color: #cccccc;
  margin: 0;
}

.login-btn {
  background: none;
  border: none;
  color: white;
  font-size: 0.192rem; /* 11px */
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.035rem; /* 2px */
  padding: 0.087rem 0.174rem; /* 5px 10px */
  border-radius: 0.087rem; /* 5px */
  transition: background-color 0.2s ease;
}

.login-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* 功能选项网格 */
.options-grid {
  background-color: #1a1a1a;
  border-radius: 0.139rem; /* 8px */
  padding: 0.349rem; /* 20px */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.349rem; /* 20px */
}

.option-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.139rem; /* 8px */
  padding: 0.244rem; /* 14px */
  cursor: pointer;
  border-radius: 0.087rem; /* 5px */
  transition: background-color 0.2s ease;
}

.option-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.option-icon {
  width: 0.418rem; /* 24px */
  height: 0.418rem; /* 24px */
  display: flex;
  align-items: center;
  justify-content: center;
}

.option-text {
  font-size: 0.157rem; /* 9px */
  color: white;
  text-align: center;
  line-height: 1.2;
}
</style>