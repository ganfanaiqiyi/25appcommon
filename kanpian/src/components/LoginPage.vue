<template>
  <div class="login-page">
    <!-- 顶部标题和关闭按钮 -->
    <div class="top-header">
      <h1 class="page-title">黑料吃瓜 猎奇猎艳</h1>
      <button class="close-btn" @click="goBack">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <!-- Logo和品牌信息 -->
    <div class="brand-section">
      <div class="logo">
        <img :src="hs_logo" alt="看片视频" class="logo-image" />
      </div>
      <h2 class="brand-name">看片视频</h2>
    </div>

    <!-- 登录标签页 -->
    <div class="login-tabs">
      <button 
        class="tab-btn active" 
        :class="{ active: activeTab === 'account' }"
        @click="activeTab = 'account'"
      >
        账号登录
      </button>
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'quick' }"
        @click="activeTab = 'quick'"
      >
        快捷登录
      </button>
    </div>

    <!-- 登录表单 -->
    <div class="login-form">
      <!-- 账号登录 -->
      <div v-if="activeTab === 'account'" class="form-content">
        <div class="input-group">
          <div class="input-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="请输入邮箱地址或者账号"
            v-model="loginForm.username"
            class="form-input"
          />
        </div>

        <div class="input-group">
          <div class="input-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#eb9eb6" stroke-width="2"/>
              <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 17H12.01" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <input 
            type="password" 
            placeholder="请输入登录密码"
            v-model="loginForm.password"
            class="form-input"
          />
        </div>

        <div class="form-options">
          <label class="checkbox-label">
            <input type="checkbox" v-model="loginForm.rememberPassword" />
            <span class="checkmark"></span>
            记住密码
          </label>
          <a href="#" class="forgot-link">忘记密码?</a>
        </div>

        <button class="login-btn" @click="handleLogin">登录</button>

        <div class="register-prompt">
          <span>没有账号?</span>
          <a href="#" @click.prevent="goToRegister" class="register-link">立即注册</a>
        </div>
      </div>

      <!-- 快捷登录 -->
      <div v-if="activeTab === 'quick'" class="form-content">
        <div class="quick-login-content">
          <button class="login-btn" @click="handleQuickLogin">快捷登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import hs_logo from '../assets/hs_logo.png'

// 当前激活的标签页
const activeTab = ref('account')

// 登录表单数据
const loginForm = ref({
  username: '',
  password: '',
  rememberPassword: false
})

// 处理登录（禁用提示）
const handleLogin = () => {
  console.log('登录信息:', loginForm.value)
  alert('该区域已禁用')
}

// 处理快捷登录
const handleQuickLogin = () => {
  console.log('快捷登录')
  alert('快捷登录功能开发中...')
}

// 跳转到注册页面
const goToRegister = () => {
  console.log('跳转到注册页面')
  // 这里可以添加跳转逻辑
  window.location.href = '#register'
}

// 关闭并跳转到“我的”页面
const goBack = () => {
  console.log('跳转到我的页面')
  window.location.href = '#profile'
}
</script>

<style scoped>
.login-page {
  height: 100vh;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background: linear-gradient(135deg, #ffb3ba 0%, #ffdfba 100%);
  position: relative;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.login-page::-webkit-scrollbar {
  display: none;
}

/* 背景模糊效果 */
.login-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('http://127.0.0.1:8080/girl.jpg');
  background-size: cover;
  background-position: center;
  filter: blur(0.3rem); /* 20px = 0.3rem (20/66.67) */
  opacity: 0.3;
  z-index: -1;
}

/* 顶部标题和关闭按钮 */
.top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem; /* 20px = 0.3rem (20/66.67) */
  position: relative;
  z-index: 1;
}

.page-title {
  font-size: 0.24rem; /* 16px = 0.24rem (16/66.67) */
  font-weight: bold;
  color: #333;
  margin: 0;
}

.close-btn {
  width: 0.45rem; /* 30px */
  height: 0.45rem; /* 30px */
  border-radius: 50%;
  background-color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0.03rem 0.12rem rgba(0, 0, 0, 0.1); /* 0 2px 8px */
}

/* Logo和品牌信息 */
.brand-section {
  text-align: center;
  padding: 0.3rem; /* 20px = 0.3rem (20/66.67) */
  position: relative;
  z-index: 1;
}

.logo {
  width: 1.2rem; /* 80px */
  height: 1.2rem; /* 80px */
  background-color: #eb9eb6;
  border-radius: 0.18rem; /* 12px */
  margin: 0 auto 0.225rem; /* 0 auto 15px */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0.06rem 0.18rem rgba(235, 158, 182, 0.3); /* 0 4px 12px */
  overflow: hidden;
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.brand-name {
  font-size: 0.27rem; /* 18px */
  font-weight: bold;
  color: white;
  margin: 0;
}

/* 登录标签页 */
.login-tabs {
  display: flex;
  margin: 0.3rem; /* 20px */
  position: relative;
  z-index: 1;
}

.tab-btn {
  flex: 1;
  padding: 0.18rem; /* 12px */
  background: none;
  border: none;
  color: rgba(188, 107, 128, 0.7);
  font-size: 0.21rem; /* 14px */
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease;
}

.tab-btn.active {
  color: #eb9eb6;
  font-weight: bold;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0.03rem; /* 2px */
  background-color: #eb9eb6;
}

/* 登录表单 */
.login-form {
  padding: 0 0.3rem 0.3rem; /* 0 20px 20px */
  position: relative;
  z-index: 1;
}

.form-content {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 0.18rem; /* 12px */
  padding: 0.45rem 0.3rem; /* 30px 20px */
  backdrop-filter: blur(0.15rem); /* 10px */
}

.input-group {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 0.12rem; /* 8px */
  margin-bottom: 0.225rem; /* 15px */
  padding: 0 0.225rem; /* 0 15px */
  box-shadow: 0 0.03rem 0.12rem rgba(0, 0, 0, 0.1); /* 0 2px 8px */
}

.input-icon {
  margin-right: 0.15rem; /* 10px */
  display: flex;
  align-items: center;
}

.form-input {
  flex: 1;
  padding: 0.225rem 0; /* 15px 0 */
  border: none;
  outline: none;
  font-size: 0.21rem; /* 14px */
  background: transparent;
}

.form-input::placeholder {
  color: #999;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.375rem; /* 25px */
}

.checkbox-label {
  display: flex;
  align-items: center;
  font-size: 0.18rem; /* 12px */
  color: rgba(188, 107, 128, 0.7);
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  margin-right: 0.12rem; /* 8px */
  width: 0.24rem; /* 16px */
  height: 0.24rem; /* 16px */
  accent-color: #eb9eb6;
}

.forgot-link {
  font-size: 0.18rem; /* 12px */
  color: rgba(188, 107, 128, 0.7);
  text-decoration: none;
}

.forgot-link:hover {
  color: #eb9eb6;
}

.login-btn {
  width: 100%;
  padding: 0.225rem; /* 15px */
  background-color: #eb9eb6;
  color: white;
  border: none;
  border-radius: 0.12rem; /* 8px */
  font-size: 0.24rem; /* 16px = 0.24rem (16/66.67) */
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: 0.3rem; /* 20px */
}

.login-btn:hover {
  background-color: #d48ba3;
}

.register-prompt {
  text-align: center;
  font-size: 0.21rem; /* 14px */
  color: #333;
}

.register-link {
  color: rgba(188, 107, 128, 0.7);
  text-decoration: none;
  margin-left: 0.075rem; /* 5px */
}

.register-link:hover {
  color: #eb9eb6;
}

.quick-login-content {
  text-align: center;
}
</style>