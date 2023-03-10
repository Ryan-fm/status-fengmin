import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    Components({
      // 指定组件位置，默认是src/components
      dirs: ['src'],
      // 搜索子目录
      deep: true,
      // ui库解析器
      resolvers: [AntDesignVueResolver()],
      extensions: ['vue'],
      // 配置文件生成位置
      dts: 'src/components.d.ts',
      // 需要 Babel 来为 Vue 2 进行转换，出于性能考虑，它默认处于禁用状态。
      directives: true,

      // filters for transforming targets
      include: [/.vue$/, /.vue?vue/],
      exclude: [/[\/]node_modules[\/]/, /[\/].git[\/]/, /[\/].nuxt[\/]/]
    }),
    // 插件的所有默认配置
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],

      // global imports to register
      imports: [
        // presets
        'vue',
        'vue-router',
        // custom
        {
          '@vueuse/core': [
            // named imports
            'useMouse', // import { useMouse } from '@vueuse/core',
            // alias
            ['useFetch', 'useMyFetch'] // import { useFetch as useMyFetch } from '@vueuse/core',
          ],
          axios: [
            // default imports
            ['default', 'axios'] // import { default as axios } from 'axios',
          ]
          // '[package-name]': [
          //   '[import-names]',
          //   // alias
          //   ['[from]', '[alias]']
          // ]
        }
      ],
      dts: 'src/auto-imports.d.ts',

      // custom resolvers
      // 可以在这自定义自己的东西，比如接口api的引入，工具函数等等
      // see https://github.com/antfu/unplugin-auto-import/pull/23/
      resolvers: [
        /* ... */
      ]
    })
  ],
  optimizeDeps: {
    include: ['axios']
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    cors: true,
    host: "0.0.0.0", // 指定服务器主机名
    port: 8080, // 指定服务端口号
    open: true, // 运行自动打开浏览器
    strictPort: false, // 若8080端口被占用,直接结束项目,
  },
});
