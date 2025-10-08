function testDomainSuccess(domain) {
    return new Promise((resolve) => {
        const startTime = Date.now();
        uni.request({
            url: `https://${domain}/health-check`, // 建议使用专门用于健康检查的路径
            success: (res) => {
                const latency = Date.now() - startTime;
                resolve({ domain, latency });
            },
            fail: () => {} // 失败时不触发resolve/reject
        });
    });
}

async function getFirstSuccessDomain(domains) {
    const promises = domains.map(domain => testDomainSuccess(domain));
    return await Promise.race(promises);
}

function withTimeout(promise, timeout = 5000) {
    return Promise.race([
        promise,
        new Promise((_, reject) => 
            setTimeout(() => reject(new Error('超时未获取成功响应')), timeout)
        )
    ]);
}

// 调用示例
withTimeout(getFirstSuccessDomain(domains)).then(console.log).catch(console.error);

const domains = ['www.domain1.com', 'www.domain2.com', 'www.domain3.com'];

// 基础调用
getFirstSuccessDomain(domains).then(result => {
    console.log(`首个成功域名: ${result.domain}，延迟: ${result.latency}ms`);
});

// 带超时的安全调用
withTimeout(getFirstSuccessDomain(domains), 8000)
    .then(console.log)
    .catch(err => console.error('所有请求均失败或超时', err));
