import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
    // plugins: [react()],
    plugins: [
        react(),
        tsconfigPaths(),
        checker({
            typescript: true,
            eslint: {
                lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
            },
            stylelint: {
                lintCommand: 'stylelint ./src/**/*.css',
            },
        }),
    ],
    // resolve: {
    //     alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    // },
});
