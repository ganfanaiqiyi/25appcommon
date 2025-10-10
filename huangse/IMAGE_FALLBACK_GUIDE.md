# 图片加载失败处理方案

## 问题描述
当封面图片加载不出来时，会显示alt文字，影响用户体验。

## 解决方案
创建了一个 `ImageWithFallback` 组件，当图片加载失败时显示灰色背景和黄色仓库logo。

## 实现内容

### 1. 图片工具函数 (`src/utils/imageUtils.js`)
- `createDefaultCover()`: 创建默认封面图片
- `handleImageError()`: 处理图片加载错误
- `preloadImage()`: 预加载图片
- `safeLoadImage()`: 安全加载图片

### 2. 图片组件 (`src/components/ImageWithFallback.vue`)
- 自动处理图片加载失败
- 显示加载状态
- 提供默认封面
- 支持自定义样式

### 3. 更新的组件
- `HomePage.vue`: 首页图标和列表广告
- `VideoPage.vue`: 视频缩略图和广告图标
- `AcgPage.vue`: ACG内容缩略图和广告图标
- `PlayerPage.vue`: 评论头像、广告图片、相关视频缩略图
- `ProfilePage.vue`: 用户头像

## 功能特性

### 默认封面设计
- 灰色背景 (#f5f5f5)
- 浅灰色边框 (#e0e0e0)
- 中间显示"黄色仓库"文字
- 可选的logo图标

### 加载状态
- 显示加载动画
- 平滑的过渡效果
- 错误状态标识

### 响应式设计
- 支持自定义尺寸
- 保持宽高比
- 适配不同屏幕

## 使用方法

### 基本用法
```vue
<template>
  <ImageWithFallback 
    :src="imageUrl" 
    :alt="imageAlt" 
    class="custom-image" 
  />
</template>

<script setup>
import ImageWithFallback from './ImageWithFallback.vue'
</script>
```

### 自定义尺寸
```vue
<ImageWithFallback 
  :src="imageUrl" 
  :alt="imageAlt"
  width="200px"
  height="150px"
/>
```

## 样式定制

### CSS类名
- `.image-container`: 图片容器
- `.image-with-fallback`: 图片元素
- `.image-error`: 错误状态
- `.image-loading`: 加载状态
- `.loading-spinner`: 加载动画

### 自定义样式
```css
.image-with-fallback {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.image-error {
  opacity: 0.8;
  filter: grayscale(50%);
}
```

## 技术实现

### Canvas生成默认图片
```javascript
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 300
canvas.height = 200

// 绘制灰色背景
ctx.fillStyle = '#f5f5f5'
ctx.fillRect(0, 0, canvas.width, canvas.height)

// 绘制文字
ctx.fillStyle = '#666666'
ctx.font = '16px Arial, sans-serif'
ctx.textAlign = 'center'
ctx.textBaseline = 'middle'
ctx.fillText('黄色仓库', canvas.width / 2, canvas.height / 2)

return canvas.toDataURL()
```

### 错误处理流程
1. 图片加载失败触发 `@error` 事件
2. 调用 `handleImageError()` 函数
3. 生成默认封面图片
4. 替换原图片src
5. 添加错误状态类名

## 性能优化

### 图片预加载
- 组件挂载时预加载图片
- 避免重复加载
- 缓存默认封面

### 懒加载支持
- 可配合Intersection Observer
- 减少初始加载时间
- 提升页面性能

## 浏览器兼容性

### 支持的浏览器
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### 降级方案
- 不支持Canvas的浏览器显示alt文字
- 保持基本功能可用
- 优雅降级处理

## 测试验证

### 功能测试
1. 正常图片加载
2. 图片加载失败
3. 网络慢的情况
4. 无效URL处理

### 视觉测试
1. 默认封面显示
2. 加载动画效果
3. 错误状态样式
4. 响应式布局

## 部署说明

### 构建项目
```bash
npm run build
```

### 上传文件
将 `dist` 目录上传到服务器

### 验证功能
1. 访问网站
2. 检查图片显示
3. 测试加载失败情况
4. 确认默认封面显示

## 维护建议

### 定期检查
- 监控图片加载成功率
- 分析用户反馈
- 优化默认封面设计

### 性能监控
- 图片加载时间
- 错误率统计
- 用户体验指标

### 功能扩展
- 支持更多图片格式
- 添加图片压缩
- 实现图片缓存
