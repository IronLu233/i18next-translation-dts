/**
 * @author        IronLu233 <lrironsora@gmail.com>
 * @date          2022-07-13 21:44:50
 */

import { defineConfig } from "rollup";
import ejs from "rollup-plugin-ejs";
import sucrase from "@rollup/plugin-sucrase";
import resolve from "@rollup/plugin-node-resolve";

export default defineConfig({
  input: "src/index.ts",
  plugins: [
    resolve({ extensions: [".js", ".ts"] }),
    sucrase({
      exclude: ["node_modules/**", "**/*.ejs"],
      transforms: ["typescript"],
    }),
    ejs(),
  ],
  output: {
    file: "dist/bundle.js",
  },
});
