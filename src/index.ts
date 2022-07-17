/**
 * @author        IronLu233 <lrironsora@gmail.com>
 * @date          2022-07-13 20:27:55
 */

import templateFunction from "./template.ejs";
import toPairs from "lodash.topairs";
import glob from "glob";
import mkdirp from "mkdirp";
import path from "path";
import { writeFile } from "fs/promises";
import watch from "glob-watcher";

interface Translation {
  [key: string]: string | Translation;
}

/**
 * traverse all paths of a translation object.**COST A LOT**
 * @param translation Translation object
 * @returns all translation key paths
 */
function traverseTranslationPath(translation: Translation) {
  type QueueTuple = [string, Translation];
  const paths: string[] = [];
  const queue: QueueTuple[] = [["", translation]];

  let head: QueueTuple | undefined;
  while ((head = queue.pop())) {
    const [prefix, translation] = head;
    for (const [key, value] of toPairs(translation)) {
      if (typeof value === "string") {
        paths.push(`${prefix}.${value}`);
      } else {
        queue.push([`${prefix}.${key}`, value]);
      }
    }
  }

  return paths;
}

/**
 * Get i18next definition source code string
 */
export function getI18nextDefinition(
  translationFilePaths: string[],
  {
    inline: _inline,
    global: _global,
    loader: _loader,
    strict,
  }: DefinitionOptions
) {
  const global =
    _global === undefined || _global === true ? "TranslationKey" : _global;

  const inline = !!_loader || _inline;
  const loader = _loader || require;
  const inlinePaths = inline
    ? translationFilePaths.flatMap((it) => traverseTranslationPath(loader(it)))
    : [];

  return templateFunction({
    global,
    translationFilePaths,
    inlinePaths,
    strict,
  });
}

export async function buildTypeDefinition(
  globPattern: string,
  outputDir = "node_modules/@types/i18next-typescript-dts",
  options: DefinitionOptions = {}
) {
  const matches = await new Promise<string[]>((resolve, reject) => {
    glob(
      globPattern,
      { ignore: "node_modules", nodir: true },
      (err, matches) => {
        if (err) {
          return reject(err);
        }
        resolve(matches.map((it) => path.resolve(process.cwd(), it)));
      }
    );
  });

  if (matches.length === 0) {
    return;
  }
  const source = await getI18nextDefinition(matches, options);
  await writeTypeDefinition(source, outputDir);
}

export async function writeTypeDefinition(source: string, outputDir: string) {
  try {
    await mkdirp(outputDir);
  } catch {
    // Do nothing
  }

  const outputDTSPath = path.join(outputDir, "index.d.ts");
  // const outputPkgPath = path.join(outputDir, "package.json");
  await writeFile(outputDTSPath, source);
  // await writeFile(
  //   outputPkgPath,
  //   JSON.stringify({ name: "i18next-typescript-dts", types: "index.d.ts" })
  // );
}

export async function watchTypeDefinition(
  globPattern: string,
  outputDir = "node_nodules/@types/i18next-typescript-dts"
) {
  const watcher = watch(globPattern);
  watcher.addListener("change", async (path: string) => {
    await buildTypeDefinition(globPattern, outputDir);
  });
}

export type DefinitionOptions = {
  /**
   * inline the translation key
   * @default false
   * @default true when you provide {loader} options
   */
  inline?: boolean;

  /**
   * inject variable to global scope
   * if provide a string, the value will be global type name
   * @default 'TranslationKey'
   */
  global?: boolean | string;

  /**
   * map the translation file to its namespace
   * if not provided, all translation key will be in type `TranslationKey`
   */
  // TBD
  // nsMapper?: (path: string) => string;

  /**
   * How to from filepath to translation object
   * If you load other format file like `.yaml`
   * this field is required
   */
  loader?: (path: string) => Record<string, any>;

  /**
   * override the origin TFunction definition in i18next
   * @default false
   */
  strict?: boolean;

  /**
   * return the object node type
   */
  // allowObjects?: boolean;

  /**
   * return the array path
   */
  // allowArray?: boolean;
};
