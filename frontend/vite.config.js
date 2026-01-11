import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
  ],
  server: { 
    //Makes it look for the backend server when signing up
    proxy:{
      "/api" : {
        target: "http://localhost:8080",
        changeOrigin:true, 
      }
    }
  }
  
})