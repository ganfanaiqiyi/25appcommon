# 404错误故障排除指南

## 问题分析
API请求返回404，说明Nginx反向代理配置有问题。

## 诊断步骤

### 1. 检查Nginx配置
```bash
# 测试Nginx配置
sudo nginx -t

# 查看Nginx错误日志
sudo tail -f /var/log/nginx/error.log

# 查看网站访问日志
sudo tail -f /var/log/nginx/huangse.access.log
```

### 2. 检查配置文件位置
```bash
# 查找Nginx配置文件
sudo find /etc/nginx -name "*.conf" | grep -E "(sites|conf.d)"

# 查看当前启用的配置
ls -la /etc/nginx/sites-enabled/
```

### 3. 测试API代理
```bash
# 测试API代理是否工作
curl -v https://p1k3.7x8j0flw.top/api/?ac=videolist&pg=1&t=0&wd=

# 测试简单代理
curl -v https://p1k3.7x8j0flw.top/test-api
```

### 4. 检查后端API
```bash
# 直接测试后端API
curl -v https://hsckzy888.com/api.php/provide/vod/at/json/?ac=videolist&pg=1&t=0&wd=
```

## 常见问题及解决方案

### 问题1：Nginx配置未生效
**原因**：配置文件路径错误或未启用
**解决**：
```bash
# 创建配置文件
sudo nano /etc/nginx/sites-available/huangse

# 启用配置
sudo ln -s /etc/nginx/sites-available/huangse /etc/nginx/sites-enabled/

# 重载配置
sudo systemctl reload nginx
```

### 问题2：代理规则不匹配
**原因**：location规则配置错误
**解决**：确保使用正确的代理配置
```nginx
location /api/ {
    proxy_pass https://hsckzy888.com/api.php/provide/vod/at/json/;
    proxy_set_header Host hsckzy888.com;
}
```

### 问题3：网站根目录错误
**原因**：root路径配置错误
**解决**：修改为正确的路径
```nginx
root /var/www/html/huangse;  # 修改为你的实际路径
```

### 问题4：SSL证书问题
**原因**：HTTPS配置错误
**解决**：检查SSL证书配置或暂时使用HTTP测试

## 完整配置示例

### 1. 创建配置文件
```bash
sudo nano /etc/nginx/sites-available/huangse
```

### 2. 添加配置内容
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
        proxy_pass https://hsckzy888.com/api.php/provide/vod/at/json/;
        proxy_set_header Host hsckzy888.com;
        
        # CORS头
        add_header Access-Control-Allow-Origin "*" always;
        add_header Access-Control-Allow-Methods "GET, POST, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Content-Type" always;
    }
}
```

### 3. 启用配置
```bash
sudo ln -s /etc/nginx/sites-available/huangse /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 测试验证

### 1. 测试网站
访问：`https://p1k3.7x8j0flw.top`

### 2. 测试API
```bash
curl https://p1k3.7x8j0flw.top/api/?ac=videolist&pg=1&t=0&wd=
```

### 3. 检查日志
```bash
sudo tail -f /var/log/nginx/huangse.access.log
sudo tail -f /var/log/nginx/huangse.error.log
```

## 如果仍然404

### 检查1：确认文件路径
```bash
ls -la /var/www/html/huangse/
```

### 检查2：确认Nginx进程
```bash
sudo systemctl status nginx
```

### 检查3：确认端口监听
```bash
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :443
```

### 检查4：确认域名解析
```bash
nslookup p1k3.7x8j0flw.top
```

## 最终解决方案

如果以上都不行，尝试最简单的配置：

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
        proxy_pass https://hsckzy888.com/api.php/provide/vod/at/json/;
    }
}
```

然后重启Nginx：
```bash
sudo systemctl restart nginx
```
