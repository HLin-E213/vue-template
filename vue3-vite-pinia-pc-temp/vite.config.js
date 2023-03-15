import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
const fs = require('fs')
// 按需引入element-plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(({ command, mode }) => {
  const srcPath = resolve(__dirname, 'src')
  const envFiles = [`.env.${mode}`]

  for (const file of envFiles) {
    const envConfig = dotenv.parse(fs.readFileSync(file))
    process.env = { ...process.ENV, ...envConfig }
  }
  return {
    define: {
      'process.env': {
        ...process.env
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
        }
      }
    },
    resolve: {
      alias: {
        '@/': `${srcPath}/`
      }
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      vue(),
      vueJsx({})
  ]
  }
})
