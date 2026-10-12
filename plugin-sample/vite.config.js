import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), myPlugin()],
});

function myPlugin() {
  return {
    name: "vite:my-plugin",
    transform(code, id) {
      if (id.endsWith(".sample.js")) {
        let result = "";

        for (let i = 0; i < 100; i++) {
          result += `console.log("HelloWorld from plugin! (${i})");\n`;
        }

        result += code;

        return {
          code: result,
        };
      }
    },
  };
}
