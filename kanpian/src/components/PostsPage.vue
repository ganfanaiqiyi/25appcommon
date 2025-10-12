<template>
  <div class="posts-page">
    <div class="page-header">
      <h1 class="page-title">我的帖子</h1>
      <p class="page-subtitle">您发布的帖子内容</p>
    </div>
    
    <div class="content-section">
      <div class="empty-state">
        <div class="empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 20H21" stroke="#34c759" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16.5 3.5C16.8978 3.10218 17.4374 2.87868 18 2.87868C18.5626 2.87868 19.1022 3.10218 19.5 3.5C19.8978 3.89782 20.1213 4.43739 20.1213 5C20.1213 5.56261 19.8978 6.10218 19.5 6.5L12 14L8 10L16.5 3.5Z" stroke="#34c759" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3 class="empty-title">暂无帖子</h3>
        <p class="empty-description">您还没有发布任何帖子，快来分享您的精彩内容吧！</p>
        <button class="create-btn" @click="createPost">创建帖子</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const createPost = () => {
  console.log('创建新帖子')
}
</script>

<style scoped>
.posts-page {
  height: 100vh;
  background-color: #0e0e0e;
  color: white;
  padding: 0.244rem;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.posts-page::-webkit-scrollbar {
  display: none;
}

.page-header {
  text-align: center;
  margin-bottom: 0.349rem;
}

.page-title {
  font-size: 0.418rem; /* 24px */
  color: #34c759;
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

.create-btn {
  background: linear-gradient(135deg, #34c759, #5dd879);
  color: white;
  border: none;
  padding: 0.139rem 0.244rem; /* 8px 14px */
  border-radius: 0.139rem; /* 8px */
  font-size: 0.157rem; /* 9px */
  cursor: pointer;
  transition: all 0.2s ease;
}

.create-btn:hover {
  transform: translateY(-0.017rem); /* -1px */
  box-shadow: 0 0.052rem 0.174rem rgba(52, 199, 89, 0.3); /* 3px 10px */
}
</style>
