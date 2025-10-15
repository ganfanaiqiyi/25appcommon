import adsConfig from '../config/ads.json'

// 运行时加载广告配置，失败则回退到内置配置
export async function loadAdsConfig() {
  try {
    const response = await fetch('/ads.json', { cache: 'no-cache' })
    if (!response.ok) {
      return adsConfig
    }
    const data = await response.json()
    // 简单校验结构
    if (data && data.ads && (Array.isArray(data.ads.icon) || Array.isArray(data.ads.carousel))) {
      return data
    }
    return adsConfig
  } catch (e) {
    return adsConfig
  }
}


