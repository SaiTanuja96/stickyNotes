import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [preact()],
// })
export default {
  build: {
    rollupOptions: {
      external: 'src/main.jsx'
    }
  }
}
