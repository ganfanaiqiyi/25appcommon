#!/bin/bash
# Nginx诊断脚本

echo "=== Nginx诊断开始 ==="

# 1. 检查Nginx状态
echo "1. 检查Nginx状态:"
systemctl status nginx --no-pager

# 2. 检查Nginx配置
echo -e "\n2. 检查Nginx配置:"
nginx -t

# 3. 检查配置文件
echo -e "\n3. 检查配置文件:"
ls -la /etc/nginx/sites-available/
ls -la /etc/nginx/sites-enabled/

# 4. 检查端口监听
echo -e "\n4. 检查端口监听:"
netstat -tlnp | grep nginx

# 5. 检查网站文件
echo -e "\n5. 检查网站文件:"
find /var/www -name "index.html" -type f 2>/dev/null
find /home -name "index.html" -type f 2>/dev/null
find /usr/share -name "index.html" -type f 2>/dev/null

# 6. 检查Nginx错误日志
echo -e "\n6. 检查Nginx错误日志:"
tail -10 /var/log/nginx/error.log

# 7. 检查访问日志
echo -e "\n7. 检查访问日志:"
tail -10 /var/log/nginx/access.log

# 8. 测试后端API
echo -e "\n8. 测试后端API:"
curl -s -o /dev/null -w "%{http_code}" https://hsckzy888.com/api.php/provide/vod/at/json/?ac=videolist&pg=1&t=0&wd=

echo -e "\n=== 诊断完成 ==="
