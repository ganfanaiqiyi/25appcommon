<template>
  <div class="image-container">
    <img
      :src="imageSrc"
      :alt="alt"
      :class="['image-with-fallback', { 'image-error': hasError }]"
      @error="handleImageError"
      @load="handleImageLoad"
    />
    <div v-if="isLoading" class="image-loading">
      <div class="loading-spinner"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { createDefaultCover } from '../utils/imageUtils.js'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: '黄色仓库'
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: 'auto'
  }
})

const imageSrc = ref(props.src)
const hasError = ref(false)
const isLoading = ref(true)

// 处理图片加载错误
const handleImageError = () => {
  hasError.value = true
  isLoading.value = false
  imageSrc.value = createDefaultCover()
}

// 处理图片加载成功
const handleImageLoad = () => {
  hasError.value = false
  isLoading.value = false
}

// 监听src变化
watch(() => props.src, (newSrc) => {
  if (newSrc && newSrc !== imageSrc.value) {
    imageSrc.value = newSrc
    hasError.value = false
    isLoading.value = true
  }
})

// 组件挂载时预加载图片
onMounted(() => {
  if (props.src) {
    const img = new Image()
    img.onload = () => {
      isLoading.value = false
    }
    img.onerror = () => {
      handleImageError()
    }
    img.src = props.src
  }
})
</script>

<style scoped>
.image-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.image-with-fallback {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.image-with-fallback.image-error {
  opacity: 0.8;
}

.image-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #e0e0e0;
  border-top: 2px solid #ff8c00;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
