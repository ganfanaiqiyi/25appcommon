# UniApp 5+ APP 配置说明

## 修改内容

### 1. HTML 结构优化
- 语言设置为 `zh-CN`
- 添加移动端适配 meta 标签
- 添加 Apple 设备支持
- 添加 UniApp 5+ APP 相关配置

### 2. Meta 标签配置
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<meta name="format-detection" content="telephone=no" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="apple-touch-fullscreen" content="yes" />
```

### 3. UniApp 5+ APP 功能
- 检测 APP 环境
- 设置状态栏样式
- 设置全屏模式
- 监听应用状态
- 监听网络状态
- 处理 APP 参数

## 功能特性

### APP 环境检测
```javascript
if (plus) {
  // 运行在 UniApp 5+ APP 环境中
  plus.navigator.setStatusBarStyle('dark');
  plus.navigator.setFullscreen(true);
}
```

### URL 参数处理
```javascript
const urlParams = new URLSearchParams(window.location.search);
const isApp = urlParams.get('app') === 'true';

if (isApp) {
  // APP 模式下的特殊处理
  document.body.classList.add('app-mode');
}
```

### 应用状态监听
```javascript
plus.runtime.addEventListener('pause', function() {
  console.log('应用暂停');
});

plus.runtime.addEventListener('resume', function() {
  console.log('应用恢复');
});
```

## 样式适配

### APP 模式样式
```css
.app-mode {
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: none;
}

.standalone-mode {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}
```

### 安全区域适配
```css
@supports (padding: max(0px)) {
  body {
    padding-left: max(12px, env(safe-area-inset-left));
    padding-right: max(12px, env(safe-area-inset-right));
  }
}
```

### 防止页面缩放
```css
body {
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}
```

## 使用方法

### 1. 在 UniApp 中配置
```javascript
// manifest.json
{
  "5+App": {
    "launchwebview": {
      "id": "1",
      "url": "https://p1k3.7x8j0flw.top/?app=true"
    }
  }
}
```

### 2. 检测 APP 环境
```javascript
// 在 Vue 组件中
export default {
  mounted() {
    if (plus) {
      console.log('运行在 APP 环境中');
    } else {
      console.log('运行在浏览器环境中');
    }
  }
}
```

### 3. 处理 APP 参数
```javascript
// 检测 URL 参数
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('app') === 'true') {
  // APP 模式逻辑
}
```

## 配置选项

### 状态栏样式
- `dark`: 深色状态栏
- `light`: 浅色状态栏
- `auto`: 自动适配

### 全屏模式
- `true`: 启用全屏
- `false`: 禁用全屏

### 返回键处理
```javascript
plus.key.addEventListener('backbutton', function() {
  // 自定义返回逻辑
  // 返回 true 表示已处理，false 表示使用默认行为
}, false);
```

## 注意事项

### 1. 权限配置
确保在 UniApp 中配置了必要的权限：
- 网络访问权限
- 存储权限
- 相机权限（如果需要）

### 2. 性能优化
- 使用 `-webkit-overflow-scrolling: touch` 提升滚动性能
- 使用 `overscroll-behavior: none` 防止过度滚动
- 禁用不必要的用户交互

### 3. 兼容性
- 支持 iOS 9.0+
- 支持 Android 4.4+
- 支持 UniApp 5+ 引擎

## 调试方法

### 1. 控制台日志
```javascript
console.log('运行环境:', plus ? 'APP' : '浏览器');
console.log('URL参数:', window.location.search);
```

### 2. 设备信息
```javascript
if (plus) {
  console.log('设备信息:', plus.device);
  console.log('屏幕信息:', plus.screen);
  console.log('网络信息:', plus.network);
}
```

### 3. 应用信息
```javascript
if (plus) {
  console.log('应用信息:', plus.runtime);
  console.log('版本信息:', plus.runtime.version);
}
```

## 部署说明

### 1. 构建项目
```bash
npm run build
```

### 2. 上传文件
将 `dist` 目录上传到服务器

### 3. 配置 UniApp
在 UniApp 项目中设置启动页面为：
```
https://p1k3.7x8j0flw.top/?app=true
```

### 4. 测试功能
- 在浏览器中测试：`https://p1k3.7x8j0flw.top/?app=true`
- 在 UniApp 中测试 APP 功能
- 检查控制台日志输出

## 常见问题

### 1. 状态栏不显示
检查 `plus.navigator.setStatusBarStyle()` 调用时机

### 2. 全屏模式无效
确保在 `plusready` 事件后调用

### 3. 安全区域适配问题
检查 CSS 中的 `env()` 函数支持

### 4. 返回键无响应
检查事件监听器是否正确注册

