require('esbuild-register');
const {copy} = require('esbuild-plugin-copy');

require('esbuild')
  .build({
    entryPoints: ['./src/main.ts'],
    bundle: true,
    outfile: './dist/index.js',
    platform: 'node',
    target: 'node16',
    format: 'cjs',
    sourcemap: false,
    tsconfig: 'tsconfig.json',
    plugins: [
      copy({
        assets: {
          from: ['./Dockerfile'],
          to: ['./'],
        },
      }),
    ],
  })
  // eslint-disable-next-line no-process-exit
  .catch(() => process.exit(1));
