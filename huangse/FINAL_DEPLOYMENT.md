# 最终部署指南 - 解决CORS问题

## 问题分析
你遇到的CORS错误是因为前端直接请求 `https://hsckzy888.com`，但该服务器没有设置CORS头。

## 解决方案
通过Nginx反向代理，将 `/api/` 请求代理到后端，并添加CORS头。

## 部署步骤

### 1. 构建项目（已完成）
```bash
npm run build
```

### 2. 上传文件
将 `dist` 目录中的所有文件上传到你的服务器：
```
/var/www/html/huangse/
```

### 3. 配置Nginx
创建或修改Nginx配置文件：

```bash
sudo nano /etc/nginx/sites-available/huangse
```

添加以下配置：
```nginx
server {
    listen 80;
    listen 443 ssl http2;
    server_name p1k3.7x8j0flw.top;
    
    # 网站根目录
    root /var/www/html/huangse;  # 修改为你的实际路径
    index index.html;
    
    # Vue Router支持
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API代理 - 解决CORS问题
    location /api/ {
        proxy_pass https://hsckzy888.com/api.php/provide/vod/at/json/;
        proxy_set_header Host hsckzy888.com;
        
        # 添加CORS头
        add_header Access-Control-Allow-Origin "*" always;
        add_header Access-Control-Allow-Methods "GET, POST, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Content-Type" always;
    }
}
```

### 4. 启用配置
```bash
sudo ln -s /etc/nginx/sites-available/huangse /etc/nginx/sites-enabled/
```

### 5. 测试配置
```bash
sudo nginx -t
```

### 6. 重启Nginx
```bash
sudo systemctl reload nginx
```

### 7. 测试功能
访问 `https://p1k3.7x8j0flw.top` 测试：
- 首页图标是否正常显示
- 视频页面API请求是否正常
- 浏览器控制台是否还有CORS错误

## 工作原理

1. **前端请求**：`/api/?ac=videolist&pg=1&t=0&wd=`
2. **Nginx代理**：转发到 `https://hsckzy888.com/api.php/provide/vod/at/json/?ac=videolist&pg=1&t=0&wd=`
3. **添加CORS头**：Nginx在响应中添加CORS头
4. **返回数据**：浏览器收到带有CORS头的响应，不再报错

## 验证成功
- ✅ 浏览器控制台没有CORS错误
- ✅ API请求返回正常数据
- ✅ 页面功能正常工作
- ✅ 图标和资源正常加载

## 故障排除

### 如果仍有CORS错误
1. 检查Nginx配置是否正确
2. 确认代理规则是否生效
3. 检查CORS头是否正确添加
4. 清除浏览器缓存

### 如果API返回404
1. 检查 `proxy_pass` 配置
2. 确认后端API地址是否正确
3. 检查网络连接

### 如果静态文件404
1. 检查 `root` 路径是否正确
2. 确认文件权限
3. 检查Vue Router配置

## 重要提醒
- 确保修改配置中的路径为实际路径
- 部署前先在测试环境验证
- 备份现有配置
- 监控日志文件
