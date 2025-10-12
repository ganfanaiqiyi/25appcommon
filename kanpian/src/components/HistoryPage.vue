<template>
  <div class="history-page">
    <div class="page-header">
      <h1 class="page-title">浏览历史</h1>
      <p class="page-subtitle">您最近观看的视频记录</p>
    </div>
    
    <div class="content-section">
      <div class="empty-state">
        <div class="empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3H7L9.68 14.39C9.89 15.34 10.7 16 11.66 16H17.34C18.3 16 19.11 15.34 19.32 14.39L21 7H5" stroke="#4a90e2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 21C9.55228 21 10 20.5523 10 20C10 19.4477 9.55228 19 9 19C8.44772 19 8 19.4477 8 20C8 20.5523 8.44772 21 9 21Z" stroke="#4a90e2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20 21C20.5523 21 21 20.5523 21 20C21 19.4477 20.5523 19 20 19C19.4477 19 19 19.4477 19 20C19 20.5523 19.4477 21 20 21Z" stroke="#4a90e2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3 class="empty-title">暂无浏览记录</h3>
        <p class="empty-description">您还没有观看任何视频，快去发现精彩内容吧！</p>
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
.history-page {
  height: 100vh;
  background-color: #0e0e0e;
  color: white;
  padding: 0.244rem;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.history-page::-webkit-scrollbar {
  display: none;
}

.page-header {
  text-align: center;
  margin-bottom: 0.349rem;
}

.page-title {
  font-size: 0.418rem; /* 24px */
  color: #4a90e2;
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
  background: linear-gradient(135deg, #4a90e2, #6ba3f0);
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
  box-shadow: 0 0.052rem 0.174rem rgba(74, 144, 226, 0.3); /* 3px 10px */
}
</style>
