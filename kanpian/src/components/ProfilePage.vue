<template>
  <div class="profile-page">
    <!-- 顶部导航栏 -->
    <div class="top-header">
      <button class="back-btn" @click="goBack">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M12 19L5 12L12 5" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <h1 class="page-title">个人中心</h1>
      <div class="header-spacer"></div>
    </div>

    <!-- 用户信息区域 -->
    <div class="user-info-section">
      <div class="user-avatar">
        <ImageWithFallback :src="avatar" alt="用户头像" />
      </div>
      <div class="user-actions">
        <button class="register-btn" @click="goToPage('register')">注册</button>
        <button class="login-btn" @click="goToPage('login')">登录</button>
      </div>
    </div>

    <!-- VIP开通区域 -->
    <div class="vip-section">
      <div class="vip-content">
        <div class="vip-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="#eb9eb6"/>
          </svg>
        </div>
        <div class="vip-text">
          <h3>开通VIP 解锁全站</h3>
          <p>成为会员,拥有专属VIP权益</p>
        </div>
        <button class="vip-btn" @click="goToPage('vip')">开通VIP</button>
      </div>
    </div>

    <!-- 功能卡片区域 -->
    <div class="function-cards">
      <div class="card-item" @click="goToPage('recharge')">
        <div class="card-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#4A90E2"/>
            <path d="M12 6V12L16 14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="bonus-tag">最高送20%</div>
        </div>
        <div class="card-text">
          <h4>钻石充值</h4>
          <p>最高送20%</p>
        </div>
      </div>

      <div class="card-item" @click="goToPage('checkin')">
        <div class="card-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" fill="#eb9eb6"/>
            <line x1="16" y1="2" x2="16" y2="6" stroke="white" stroke-width="2"/>
            <line x1="8" y1="2" x2="8" y2="6" stroke="white" stroke-width="2"/>
            <line x1="3" y1="10" x2="21" y2="10" stroke="white" stroke-width="2"/>
            <text x="12" y="16" text-anchor="middle" fill="white" font-size="8" font-weight="bold">18</text>
          </svg>
        </div>
        <div class="card-text">
          <h4>每日签到</h4>
          <p>天天领钻石</p>
        </div>
      </div>

      <div class="card-item" @click="goToPage('share')">
        <div class="card-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" fill="#eb9eb6"/>
            <line x1="8" y1="21" x2="16" y2="21" stroke="#eb9eb6" stroke-width="2"/>
            <line x1="12" y1="17" x2="12" y2="21" stroke="#eb9eb6" stroke-width="2"/>
            <circle cx="12" cy="10" r="2" fill="white"/>
          </svg>
        </div>
        <div class="card-text">
          <h4>分享推广</h4>
          <p>邀请好友可领VIP</p>
        </div>
      </div>
    </div>

    <!-- 功能菜单网格 -->
    <div class="menu-grid">
      <div class="menu-item" @click="goToPage('account')">
        <div class="menu-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="7" r="4" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 3L13 6L16 9" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="menu-text">账号绑定</span>
      </div>

      <div class="menu-item" @click="goToPage('identity')">
        <div class="menu-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="#eb9eb6" stroke-width="2"/>
            <line x1="8" y1="21" x2="16" y2="21" stroke="#eb9eb6" stroke-width="2"/>
            <line x1="12" y1="17" x2="12" y2="21" stroke="#eb9eb6" stroke-width="2"/>
          </svg>
        </div>
        <span class="menu-text">身份凭证卡</span>
      </div>

      <div class="menu-item" @click="goToPage('recharge-record')">
        <div class="menu-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 2V8H20" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 18V12" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 15H15" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="menu-text">充值记录</span>
      </div>

      <div class="menu-item" @click="goToPage('purchase-record')">
        <div class="menu-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 2V8H20" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 18H15" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 14H15" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="menu-text">购买记录</span>
      </div>

      <div class="menu-item" @click="goToPage('watch-record')">
        <div class="menu-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 2V8H20" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1 12L5 8L9 12L5 16L1 12Z" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="menu-text">观看记录</span>
      </div>

      <div class="menu-item" @click="goToPage('exchange-record')">
        <div class="menu-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 2V8H20" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 12H16" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 8L16 12L12 16" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="menu-text">兑换记录</span>
      </div>

      <div class="menu-item" @click="goToPage('favorites')">
        <div class="menu-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 2V8H20" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 17L8 13L12 9L16 13L12 17Z" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="menu-text">收藏记录</span>
      </div>

      <div class="menu-item" @click="goToPage('feedback')">
        <div class="menu-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 2V8H20" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="12" r="2" stroke="#eb9eb6" stroke-width="2"/>
            <path d="M12 6V8" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round"/>
            <path d="M12 16V18" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <span class="menu-text">我的反馈</span>
      </div>

      <div class="menu-item" @click="goToPage('change-password')">
        <div class="menu-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="#eb9eb6" stroke-width="2"/>
            <circle cx="12" cy="16" r="1" fill="#eb9eb6"/>
            <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="menu-text">修改密码</span>
      </div>

      <div class="menu-item" @click="goToPage('contact')">
        <div class="menu-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59531 1.99522 8.06679 2.16708 8.43376 2.48353C8.80073 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.89391 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5735C21.8437 15.9438 22.0122 16.4187 22 16.92Z" stroke="#eb9eb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="menu-text">联系客服</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import avatar from '../assets/avatar.png'
import ImageWithFallback from './ImageWithFallback.vue'

// 处理页面跳转 - 所有按钮都跳转到登录页面
const goToPage = (page) => {
  console.log('跳转到登录页面:', page)
  window.location.href = '#login'
}

