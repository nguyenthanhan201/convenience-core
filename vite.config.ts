// https://bundlephobia.com
// https://www.skypack.dev
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // dts({
    //   insertTypesEntry: true,
    // }),
    // terser({
    //   ecma: 2015,
    //   mangle: { toplevel: true },
    //   compress: {
    //     toplevel: true,
    //     drop_console: true,
    //     drop_debugger: true,
    //   },
    //   output: { quote_style: 1 },
    // }) as any,
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  // build: {
  //   copyPublicDir: false,
  //   sourcemap: true,
  //   lib: {
  //     entry: resolve(__dirname, 'src/lib/index.ts'),
  //     name: 'convenience-core',
  //     fileName: (format) => `convenience-core.${format}.js`,
  //     formats: ['es', 'umd'],
  //   },
  //   rollupOptions: {
  //     external: ['react', 'react-dom'],
  //     output: {
  //       globals: {
  //         react: 'React',
  //         'react-dom': 'ReactDOM',
  //       },
  //     },
  //   },
  // },
});
