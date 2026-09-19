import { ThemeMode } from "@zitadel/proto/zitadel/settings/v2/branding_settings_pb";

export type MyDermaLifeTheme = "light" | "dark";

const THEME_BY_MODE: Readonly<Partial<Record<ThemeMode, MyDermaLifeTheme>>> = {
  [ThemeMode.DARK]: "dark",
  [ThemeMode.LIGHT]: "light",
};

/**
 * MyDermaLife is light by default. AUTO and missing/unspecified organization
 * branding must not silently inherit the device theme on the first visit.
 */
export function resolveMyDermaLifeTheme(themeMode?: ThemeMode): MyDermaLifeTheme {
  return (themeMode !== undefined && THEME_BY_MODE[themeMode]) || "light";
}
