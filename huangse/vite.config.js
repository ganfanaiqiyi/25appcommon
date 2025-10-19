import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { copyFileSync, mkdirSync } from 'fs'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 自定义插件：复制配置文件到输出目录
    {
      name: 'copy-config-files',
      writeBundle() {
        const configFiles = ['ads.json', 'ads2.json', 'appConfig.json', 'menu.json']
        configFiles.forEach(file => {
          try {
            const srcPath = resolve(__dirname, 'src/config', file)
            const destPath = resolve(__dirname, 'dist', file)
            copyFileSync(srcPath, destPath)
            console.log(`已复制配置文件: ${file}`)
          } catch (error) {
            console.warn(`复制配置文件失败 ${file}:`, error.message)
          }
        })
      }
    }
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://hsckzy888.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api.php/provide/vod/at/json')
      }
    }
  },
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        }
      }
    }
  }
})
