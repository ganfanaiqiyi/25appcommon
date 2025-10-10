// API工具函数
import appConfig from '../config/appConfig.json'

// 获取API基础URL
export function getApiBaseUrl() {
  // 开发环境使用代理，生产环境使用相对路径
  if (import.meta.env.DEV) {
    return '/api/'
  } else {
    // 生产环境需要配置反向代理或使用支持CORS的API
    return 'https://hsckzy888.com/api.php/provide/vod/at/json/'
  }
}

// 构建API URL
export function buildApiUrl(endpoint, params = {}) {
  const baseUrl = getApiBaseUrl()
  let url = `${baseUrl}${endpoint}`
  
  // 替换参数
  Object.keys(params).forEach(key => {
    url = url.replace(`\${${key}}`, params[key])
  })
  
  return url
}

// 通用API请求函数
export async function apiRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('API请求失败:', error)
    throw error
  }
}

// 视频列表API
export async function fetchVideoList(page = 1, categoryId = 0, keyword = '') {
  const url = buildApiUrl(appConfig.api.cms.endpoints.videoList, {
    page,
    id: categoryId,
    keyword
  })
  
  return await apiRequest(url)
}
