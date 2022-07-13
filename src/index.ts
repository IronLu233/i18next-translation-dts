/**
 * @author        IronLu233 <lrironsora@gmail.com>
 * @date          2022-07-13 20:27:55
 */

import templateFunction from "./template.ejs";
/**
 * Get i18next definition source code string
 */
export function getI18nextDefinition(
  translationFilePaths: string[],
  { inline, global: _global, nsMapper }: DefinitionOptions
) {
  const global =
    _global === undefined || _global === true ? "TranslationKey" : _global;
  return templateFunction({ global, inline, translationFilePaths });
}

export type DefinitionOptions = {
  /**
   * inline the translation key
   * @default false
   * @default true when you provide {loader} options
   */
  inline?: true | undefined;

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
  nsMapper?: (path: string) => string;

  /**
   * How to from filepath to translation object
   * If you load other format file like `.yaml`
   * this field is required
   */
  loader?: (path: string) => Record<string, any>;
};
