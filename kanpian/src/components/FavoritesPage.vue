<template>
  <div class="favorites-page">
    <div class="page-header">
      <h1 class="page-title">我的收藏</h1>
      <p class="page-subtitle">您收藏的视频内容</p>
    </div>
    
    <div class="content-section">
      <div class="empty-state">
        <div class="empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61Z" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3 class="empty-title">暂无收藏</h3>
        <p class="empty-description">您还没有收藏任何视频，快去发现精彩内容吧！</p>
        <button class="explore-btn" @click="goToExplore">去探索</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const goToExplore = () => {
  console.log('跳转到探索页面')
}
</script>

<style scoped>
.favorites-page {
  height: 100vh;
  background-color: #0e0e0e;
  color: white;
  padding: 0.244rem;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.favorites-page::-webkit-scrollbar {
  display: none;
}

.page-header {
  text-align: center;
  margin-bottom: 0.349rem;
}

.page-title {
  font-size: 0.418rem; /* 24px */
  color: #ff6b6b;
  margin: 0 0 0.087rem 0;
  font-weight: 600;
}

.page-subtitle {
  font-size: 0.192rem; /* 11px */
  color: #cccccc;
  margin: 0;
}

.content-section {
  background-color: #1a1a1a;
  border-radius: 0.139rem; /* 8px */
  padding: 0.349rem;
  min-height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-state {
  text-align: center;
  padding: 0.349rem;
}

.empty-icon {
  margin-bottom: 0.244rem;
}

.empty-title {
  font-size: 0.244rem; /* 14px */
  color: #ffffff;
  margin: 0 0 0.087rem 0;
  font-weight: 500;
}

.empty-description {
  font-size: 0.157rem; /* 9px */
  color: #999999;
  margin: 0 0 0.244rem 0;
  line-height: 1.4;
}

.explore-btn {
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;
  border: none;
  padding: 0.139rem 0.244rem; /* 8px 14px */
  border-radius: 0.139rem; /* 8px */
  font-size: 0.157rem; /* 9px */
  cursor: pointer;
  transition: all 0.2s ease;
}

.explore-btn:hover {
  transform: translateY(-0.017rem); /* -1px */
  box-shadow: 0 0.052rem 0.174rem rgba(255, 107, 107, 0.3); /* 3px 10px */
}
</style>
