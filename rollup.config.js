import typescript from "@rollup/plugin-typescript";
export default {
  input: "./src/index.ts",
  output: [
    {
      format: "cjs",
      file: "lib/guide-mini-vue.cjs.js",
      sourcemap: true,
    },
    {
      format: "esm",
      file: "lib/guide-mini-vue.esm.js",
      sourcemap: true,
    },
  ],
  plugins: [typescript()],
};
