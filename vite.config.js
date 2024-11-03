import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression'; // Import compression here

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      verbose: true, // Show the compression results in the console
      disable: false, // Disable compression if needed
      threshold: 500, // Only compress files larger than this value
      algorithm: 'gzip', // Compression algorithm (can be 'gzip', 'brotliCompress', etc.)
      ext: '.gz', // The file extension for the compressed files
    }),
  ],
  optimizeDeps: {
    exclude: ['chunk-DC5AMYBS.js'], // Replace this with the correct dependency name
  },
});
