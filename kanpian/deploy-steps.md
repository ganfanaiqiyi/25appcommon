# 部署步骤 - 只需配置你的Nginx

## 1. 构建项目
```bash
npm run build
```

## 2. 上传文件
将 `dist` 目录中的所有文件上传到你的服务器，比如：
```
/var/www/html/huangse/
```

## 3. 配置Nginx

### 方法A：修改现有配置
找到你的Nginx配置文件（通常在 `/etc/nginx/sites-available/` 或 `/etc/nginx/conf.d/`），添加以下内容：

```nginx
server {
    listen 80;
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
        proxy_pass https://xzybb1.com/api.php/provide/vod/at/json/;
        proxy_set_header Host hsckzy888.com;
        
        # 添加CORS头
        add_header Access-Control-Allow-Origin "*" always;
        add_header Access-Control-Allow-Methods "GET, POST, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Content-Type" always;
    }
}
```

### 方法B：创建新配置文件
```bash
sudo nano /etc/nginx/sites-available/huangse
```

将 `nginx-simple-proxy.conf` 的内容复制进去，修改路径：
- `/path/to/your/website/dist` → `/var/www/html/huangse`

启用配置：
```bash
sudo ln -s /etc/nginx/sites-available/huangse /etc/nginx/sites-enabled/
```

## 4. 测试配置
```bash
sudo nginx -t
```

## 5. 重启Nginx
```bash
sudo systemctl reload nginx
```

## 6. 测试功能
访问 `http://p1k3.7x8j0flw.top` 或 `https://p1k3.7x8j0flw.top`

测试API：
```bash
curl http://p1k3.7x8j0flw.top/api/?ac=videolist&pg=1&t=0&wd=
```

## 工作原理

1. **前端请求**：`/api/?ac=videolist&pg=1&t=0&wd=`
2. **Nginx代理**：转发到 `https://xzybb1.com/api.php/provide/vod/at/json/?ac=videolist&pg=1&t=0&wd=`
3. **添加CORS头**：Nginx在响应中添加CORS头，解决跨域问题
4. **返回数据**：浏览器收到带有CORS头的响应，不再报错

## 常见问题

### 问题1：API返回404
检查代理配置是否正确：
```nginx
proxy_pass https://xzybb1.com/api.php/provide/vod/at/json/;
```

### 问题2：CORS错误仍然存在
确保CORS头配置正确：
```nginx
add_header Access-Control-Allow-Origin "*" always;
```

### 问题3：静态文件404
检查网站根目录路径：
```nginx
root /var/www/html/huangse;  # 确保路径正确
```

## 验证成功
- 浏览器控制台没有CORS错误
- API请求返回正常数据
- 页面功能正常工作