const goBack = () => {
  console.log('返回上一页')
  window.history.back()
}
</script>

<style scoped>
.profile-page {
  height: 100vh;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background-color: #fff7fa;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.profile-page::-webkit-scrollbar {
  display: none;
}

/* 顶部导航栏 */
.top-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.225rem 0.3rem; /* 15px 20px = 0.225rem 0.3rem */
  background-color: #fff7fa;
  border-bottom: 0.015rem solid rgba(235, 158, 182, 0.1); /* 1px = 0.015rem */
}

.back-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.12rem; /* 8px = 0.12rem (8/66.67) */
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.back-btn:hover {
  background-color: rgba(235, 158, 182, 0.1);
}

.page-title {
  font-size: 0.27rem; /* 18px = 0.27rem (18/66.67) */
  font-weight: bold;
  color: #333;
  margin: 0;
}

.header-spacer {
  width: 0.54rem; /* 36px = 0.54rem (36/66.67) */
}

/* 用户信息区域 */
.user-info-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.3rem; /* 20px = 0.3rem (20/66.67) */
  background-color: #fff7fa;
}

.user-avatar {
  width: 0.9rem; /* 60px = 0.9rem (60/66.67) */
  height: 0.9rem; /* 60px = 0.9rem (60/66.67) */
  border-radius: 50%;
  overflow: hidden;
  border: 0.03rem solid #eb9eb6; /* 2px = 0.03rem (2/66.67) */
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-actions {
  display: flex;
  gap: 0.15rem; /* 10px = 0.15rem (10/66.67) */
}

.register-btn {
  background-color: #eb9eb6;
  color: white;
  border: none;
  padding: 0.12rem 0.24rem; /* 8px 16px */
  border-radius: 0.3rem; /* 20px */
  font-size: 0.21rem; /* 14px */
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.register-btn:hover {
  background-color: #d48ba3;
}

.login-btn {
  background-color: transparent;
  color: #eb9eb6;
  border: 0.015rem solid #eb9eb6; /* 1px */
  padding: 0.12rem 0.24rem; /* 8px 16px */
  border-radius: 0.3rem; /* 20px */
  font-size: 0.21rem; /* 14px */
  cursor: pointer;
  transition: all 0.2s ease;
}

.login-btn:hover {
  background-color: #eb9eb6;
  color: white;
}

/* VIP开通区域 */
.vip-section {
  margin: 0 0.3rem 0.3rem 0.3rem; /* 0 20px 20px 20px */
  background: linear-gradient(135deg, #eb9eb6 0%, #f4c2d1 100%);
  border-radius: 0.18rem; /* 12px */
  padding: 0.3rem; /* 20px */
}

.vip-content {
  display: flex;
  align-items: center;
  gap: 0.225rem; /* 15px */
}

.vip-icon {
  flex-shrink: 0;
}

.vip-text {
  flex: 1;
}

.vip-text h3 {
  color: white;
  font-size: 0.24rem; /* 16px */
  font-weight: bold;
  margin: 0 0 0.075rem 0; /* 0 0 5px 0 */
}

.vip-text p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.18rem; /* 12px */
  margin: 0;
}

.vip-btn {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 0.015rem solid rgba(255, 255, 255, 0.3); /* 1px */
  padding: 0.12rem 0.24rem; /* 8px 16px */
  border-radius: 0.3rem; /* 20px */
  font-size: 0.21rem; /* 14px */
  cursor: pointer;
  transition: all 0.2s ease;
}

.vip-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

/* 功能卡片区域 */
.function-cards {
  display: flex;
  gap: 0.225rem; /* 15px */
  padding: 0 0.3rem 0.3rem 0.3rem; /* 0 20px 20px 20px */
}

.card-item {
  flex: 1;
  background-color: white;
  border-radius: 0.18rem; /* 12px */
  padding: 0.3rem 0.225rem; /* 20px 15px */
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  box-shadow: 0 0.03rem 0.12rem rgba(235, 158, 182, 0.1); /* 0 2px 8px */
}

.card-item:hover {
  transform: translateY(-0.03rem); /* -2px */
}

.card-icon {
  position: relative;
  margin-bottom: 0.15rem; /* 10px */
}

.bonus-tag {
  position: absolute;
  top: -0.12rem; /* -8px */
  right: -0.12rem; /* -8px */
  background-color: #ff4757;
  color: white;
  font-size: 0.15rem; /* 10px */
  padding: 0.03rem 0.09rem; /* 2px 6px */
  border-radius: 0.15rem; /* 10px */
  font-weight: bold;
}

.card-text h4 {
  color: #333;
  font-size: 0.21rem; /* 14px */
  font-weight: bold;
  margin: 0 0 0.075rem 0; /* 0 0 5px 0 */
}

.card-text p {
  color: #666;
  font-size: 0.18rem; /* 12px */
  margin: 0;
}

/* 功能菜单网格 */
.menu-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.3rem; /* 20px */
  padding: 0 0.3rem 0.45rem 0.3rem; /* 0 20px 30px 20px */
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.12rem; /* 8px */
  padding: 0.225rem 0.15rem; /* 15px 10px */
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-radius: 0.12rem; /* 8px */
}

.menu-item:hover {
  background-color: rgba(235, 158, 182, 0.05);
}

.menu-icon {
  width: 0.6rem; /* 40px */
  height: 0.6rem; /* 40px */
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-text {
  font-size: 0.18rem; /* 12px */
  color: #666;
  text-align: center;
  line-height: 1.2;
}

/* 第三行只有两个项目 */
.menu-item:nth-child(9),
.menu-item:nth-child(10) {
  grid-column: span 2;
}
</style>