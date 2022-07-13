type TranslationFile =
  typeof import("C:\\Users\\iron.lu\\workspaces\\github\\ts-i18next-type\\tests\\en.json") &
    typeof import("C:\\Users\\iron.lu\\workspaces\\github\\ts-i18next-type\\tests\\en.json");

type TranslationPaths<T, Prefix extends string = ""> = keyof {
  [K in keyof T as K extends string
    ? K extends keyof {
        [K in keyof T as T[K] extends string
          ? K extends string
            ? K
            : never
          : never]: never;
      }
      ? Prefix extends ""
        ? K
        : `${Prefix}.${K}`
      : K extends keyof {
          [K in keyof T as T[K] extends Record<any, any> ? K : never]: never;
        }
      ? Prefix extends ""
        ? TranslationPaths<T[K], K>
        : TranslationPaths<T[K], `${Prefix}.${K}`>
      : never
    : never]: never;
};

declare global {
  let TranslationKey: TranslationPaths<TranslationFile>;
}
