# 生产环境部署指南

## 部署步骤

### 1. 构建项目
```bash
npm run build
```

### 2. 上传文件
将 `dist` 目录中的所有文件上传到服务器网站根目录。

### 3. 配置反向代理

#### 方案A：Nginx配置（推荐）
1. 将 `nginx-proxy.conf` 内容添加到Nginx配置
2. 修改以下路径：
   - `/path/to/your/website/dist` → 实际网站路径
   - SSL证书路径（如果使用HTTPS）
3. 重启Nginx：
   ```bash
   sudo nginx -t  # 测试配置
   sudo systemctl reload nginx  # 重载配置
   ```

#### 方案B：Apache配置
1. 将 `apache-proxy.conf` 内容添加到Apache虚拟主机配置
2. 修改以下路径：
   - `/path/to/your/website/dist` → 实际网站路径
   - SSL证书路径（如果使用HTTPS）
3. 启用必要模块：
   ```bash
   sudo a2enmod proxy
   sudo a2enmod proxy_http
   sudo a2enmod rewrite
   sudo a2enmod headers
   ```
4. 重启Apache：
   ```bash
   sudo systemctl restart apache2
   ```

#### 方案C：.htaccess配置（共享主机）
1. 将 `dist` 目录内容上传到网站根目录
2. 将 `.htaccess-proxy` 内容复制到 `.htaccess` 文件
3. 确保服务器支持 `mod_rewrite` 和 `mod_proxy`

### 4. 测试配置

#### 测试API代理
```bash
# 测试API是否正常工作
curl https://p1k3.7x8j0flw.top/api/?ac=videolist&pg=1&t=0&wd=

# 应该返回JSON数据而不是CORS错误
```

#### 测试网站功能
1. 访问 `https://p1k3.7x8j0flw.top`
2. 检查首页图标是否正常显示
3. 测试视频页面API请求
4. 检查浏览器控制台是否有CORS错误

### 5. 常见问题解决

#### 问题1：API返回404
- 检查代理规则是否正确
- 确认目标API URL是否正确
- 检查服务器是否支持代理功能

#### 问题2：静态文件404
- 检查文件路径是否正确
- 确认Vue Router历史模式配置
- 检查.htaccess或Nginx配置

#### 问题3：CORS错误仍然存在
- 检查代理配置是否生效
- 确认CORS头是否正确添加
- 检查浏览器缓存

### 6. 性能优化

#### Nginx优化
```nginx
# 启用gzip压缩
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

# 启用HTTP/2
listen 443 ssl http2;

# 静态文件缓存
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

#### Apache优化
```apache
# 启用压缩
LoadModule deflate_module modules/mod_deflate.so

# 启用缓存
LoadModule expires_module modules/mod_expires.so
```

### 7. 监控和日志

#### 查看Nginx日志
```bash
sudo tail -f /var/log/nginx/p1k3.7x8j0flw.top.access.log
sudo tail -f /var/log/nginx/p1k3.7x8j0flw.top.error.log
```

#### 查看Apache日志
```bash
sudo tail -f /var/log/apache2/p1k3.7x8j0flw.top.access.log
sudo tail -f /var/log/apache2/p1k3.7x8j0flw.top.error.log
```

## 注意事项

1. **SSL证书**：确保HTTPS配置正确
2. **防火墙**：开放80和443端口
3. **权限**：确保Web服务器有读取文件权限
4. **备份**：部署前备份现有配置
5. **测试**：在生产环境部署前先在测试环境验证
