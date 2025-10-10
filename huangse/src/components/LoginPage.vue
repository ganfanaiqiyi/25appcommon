<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <div class="logo-section">
          <img src="/src/assets/hs_logo.png" alt="黄色仓库" class="logo" />
          <h1 class="app-name">黄色仓库</h1>
        </div>
        <p class="welcome-text">欢迎回来</p>
      </div>
      
      <div class="login-form">
        <div class="input-group">
          <div class="input-wrapper">
            <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z" stroke="#f6bf00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M22 7L13.03 12.7C12.7213 12.8934 12.3643 12.996 12 12.996C11.6357 12.996 11.2787 12.8934 10.97 12.7L2 7" stroke="#f6bf00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <input 
              type="text" 
              placeholder="请输入手机号" 
              class="login-input"
              v-model="phoneNumber"
            />
          </div>
        </div>
        
        <div class="input-group">
          <div class="input-wrapper">
            <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="#f6bf00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="16" r="1" fill="#f6bf00"/>
              <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="#f6bf00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <input 
              type="password" 
              placeholder="请输入密码" 
              class="login-input"
              v-model="password"
            />
          </div>
        </div>
        
        <div class="login-options">
          <label class="remember-me">
            <input type="checkbox" v-model="rememberMe" />
            <span class="checkmark"></span>
            记住我
          </label>
          <a href="#" class="forgot-password">忘记密码？</a>
        </div>
        
        <button class="login-btn" @click="handleLogin">
          登录
        </button>
        
        <div class="register-section">
          <span class="register-text">还没有账号？</span>
          <a href="#" class="register-link" @click="goToRegister">立即注册</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const phoneNumber = ref('')
const password = ref('')
const rememberMe = ref(false)

const handleLogin = () => {
  console.log('登录信息:', {
    phone: phoneNumber.value,
    password: password.value,
    remember: rememberMe.value
  })
}

const goToRegister = () => {
  console.log('跳转到注册页面')
}
</script>

<style scoped>
.login-page {
  height: 100vh;
  background: linear-gradient(135deg, #0e0e0e 0%, #1a1a1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.244rem;
}

.login-container {
  background-color: #1a1a1a;
  border-radius: 0.139rem; /* 8px */
  padding: 0.349rem; /* 20px */
  width: 100%;
  max-width: 6.98rem; /* 400px */
  box-shadow: 0 0.139rem 0.349rem rgba(0, 0, 0, 0.3); /* 8px 20px */
}

.login-header {
  text-align: center;
  margin-bottom: 0.349rem; /* 20px */
}

.logo-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.139rem; /* 8px */
  margin-bottom: 0.139rem; /* 8px */
}

.logo {
  width: 0.418rem; /* 24px */
  height: 0.418rem; /* 24px */
  object-fit: contain;
}

.app-name {
  font-size: 0.244rem; /* 14px */
  color: #f6bf00;
  margin: 0;
  font-weight: 600;
}

.welcome-text {
  font-size: 0.192rem; /* 11px */
  color: #cccccc;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 0.244rem; /* 14px */
}

.input-group {
  margin-bottom: 0.139rem; /* 8px */
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 0.139rem; /* 8px */
  z-index: 1;
}

.login-input {
  width: 100%;
  padding: 0.139rem 0.139rem 0.139rem 0.349rem; /* 8px 8px 8px 20px */
  background-color: #2a2a2a;
  border: 0.017rem solid #333333; /* 1px */
  border-radius: 0.087rem; /* 5px */
  color: white;
  font-size: 0.157rem; /* 9px */
  outline: none;
  transition: border-color 0.2s ease;
}

.login-input:focus {
  border-color: #f6bf00;
}

.login-input::placeholder {
  color: #666666;
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.139rem; /* 8px */
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.052rem; /* 3px */
  font-size: 0.122rem; /* 7px */
  color: #cccccc;
  cursor: pointer;
}

.remember-me input {
  display: none;
}

.checkmark {
  width: 0.122rem; /* 7px */
  height: 0.122rem; /* 7px */
  background-color: #2a2a2a;
  border: 0.017rem solid #666666; /* 1px */
  border-radius: 0.017rem; /* 1px */
  position: relative;
}

.remember-me input:checked + .checkmark {
  background-color: #f6bf00;
  border-color: #f6bf00;
}

.remember-me input:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #000000;
  font-size: 0.087rem; /* 5px */
  font-weight: bold;
}

.forgot-password {
  font-size: 0.122rem; /* 7px */
  color: #f6bf00;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-btn {
  background: linear-gradient(135deg, #f6bf00, #ff9500);
  color: #000000;
  border: none;
  padding: 0.139rem; /* 8px */
  border-radius: 0.087rem; /* 5px */
  font-size: 0.157rem; /* 9px */
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 0.139rem; /* 8px */
}

.login-btn:hover {
  transform: translateY(-0.017rem); /* -1px */
  box-shadow: 0 0.052rem 0.174rem rgba(246, 191, 0, 0.3); /* 3px 10px */
}

.register-section {
  text-align: center;
  font-size: 0.122rem; /* 7px */
}

.register-text {
  color: #cccccc;
}

.register-link {
  color: #f6bf00;
  text-decoration: none;
  margin-left: 0.052rem; /* 3px */
}

.register-link:hover {
  text-decoration: underline;
}
</style>
