import { defineConfig } from 'tsup'
import Quansync from 'unplugin-quansync/esbuild'

export default defineConfig([
  {
    entry: ['src/index.ts'],
    outDir: 'dist',
    target: 'node18',
    platform: 'node',
    format: ['esm'],
    splitting: false,
    sourcemap: true,
    minify: false,
    shims: true,
    dts: true,
    esbuildPlugins: [Quansync()]
  }
])
