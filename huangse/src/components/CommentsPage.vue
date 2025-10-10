<template>
  <div class="comments-page">
    <div class="page-header">
      <h1 class="page-title">评论回复</h1>
      <p class="page-subtitle">您收到的评论和回复</p>
    </div>
    
    <div class="content-section">
      <div class="empty-state">
        <div class="empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#ff9500" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 9H16" stroke="#ff9500" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 13H12" stroke="#ff9500" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3 class="empty-title">暂无评论回复</h3>
        <p class="empty-description">您还没有收到任何评论回复，快去互动吧！</p>
        <button class="interact-btn" @click="goToInteract">去互动</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const goToInteract = () => {
  console.log('跳转到互动页面')
}
</script>

<style scoped>
.comments-page {
  height: 100vh;
  background-color: #0e0e0e;
  color: white;
  padding: 0.244rem;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.comments-page::-webkit-scrollbar {
  display: none;
}

.page-header {
  text-align: center;
  margin-bottom: 0.349rem;
}

.page-title {
  font-size: 0.418rem; /* 24px */
  color: #ff9500;
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

.interact-btn {
  background: linear-gradient(135deg, #ff9500, #ffb347);
  color: white;
  border: none;
  padding: 0.139rem 0.244rem; /* 8px 14px */
  border-radius: 0.139rem; /* 8px */
  font-size: 0.157rem; /* 9px */
  cursor: pointer;
  transition: all 0.2s ease;
}

.interact-btn:hover {
  transform: translateY(-0.017rem); /* -1px */
  box-shadow: 0 0.052rem 0.174rem rgba(255, 149, 0, 0.3); /* 3px 10px */
}
</style>
