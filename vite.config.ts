import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(() => {
  const rootPath = path.resolve(process.cwd());
  const srcPath = `${rootPath}/src`;

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "~": rootPath,
        "@": srcPath,
      },
    },
  };
});
