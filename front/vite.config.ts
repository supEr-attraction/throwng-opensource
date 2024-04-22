import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Throwng",
        short_name: "Throwng",
        theme_color: "#0F1114",
        start_url: "/",
        icons: [
          {
            src: "./icons/logo192x192.webp",
            sizes: "192x192",
            type: "image/webp",
          },
          {
            src: "./icons/logo192x192.webp",
            sizes: "192x192",
            type: "image/webp",
            purpose: "any maskable",
          },
          {
            src: "./icons/logo512x512.webp",
            sizes: "512x512",
            type: "image/webp",
          },
          {
            src: "./icons/logo512x512.webp",
            sizes: "512x512",
            type: "image/webp",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  server: {
    port: 5173,
    host: "0.0.0.0",
  },
});
