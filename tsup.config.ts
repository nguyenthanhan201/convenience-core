import { defineConfig } from 'tsup';

// https://tsup.egoist.dev/#generate-declaration-file
export default defineConfig({
  entry: ['src/lib'],
  format: ['cjs', 'esm'],
  minify: true,
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
});
