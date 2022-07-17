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

import * as i18next from "i18next";

declare module "i18next" {
  export interface TFunction {
    // basic usage
    <
      TResult extends i18n.TFunctionResult = string,
      TKeys extends i18n.TFunctionKeys = TranslationPaths<TranslationFile>,
      TInterpolationMap extends object = ii18n.StringMap
    >(
      key: TKeys | TKeys[]
    ): TResult;
    <
      TResult extends TFunctionResult = TFunctionDetailedResult<object>,
      TKeys extends TFunctionKeys = string,
      TInterpolationMap extends object = StringMap
    >(
      key: TKeys | TKeys[],
      options?: TOptions<TInterpolationMap> & {
        returnDetails: true;
        returnObjects: true;
      }
    ): TResult;
    <
      TResult extends TFunctionResult = TFunctionDetailedResult,
      TKeys extends TFunctionKeys = string,
      TInterpolationMap extends object = StringMap
    >(
      key: TKeys | TKeys[],
      options?: TOptions<TInterpolationMap> & { returnDetails: true }
    ): TResult;
    <
      TResult extends TFunctionResult = object,
      TKeys extends TFunctionKeys = string,
      TInterpolationMap extends object = StringMap
    >(
      key: TKeys | TKeys[],
      options?: TOptions<TInterpolationMap> & { returnObjects: true }
    ): TResult;
    <
      TResult extends TFunctionResult = string,
      TKeys extends TFunctionKeys = string,
      TInterpolationMap extends object = StringMap
    >(
      key: TKeys | TKeys[],
      options?: TOptions<TInterpolationMap> | string
    ): TResult;
    // overloaded usage
    <
      TResult extends TFunctionResult = string,
      TKeys extends TFunctionKeys = string,
      TInterpolationMap extends object = StringMap
    >(
      key: TKeys | TKeys[],
      defaultValue?: string,
      options?: TOptions<TInterpolationMap> | string
    ): TResult;
  }
}

i18next.t("title");
