<template>
  <div class="faq-page">
    <div class="page-header">
      <h1 class="page-title">常见问题</h1>
      <p class="page-subtitle">帮助您解决常见疑问</p>
    </div>
    
    <div class="content-section">
      <div class="faq-list">
        <div class="faq-item" v-for="(faq, index) in faqList" :key="index">
          <div class="faq-question" @click="toggleFaq(index)">
            <span class="question-text">{{ faq.question }}</span>
            <svg 
              class="arrow-icon" 
              :class="{ 'rotated': faq.isOpen }"
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 9L12 15L18 9" stroke="#af52de" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="faq-answer" v-if="faq.isOpen">
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const faqList = ref([
  {
    question: '如何注册账号？',
    answer: '点击右上角"立即登录"按钮，选择注册选项，填写手机号码和验证码即可完成注册。',
    isOpen: false
  },
  {
    question: '忘记密码怎么办？',
    answer: '在登录页面点击"忘记密码"，输入手机号码获取验证码，然后设置新密码。',
    isOpen: false
  },
  {
    question: '如何收藏视频？',
    answer: '在视频播放页面点击心形图标即可收藏，收藏的视频会在"我的收藏"中显示。',
    isOpen: false
  },
  {
    question: '如何分享视频？',
    answer: '在视频页面点击分享按钮，可以选择分享到微信、QQ或其他社交平台。',
    isOpen: false
  },
  {
    question: '视频播放卡顿怎么办？',
    answer: '请检查网络连接，或尝试切换视频清晰度，也可以清除缓存后重新加载。',
    isOpen: false
  }
])

const toggleFaq = (index) => {
  faqList.value[index].isOpen = !faqList.value[index].isOpen
}
</script>

<style scoped>
.faq-page {
  height: 100vh;
  background-color: #0e0e0e;
  color: white;
  padding: 0.244rem;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.faq-page::-webkit-scrollbar {
  display: none;
}

.page-header {
  text-align: center;
  margin-bottom: 0.349rem;
}

.page-title {
  font-size: 0.418rem; /* 24px */
  color: #af52de;
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

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.174rem; /* 10px */
}

.faq-item {
  background-color: #2a2a2a;
  border-radius: 0.087rem; /* 5px */
  overflow: hidden;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.174rem 0.244rem; /* 10px 14px */
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.faq-question:hover {
  background-color: #333333;
}

.question-text {
  font-size: 0.192rem; /* 11px */
  color: #ffffff;
  font-weight: 500;
}

.arrow-icon {
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.arrow-icon.rotated {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 0.244rem 0.174rem 0.244rem; /* 0 14px 10px 14px */
  border-top: 0.017rem solid #333333; /* 1px */
}

.faq-answer p {
  font-size: 0.157rem; /* 9px */
  color: #cccccc;
  line-height: 1.4;
  margin: 0.087rem 0 0 0; /* 5px 0 0 0 */
}
</style>
