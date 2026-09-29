import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json" with { type: "json" };
export default {
  input: "./src/index.ts",
  output: [
    {
      format: "cjs",
      file: pkg.main,
      sourcemap: true,
    },
    {
      format: "esm",
      file: pkg.module,
      sourcemap: true,
    },
  ],
  plugins: [typescript()],
};
