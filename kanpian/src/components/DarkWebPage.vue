<template>
  <div class="dark-web-page">
    <!-- 背景模糊图片 -->
    <div class="background-image"></div>
    
    <!-- 暗色遮罩 -->
    <div class="dark-overlay"></div>
    
    <!-- 内容区域 -->
    <div class="content-container">
      <!-- 标题 -->
      <h1 class="main-title">黑客破解流出,真实稀缺资源!</h1>
      
      <!-- 内容描述 -->
      <p class="content-description">
        内含少女、辅、哟哟,偷窥、泄漏门、SM、人妖、恋物癖、猎奇等需缺经典禁止流出资源
      </p>
      
      <!-- 警告信息 -->
      <div class="warning-text">
        警告:无自控能力者慎入,为避免大面积传播,仅对年费会员开放
      </div>
      
      <!-- 按钮区域 -->
      <div class="button-container">
        <!-- VIP开通按钮 -->
        <button class="vip-button" @click="openVip">
          开通禁区VIP观影
        </button>
        
        <!-- 返回首页按钮 -->
        <button class="back-button" @click="goBack">
          返回首页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// 开通VIP - 跳转到登录页面
const openVip = () => {
  console.log('跳转到登录页面')
  window.location.href = '#login'
}

// 返回首页
const goBack = () => {
  // 使用window.location或者emit事件来返回首页
  window.location.href = '/'
}
</script>

<style scoped>
.dark-web-page {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fef4f8;
  filter: blur(10px);
  transform: scale(1.1);
}

.dark-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
}

.content-container {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  text-align: center;
}

.main-title {
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.content-description {
  color: white;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 30px;
  max-width: 500px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

.warning-text {
  color: #ffd700;
  font-size: 14px;
  margin-bottom: 40px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
}

.vip-button {
  background: linear-gradient(135deg, #eb9eb6, #d88ba0);
  color: white;
  border: 2px solid #c77aa0;
  border-radius: 25px;
  padding: 15px 40px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(235, 158, 182, 0.3);
}

.vip-button:hover {
  background: linear-gradient(135deg, #d88ba0, #c77aa0);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(235, 158, 182, 0.4);
}

.back-button {
  background: rgba(235, 158, 182, 0.3);
  color: white;
  border: 1px solid #eb9eb6;
  border-radius: 25px;
  padding: 12px 35px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.back-button:hover {
  background: rgba(235, 158, 182, 0.5);
  transform: translateY(-1px);
}

/* 响应式设计 */
@media (max-width: 500px) {
  .main-title {
    font-size: 20px;
  }
  
  .content-description {
    font-size: 14px;
  }
  
  .warning-text {
    font-size: 12px;
  }
  
  .vip-button {
    padding: 12px 30px;
    font-size: 14px;
  }
  
  .back-button {
    padding: 10px 25px;
    font-size: 12px;
  }
}
</style>
