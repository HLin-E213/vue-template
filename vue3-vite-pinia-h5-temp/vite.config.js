import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
const fs = require('fs')

export default defineConfig(({ command, mode }) => {
  const srcPath = resolve(__dirname, 'src')
  console.log(mode)
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
          /**如果引入多个文件，可以使用
           * '@import "@/assets/scss/globalVariable1.scss";
           * @import"@/assets/scss/globalVariable2.scss";'
           **/
          // additionalData: '@import "@/style/globalVar.scss";'
        }
      }
    },
    resolve: {
      alias: {
        '@/': `${srcPath}/`
      }
    },
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()],
      }),
      vueJsx({})
  ]
  }
})
