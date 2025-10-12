// 图片工具函数
import logo from '../assets/hs_logo.png'

// 创建默认封面图片
export function createDefaultCover() {
  // 创建一个canvas来生成默认封面
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  // 设置画布尺寸
  canvas.width = 300
  canvas.height = 200
  
  // 绘制深灰色背景
  ctx.fillStyle = '#333333'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  // 绘制边框
  ctx.strokeStyle = '#555555'
  ctx.lineWidth = 1
  ctx.strokeRect(0, 0, canvas.width, canvas.height)
  
  // 绘制"黄色仓库"文字
  ctx.fillStyle = '#FFD700'
  ctx.font = '16px Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('黄色仓库', canvas.width / 2, canvas.height / 2)
  
  // 绘制logo（如果有的话）
  const logoImg = new Image()
  logoImg.onload = () => {
    const logoSize = 40
    const logoX = (canvas.width - logoSize) / 2
    const logoY = (canvas.height - logoSize) / 2 - 20
    
    ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize)
  }
  logoImg.src = logo
  
  return canvas.toDataURL()
}

// 图片加载失败处理
export function handleImageError(event) {
  const img = event.target
  const defaultCover = createDefaultCover()
  
  // 设置默认封面
  img.src = defaultCover
  img.alt = '黄色仓库'
  
  // 添加错误处理类
  img.classList.add('image-error')
}

// 预加载图片
export function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    img.src = src
  })
}

// 安全的图片加载
export async function safeLoadImage(src, fallbackSrc = null) {
  try {
    await preloadImage(src)
    return src
  } catch (error) {
    console.warn('Image load failed:', src, error)
    return fallbackSrc || createDefaultCover()
  }
}
