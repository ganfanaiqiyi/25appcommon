// WebView环境检测和URL打开工具函数

/**
 * 检测是否在WebView环境中
 * @returns {boolean} 是否在WebView中
 */
export function isInWebView() {
  // 检测UniApp 5+ APP环境
  if (plus) {
    return true
  }
  
  // 检测其他WebView环境
  const userAgent = navigator.userAgent.toLowerCase()
  
  // 检测Android WebView
  if (userAgent.includes('android') && userAgent.includes('wv')) {
    return true
  }
  
  // 检测iOS WebView
  if (userAgent.includes('iphone') && userAgent.includes('safari') && !userAgent.includes('crios') && !userAgent.includes('fxios')) {
    return true
  }
  
  // 检测微信内置浏览器
  if (userAgent.includes('micromessenger')) {
    return true
  }
  
  // 检测QQ内置浏览器
  if (userAgent.includes('qq/')) {
    return true
  }
  
  // 检测支付宝内置浏览器
  if (userAgent.includes('alipay')) {
    return true
  }
  
  return false
}

/**
 * 智能打开URL - 在WebView中使用plus.runtime.openURL，否则使用window.open
 * @param {string} url - 要打开的URL
 * @param {string} target - 打开目标（默认为'_blank'）
 */
export function openUrl(url, target = '_blank') {
  if (!url) {
    console.warn('openUrl: URL为空')
    return
  }
  
  try {
    if (isInWebView()) {
      // 在WebView环境中使用plus.runtime.openURL
      if (plus && plus.runtime) {
        console.log('WebView环境：使用plus.runtime.openURL打开URL:', url)
        plus.runtime.openURL(url)
      } else {
        // 备用方案：使用window.open
        console.log('WebView环境但plus不可用：使用window.open打开URL:', url)
        window.open(url, target)
      }
    } else {
      // 在普通浏览器环境中使用window.open
      console.log('普通浏览器环境：使用window.open打开URL:', url)
      window.open(url, target)
    }
  } catch (error) {
    console.error('打开URL失败:', error)
    // 错误处理：尝试使用window.open作为备用方案
    try {
      window.open(url, target)
    } catch (fallbackError) {
      console.error('备用方案也失败:', fallbackError)
    }
  }
}

/**
 * 检测WebView类型
 * @returns {string} WebView类型
 */
export function getWebViewType() {
  if (!isInWebView()) {
    return 'browser'
  }
  
  if (plus) {
    return 'uniapp'
  }
  
  const userAgent = navigator.userAgent.toLowerCase()
  
  if (userAgent.includes('micromessenger')) {
    return 'wechat'
  }
  
  if (userAgent.includes('qq/')) {
    return 'qq'
  }
  
  if (userAgent.includes('alipay')) {
    return 'alipay'
  }
  
  if (userAgent.includes('android') && userAgent.includes('wv')) {
    return 'android_webview'
  }
  
  if (userAgent.includes('iphone') && userAgent.includes('safari')) {
    return 'ios_webview'
  }
  
  return 'unknown_webview'
}

/**
 * 获取WebView环境信息
 * @returns {object} WebView环境信息
 */
export function getWebViewInfo() {
  return {
    isWebView: isInWebView(),
    type: getWebViewType(),
    userAgent: navigator.userAgent,
    hasPlus: !!(plus),
    hasPlusRuntime: !!(plus && plus.runtime)
  }
}
