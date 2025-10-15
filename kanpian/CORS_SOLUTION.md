# CORS 跨域问题解决方案

## 问题描述
前端域名 `https://p1k3.7x8j0flw.top` 请求 `https://api.xiaojizy.live` 的API时被浏览器CORS策略阻止。

## 解决方案

### 1. 开发环境（已解决）
- 使用Vite代理服务器，将 `/api/*` 请求代理到 `https://api.xiaojizy.live`
- 配置在 `vite.config.js` 中

### 2. 生产环境解决方案

#### 方案A：服务器端配置CORS（推荐）
在 `https://api.xiaojizy.live` 服务器上添加CORS头：
```apache
# Apache .htaccess
Header always set Access-Control-Allow-Origin "*"
Header always set Access-Control-Allow-Methods "GET, POST, OPTIONS"
Header always set Access-Control-Allow-Headers "Content-Type"
```

```nginx
# Nginx配置
add_header Access-Control-Allow-Origin "*";
add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
add_header Access-Control-Allow-Headers "Content-Type";
```

#### 方案B：使用反向代理
在 `https://p1k3.7x8j0flw.top` 服务器上配置反向代理：
```nginx
location /api/ {
    proxy_pass https://api.xiaojizy.live/api.php/provide/vod/at/json/;
    proxy_set_header Host hsckzy888.com;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

#### 方案C：修改API配置
如果无法修改服务器配置，可以：
1. 寻找支持CORS的API镜像
2. 使用JSONP（如果API支持）
3. 使用第三方CORS代理服务

## 当前实现
- 开发环境：使用Vite代理
- 生产环境：需要配置反向代理或CORS头
- API工具：`src/utils/api.js` 统一处理API请求

## 测试方法
1. 开发环境：`npm run dev` - 应该可以正常请求API
2. 生产环境：部署后测试API请求是否正常
