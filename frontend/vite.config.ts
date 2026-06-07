import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'
import macrosPlugin from 'vite-plugin-babel-macros'

// https://vitejs.dev/config/

export default defineConfig({
    plugins: [
        react(),
        svgrPlugin(),
        macrosPlugin(),
    ],
    build: {
        outDir: 'build',
        rollupOptions: {
            treeshake: 'recommended',
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules/antd')) {
                        return 'antd';
                    }
                    if (id.includes('node_modules/@mui')) {
                        return 'mui';
                    }
                    if (id.includes('node_modules/recharts')) {
                        return 'recharts';
                    }
                    if (id.includes('node_modules/react-select-country-list')) {
                        return 'country-list';
                    }
                    if (id.includes('node_modules/country-state-city')) {
                        return 'city-list';
                    }
                }
            }
        }
    },
    server: {
        port: 3008,
    },
    define: {
        'process.env': process.env
    }
})
