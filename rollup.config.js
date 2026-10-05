import typescript from "@rollup/plugin-typescript";
// import pkg from "./package.json" with { type: "json" };
export default {
  // input: "./src/index.ts",
  input: "./packages/vue/src/index.ts",
  output: [
    {
      format: "cjs",
      // file: pkg.main,
      file: "packages/vue/dist/guide-mini-vue.cjs.js",
      sourcemap: true,
    },
    {
      format: "esm",
      // file: pkg.module,
      file: "./packages/vue/dist/guide-mini-vue.esm.js",
      sourcemap: true,
    },
  ],
  plugins: [typescript()],
};
