import { ThemeMode } from "@zitadel/proto/zitadel/settings/v2/branding_settings_pb";
import { describe, expect, test } from "vitest";
import { resolveMyDermaLifeTheme } from "./mydermalife-theme";

describe("resolveMyDermaLifeTheme", () => {
  test.each([undefined, ThemeMode.UNSPECIFIED, ThemeMode.AUTO])(
    "uses the branded light default for mode %s",
    (themeMode) => {
      expect(resolveMyDermaLifeTheme(themeMode)).toBe("light");
    },
  );

  test("respects an explicitly forced dark organization theme", () => {
    expect(resolveMyDermaLifeTheme(ThemeMode.DARK)).toBe("dark");
  });
});
