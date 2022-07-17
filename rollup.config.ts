/**
 * @author        IronLu233 <lrironsora@gmail.com>
 * @date          2022-07-13 21:44:50
 */

import { defineConfig } from "rollup";
import ejs from "rollup-plugin-ejs";
import sucrase from "@rollup/plugin-sucrase";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";

export default defineConfig({
  input: ["src/index.ts", "src/cli.ts"],
  plugins: [
    commonjs(),
    resolve({ extensions: [".js", ".ts"] }),
    sucrase({
      exclude: ["**/*.ejs"],
      transforms: ["typescript"],
    }),
    // dts({}),
    ejs(),
  ],
  external: (id) => id.includes("node_modules"),
  output: [
    {
      dir: "dist",
      format: "cjs",
    },
    {
      dir: "dist",
      format: "cjs",
    },
  ],
});
