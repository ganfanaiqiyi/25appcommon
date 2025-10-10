<template>
  <div class="share-page">
    <div class="page-header">
      <h1 class="page-title">分享邀请</h1>
      <p class="page-subtitle">邀请好友一起享受精彩内容</p>
    </div>
    
    <div class="content-section">
      <div class="share-content">
        <div class="invite-code">
          <h3 class="code-title">您的分享链接</h3>
          <div class="code-display">
            <span class="code-text">{{ shareLink }}</span>
            <button class="copy-btn" @click="copyCode">复制</button>
          </div>
          <p class="code-description">分享此链接给好友，好友通过此链接注册可获得奖励</p>
        </div>
        
        <div class="share-methods">
          <h3 class="methods-title">分享方式</h3>
          <div class="method-list">
            <div class="method-item" @click="shareTo('wechat')">
              <div class="method-icon wechat">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12Z" fill="#07c160"/>
                  <path d="M12 2C6.477 2 2 5.582 2 10C2 12.5 3.5 14.8 6 16.2L5.5 19L8.5 17.5C9.5 17.7 10.5 17.8 11.5 17.8C17.023 17.8 21.5 14.218 21.5 10C21.5 5.582 17.023 2 12 2Z" stroke="#07c160" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span class="method-text">微信分享</span>
            </div>
            
            <div class="method-item" @click="shareTo('qq')">
              <div class="method-icon qq">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" stroke="#12b7f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8 8C8 6.895 8.895 6 10 6H14C15.105 6 16 6.895 16 8V16C16 17.105 15.105 18 14 18H10C8.895 18 8 17.105 8 16V8Z" stroke="#12b7f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span class="method-text">QQ分享</span>
            </div>
            
            <div class="method-item" @click="shareTo('link')">
              <div class="method-icon link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.5521 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.47L11.75 5.18" stroke="#007aff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14 11C13.5705 10.4259 13.0226 9.95087 12.3934 9.60707C11.7643 9.26327 11.0685 9.05886 10.3533 9.00766C9.63816 8.95645 8.92037 9.05972 8.24863 9.31026C7.57689 9.5608 6.96688 9.953 6.46 10.46L3.46 13.46C2.54918 14.403 2.0452 15.6661 2.0566 16.977C2.06799 18.288 2.59383 19.5421 3.52087 20.4691C4.44791 21.3962 5.70198 21.922 7.01296 21.9334C8.32394 21.9448 9.58695 21.4408 10.53 20.53L12.24 18.82" stroke="#007aff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span class="method-text">复制链接</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 生成随机分享码
const generateShareCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

// 分享码和完整链接
const shareCode = ref('')
const shareLink = ref('')

// 获取当前域名
const getCurrentDomain = () => {
  return window.location.origin
}

// 初始化分享信息
onMounted(() => {
  shareCode.value = generateShareCode()
  shareLink.value = `${getCurrentDomain()}?shareCode=${shareCode.value}`
})

const copyCode = () => {
  navigator.clipboard.writeText(shareLink.value)
  console.log('分享链接已复制:', shareLink.value)
}

const shareTo = (method) => {
  console.log('分享到:', method, '链接:', shareLink.value)
}
</script>

<style scoped>
.share-page {
  height: 100vh;
  background-color: #0e0e0e;
  color: white;
  padding: 0.244rem;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.share-page::-webkit-scrollbar {
  display: none;
}

.page-header {
  text-align: center;
  margin-bottom: 0.349rem;
}

.page-title {
  font-size: 0.418rem; /* 24px */
  color: #007aff;
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
}

.share-content {
  display: flex;
  flex-direction: column;
  gap: 0.349rem; /* 20px */
}

.invite-code {
  text-align: center;
  padding: 0.244rem;
  background-color: #2a2a2a;
  border-radius: 0.087rem; /* 5px */
}

.code-title {
  font-size: 0.244rem; /* 14px */
  color: #ffffff;
  margin: 0 0 0.139rem 0;
  font-weight: 500;
}

.code-display {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0.139rem; /* 8px */
  margin-bottom: 0.139rem; /* 8px */
}

.code-text {
  font-size: 0.192rem; /* 11px */
  color: #007aff;
  font-weight: 500;
  font-family: monospace;
  word-break: break-all;
  line-height: 1.3;
  flex: 1;
}

.copy-btn {
  background-color: #007aff;
  color: white;
  border: none;
  padding: 0.087rem 0.139rem; /* 5px 8px */
  border-radius: 0.052rem; /* 3px */
  font-size: 0.139rem; /* 8px */
  cursor: pointer;
  transition: background-color 0.2s ease;
  flex-shrink: 0;
  margin-left: 0.139rem; /* 8px */
}

.copy-btn:hover {
  background-color: #0056cc;
}

.code-description {
  font-size: 0.157rem; /* 9px */
  color: #cccccc;
  margin: 0.087rem 0 0 0; /* 5px 0 0 0 */
  line-height: 1.4;
  text-align: center;
}

.share-methods {
  padding: 0.244rem;
}

.methods-title {
  font-size: 0.244rem; /* 14px */
  color: #ffffff;
  margin: 0 0 0.139rem 0;
  font-weight: 500;
}

.method-list {
  display: flex;
  flex-direction: column;
  gap: 0.139rem; /* 8px */
}

.method-item {
  display: flex;
  align-items: center;
  gap: 0.139rem; /* 8px */
  padding: 0.174rem; /* 10px */
  background-color: #2a2a2a;
  border-radius: 0.087rem; /* 5px */
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.method-item:hover {
  background-color: #333333;
}

.method-icon {
  width: 0.349rem; /* 20px */
  height: 0.349rem; /* 20px */
  display: flex;
  align-items: center;
  justify-content: center;
}

.method-text {
  font-size: 0.192rem; /* 11px */
  color: #ffffff;
}
</style>
