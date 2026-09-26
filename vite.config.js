import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages は https://73k86k.github.io/task_board/ で配信されるため、
  // 本番ビルドのみリポジトリ名をベースパスにする
  base: command === 'build' ? '/task_board/' : '/',
}))
