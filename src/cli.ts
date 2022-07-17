/**
 * @author        IronLu233 <lrironsora@gmail.com>
 * @date          1970-01-01 08:00:00
 */

import yargs from "yargs";

import { buildTypeDefinition } from "./index";

yargs.positional("pattern", {
  describe: "The glob file pattern to your localization file",
});

yargs.option("watch", {
  alias: "w",
  description: "Watch the translation file change",
});

yargs.option("inline", {
  description:
    "recursive evaluate the translation key, and write it to definition file",
});

yargs.option("strict", {
  description: "override the origin TFunction in i18next",
});

yargs.option("outDir", {
  alias: "d",
  desc: "the type definition file output dir",
});

yargs.help();
const argv = yargs.argv as Awaited<typeof yargs.argv>;

const globPatterns = argv._[0] as string;
const { inline, strict, outDir } = argv as Record<string, any>;

buildTypeDefinition(globPatterns, outDir, {
  inline,
  strict,
});
