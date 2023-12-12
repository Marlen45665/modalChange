import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteSvgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteSvgr({
      include: "**/*.svg",
      svgrOptions: {
        icon: true,
        replaceAttrValues: {
            // "#B8BECA": "currentColor"
        },
      },
    }),
    react()
  ]
})
