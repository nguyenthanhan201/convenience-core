/* eslint-disable no-console */
import glob from 'glob';
import chunk from 'lodash/chunk';
import { build } from 'tsup';

async function buildStage({ clean, entry }) {
  console.log('🚀 ~ building entry ', entry);

  try {
    await build({
      dts: true, // Generate .d.ts files
      minify: true, // Minify output
      sourcemap: true, // Generate sourcemaps
      treeshake: true, // Remove unused code
      splitting: true, // Split output into chunks
      outDir: 'dist', // Output directory
      clean, // Clean output directory before building
      entry, // Entry point(s)
      external: ['react', 'react-dom'],
      format: ['esm', 'cjs'], // Output format(s),
    });
  } catch (error) {
    console.log('🚀 ~ error while building entries :', entry);
    throw error;
  }
}

export async function buildAllStages() {
  const root_file = glob.sync('src/index.ts');
  const files = glob.sync('src/package/**/index.ts');

  const chunkSize = 3;
  const chunks = chunk(files, chunkSize);

  for await (const [index, chunk] of chunks.entries()) {
    await buildStage({ clean: index === 0, entry: chunk });
  }
  await buildStage({ clean: false, entry: root_file });
  //    await buildStage({ clean:true, entry: root_file });
}

export function invokeBuild() {
  buildAllStages()
    .then(() => {
      console.log('🚀 ~ buildAllStages success');
    })
    .catch((error) => {
      console.log('🚀 ~ buildAllStages error === ', error);
      process.exit(1);
    });
}
invokeBuild();
