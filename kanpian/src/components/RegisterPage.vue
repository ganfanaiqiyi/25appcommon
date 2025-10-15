<template>
  <div class="register-page">
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

    <!-- 注册表单 -->
    <div class="register-form">
      <div class="form-content">
        <div class="input-group">
          <div class="input-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="请输入8-16位数字与字母组合的账号"
            v-model="registerForm.username"
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
            v-model="registerForm.password"
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
            placeholder="请再次输入登录密码"
            v-model="registerForm.confirmPassword"
            class="form-input"
          />
        </div>

        <div class="input-group">
          <div class="input-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <polyline points="22,6 12,13 2,6" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <input 
            type="email" 
            placeholder="请输邮箱地址"
            v-model="registerForm.email"
            class="form-input"
          />
        </div>

        <div class="input-group">
          <div class="input-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="8.5" cy="7" r="4" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20 8V14" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M23 11H17" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="请输入邀请码,(选填)"
            v-model="registerForm.inviteCode"
            class="form-input"
          />
        </div>

        <button class="register-btn" @click="handleRegister">注册</button>

        <div class="login-prompt">
          <span>已有账号?</span>
          <a href="#" @click="goToLogin" class="login-link">立即登录</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import hs_logo from '../assets/hs_logo.png'

// 注册表单数据
const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  inviteCode: ''
})

// 处理注册
const handleRegister = () => {
  console.log('注册信息:', registerForm.value)
  
  // 简单的表单验证
  if (!registerForm.value.username) {
    alert('请输入账号')
    return
  }
  if (!registerForm.value.password) {
    alert('请输入密码')
    return
  }
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    alert('两次输入的密码不一致')
    return
  }
  if (!registerForm.value.email) {
    alert('请输入邮箱地址')
    return
  }
  
  // 这里可以添加注册逻辑
  alert('注册功能开发中...')
}

// 跳转到登录页面
const goToLogin = () => {
  console.log('跳转到登录页面')
  window.location.href = '#login'
}

// 返回上一页
const goBack = () => {
  console.log('返回上一页')
  window.history.back()
}
</script>

<style scoped>
.register-page {
  height: 100vh;
  width: 500px;
  margin: 0 auto;
  background: linear-gradient(135deg, #ffb3ba 0%, #ffdfba 100%);
  position: relative;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.register-page::-webkit-scrollbar {
  display: none;
}

/* 背景模糊效果 */
.register-page::before {
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
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Logo和品牌信息 */
.brand-section {
  text-align: center;
  padding: 0.3rem; /* 20px = 0.3rem (20/66.67) */
  position: relative;
  z-index: 1;
}

.logo {
  width: 80px;
  height: 80px;
  background-color: #eb9eb6;
  border-radius: 12px;
  margin: 0 auto 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(235, 158, 182, 0.3);
  overflow: hidden;
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.brand-name {
  font-size: 18px;
  font-weight: bold;
  color: white;
  margin: 0;
}

/* 注册表单 */
.register-form {
  padding: 0 20px 20px;
  position: relative;
  z-index: 1;
}

.form-content {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 30px 20px;
  backdrop-filter: blur(10px);
}

.input-group {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 15px;
  padding: 0 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.input-icon {
  margin-right: 10px;
  display: flex;
  align-items: center;
}

.form-input {
  flex: 1;
  padding: 15px 0;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
}

.form-input::placeholder {
  color: #999;
}

.register-btn {
  width: 100%;
  padding: 15px;
  background-color: #eb9eb6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.24rem; /* 16px = 0.24rem (16/66.67) */
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: 20px;
}

.register-btn:hover {
  background-color: #d48ba3;
}

.login-prompt {
  text-align: center;
  font-size: 14px;
  color: #333;
}

.login-link {
  color: rgba(188, 107, 128, 0.7);
  text-decoration: none;
  margin-left: 5px;
}

.login-link:hover {
  color: #eb9eb6;
}
</style>
