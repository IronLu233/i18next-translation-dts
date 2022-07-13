/**
 * @author        IronLu233 <lrironsora@gmail.com>
 * @date          2022-07-13 21:53:18
 */

declare module "rollup-plugin-ejs" {
  export default function ejs(): any;
}

declare module "*.ejs" {
  import { compile } from "ejs";
  const CompileResult: ReturnType<typeof compile>;
  export default CompileResult;
}
