import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  base: `/PierreCourant_13_15102022/`,
  // plugins: [react()],
  plugins: [
    react(),
    tsconfigPaths(),
    !process.env.VITEST
      ? checker({
          typescript: true,
          eslint: {
            lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
          },
        })
      : undefined,
  ],
  // resolve: {
  //     alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  // },
});
