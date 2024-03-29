/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx'
// import Unocss from "unocss/vite";
import Unocss from "./config/unocss";

export default defineConfig({
    plugins: [
        vue(),
        vueJsx({}),
        Unocss()
    ],
    build: {
        rollupOptions: {
          external: ["vue", "vue-router"],
          output: {
            globals: {
              vue: "Vue",
            },
          },
        },
        minify: 'terser', // boolean | 'terser' | 'esbuild'
        sourcemap: true, // 输出单独 source文件
        cssCodeSplit: true,
        lib: {
          entry: "./src/entry.ts",
          name: "SmartyUI",
          fileName: "smarty-ui",
          // 导出模块格式
          formats: ["esm", "umd", "iife"] as any,
        },
      },
      test: {
        // enable jest-like global test APIs
        globals: true,
        // simulate DOM with happy-dom
        // (requires installing happy-dom as a peer dependency)
        environment: 'happy-dom',
        // 支持tsx组件，很关键
        transformMode: {
          web: [/.[tj]sx$/]
        }
      }
});