# Nginx 404错误修复步骤

## 当前问题
curl测试返回404，说明Nginx反向代理配置有问题。

## 诊断步骤

### 1. 运行诊断脚本
```bash
# 下载并运行诊断脚本
curl -o nginx-diagnosis.sh https://raw.githubusercontent.com/your-repo/nginx-diagnosis.sh
chmod +x nginx-diagnosis.sh
./nginx-diagnosis.sh
```

### 2. 手动检查
```bash
# 检查Nginx状态
systemctl status nginx

# 检查配置
nginx -t

# 检查配置文件
ls -la /etc/nginx/sites-available/
ls -la /etc/nginx/sites-enabled/

# 检查端口
netstat -tlnp | grep nginx
```

## 修复步骤

### 步骤1：创建配置文件
```bash
# 创建配置文件
nano /etc/nginx/sites-available/huangse
```

### 步骤2：添加配置内容
```nginx
server {
    listen 80;
    server_name p1k3.7x8j0flw.top;
    
    # 网站根目录 - 需要修改为实际路径
    root /var/www/html/huangse;
    index index.html;
    
    # Vue Router支持
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API代理
    location /api/ {
        proxy_pass https://xzybb1.com/api.php/provide/vod/at/json/;
        proxy_set_header Host hsckzy888.com;
        
        # CORS头
        add_header Access-Control-Allow-Origin "*" always;
        add_header Access-Control-Allow-Methods "GET, POST, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Content-Type" always;
    }
}
```

### 步骤3：启用配置
```bash
# 启用配置
ln -s /etc/nginx/sites-available/huangse /etc/nginx/sites-enabled/

# 测试配置
nginx -t

# 重载配置
systemctl reload nginx
```

### 步骤4：确认网站文件
```bash
# 查找网站文件
find /var/www -name "index.html" -type f
find /home -name "index.html" -type f

# 如果找到文件，修改配置中的root路径
# 例如：root /home/user/huangse;
```

## 常见问题解决

### 问题1：找不到网站文件
**解决**：找到实际文件路径并修改配置
```bash
# 查找文件
find / -name "index.html" -type f 2>/dev/null

# 修改配置中的root路径
nano /etc/nginx/sites-available/huangse
```

### 问题2：权限问题
**解决**：设置正确权限
```bash
# 设置权限
chown -R nginx:nginx /var/www/html/huangse
chmod -R 755 /var/www/html/huangse
```

### 问题3：端口冲突
**解决**：检查端口使用
```bash
# 检查端口
netstat -tlnp | grep :80
netstat -tlnp | grep :443

# 如果有冲突，修改配置中的端口
```

### 问题4：域名解析问题
**解决**：检查域名解析
```bash
# 检查域名解析
nslookup p1k3.7x8j0flw.top
ping p1k3.7x8j0flw.top
```

## 测试验证

### 1. 测试网站
```bash
curl https://p1k3.7x8j0flw.top
```

### 2. 测试API
```bash
curl "https://p1k3.7x8j0flw.top/api/?ac=videolist&pg=1&t=0&wd="
```

### 3. 检查日志
```bash
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log
```

## 如果仍然404

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
        proxy_pass https://xzybb1.com/api.php/provide/vod/at/json/;
    }
}
```

### 重启Nginx
```bash
systemctl restart nginx
```

### 检查防火墙
```bash
# 检查防火墙状态
systemctl status firewalld
systemctl status iptables

# 开放端口
firewall-cmd --permanent --add-port=80/tcp
firewall-cmd --permanent --add-port=443/tcp
firewall-cmd --reload
```

## 最终检查清单

- [ ] Nginx服务运行正常
- [ ] 配置文件语法正确
- [ ] 网站文件路径正确
- [ ] 文件权限正确
- [ ] 端口80/443开放
- [ ] 域名解析正确
- [ ] 防火墙配置正确
- [ ] API代理配置正确
