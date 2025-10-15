# 快速修复404错误

## 问题
API请求 `https://p1k3.7x8j0flw.top/api/?ac=videolist&pg=1&t=0&wd=` 返回404

## 原因
Nginx反向代理配置未生效或配置错误

## 解决步骤

### 1. 检查当前Nginx配置
```bash
# 查看Nginx状态
sudo systemctl status nginx

# 测试配置
sudo nginx -t

# 查看错误日志
sudo tail -f /var/log/nginx/error.log
```

### 2. 创建新的配置文件
```bash
# 创建配置文件
sudo nano /etc/nginx/sites-available/huangse
```

### 3. 添加配置内容
复制以下配置到文件中：
```nginx
server {
    listen 80;
    server_name p1k3.7x8j0flw.top;
    
    # 网站根目录 - 修改为你的实际路径
    root /var/www/html/huangse;
    index index.html;
    
    # Vue Router支持
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API代理
    location /api/ {
        proxy_pass https://api.xiaojizy.live/api.php/provide/vod/at/json/;
        proxy_set_header Host hsckzy888.com;
        
        # CORS头
        add_header Access-Control-Allow-Origin "*" always;
        add_header Access-Control-Allow-Methods "GET, POST, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Content-Type" always;
    }
}
```

### 4. 启用配置
```bash
# 启用配置
sudo ln -s /etc/nginx/sites-available/huangse /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重载配置
sudo systemctl reload nginx
```

### 5. 测试功能
```bash
# 测试网站
curl https://p1k3.7x8j0flw.top

# 测试API
curl https://p1k3.7x8j0flw.top/api/?ac=videolist&pg=1&t=0&wd=
```

## 如果仍然404

### 检查1：确认文件路径
```bash
# 检查网站文件是否存在
ls -la /var/www/html/huangse/
ls -la /var/www/html/huangse/index.html
```

### 检查2：确认Nginx进程
```bash
# 查看Nginx进程
ps aux | grep nginx

# 重启Nginx
sudo systemctl restart nginx
```

### 检查3：确认端口监听
```bash
# 检查80端口
sudo netstat -tlnp | grep :80

# 检查443端口（如果使用HTTPS）
sudo netstat -tlnp | grep :443
```

### 检查4：确认域名解析
```bash
# 检查域名解析
nslookup p1k3.7x8j0flw.top
ping p1k3.7x8j0flw.top
```

## 常见问题

### 问题1：配置文件路径错误
**解决**：确认网站文件在正确路径
```bash
# 查找你的网站文件
find /var/www -name "index.html" -type f
find /home -name "index.html" -type f
```

### 问题2：权限问题
**解决**：设置正确权限
```bash
sudo chown -R www-data:www-data /var/www/html/huangse
sudo chmod -R 755 /var/www/html/huangse
```

### 问题3：防火墙问题
**解决**：开放端口
```bash
sudo ufw allow 80
sudo ufw allow 443
```

## 最终测试

### 1. 访问网站
打开浏览器访问：`https://p1k3.7x8j0flw.top`

### 2. 测试API
在浏览器控制台执行：
```javascript
fetch('/api/?ac=videolist&pg=1&t=0&wd=')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))
```

### 3. 检查日志
```bash
sudo tail -f /var/log/nginx/huangse.access.log
sudo tail -f /var/log/nginx/huangse.error.log
```

## 如果问题仍然存在

### 简化配置测试
```nginx
server {
    listen 80;
    server_name p1k3.7x8j0flw.top;
    root /var/www/html/huangse;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api/ {
        proxy_pass https://api.xiaojizy.live/api.php/provide/vod/at/json/;
    }
}
```

### 重启Nginx
```bash
sudo systemctl restart nginx
```

### 检查系统资源
```bash
# 检查磁盘空间
df -h

# 检查内存使用
free -h

# 检查系统负载
top
```
