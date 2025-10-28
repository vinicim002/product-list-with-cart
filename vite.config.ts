import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 5173, // Porta padrão (você pode mudar se quiser)
    open: true, // Abre o navegador automaticamente
  },
  build: {
    outDir: "dist", // Pasta de build
    sourcemap: true, // Facilita debug no modo produção
  },
  resolve: {
    alias: {
      "@": "/src", // Atalho para importar arquivos da pasta src
    },
  },
});
