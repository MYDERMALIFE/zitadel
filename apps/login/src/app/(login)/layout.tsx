import "@/styles/globals.scss";

import { BackgroundWrapper } from "@/components/background-wrapper";
import { LanguageProvider } from "@/components/language-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MyDermaLifeWordmark, myDermaLifeAssetPath } from "@/components/mydermalife-brand";
import { Skeleton } from "@/components/skeleton";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeSwitch from "@/components/theme-switch";
import { LANGS, getLanguage } from "@/lib/i18n";
import { getServiceConfig } from "@/lib/service-url";
import { getAllowedLanguages } from "@/lib/zitadel";
import * as Tooltip from "@radix-ui/react-tooltip";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Inter, Playfair_Display } from "next/font/google";
import { headers } from "next/headers";
import React, { Suspense } from "react";

const inter = Inter({
  variable: "--mdl-font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--mdl-font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("common");
  return {
    applicationName: "MyDermaLife",
    title: t("title"),
    icons: {
      icon: myDermaLifeAssetPath("/brand/mdl-mark-clay.svg"),
    },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const shell = await getTranslations("mydermalifeShell");
  const _headers = await headers();
  const { serviceConfig } = getServiceConfig(_headers);

  let languages = LANGS;
  try {
    const settings = await getAllowedLanguages({ serviceConfig });
    if (settings.allowedLanguages?.length) {
      languages = settings.allowedLanguages
        .filter((code) => LANGS.find((l) => l.code === code))
        .map((code) => getLanguage(code));
    }
  } catch (e) {
    console.error("Failed to load supported languages", e);
  }

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head />
      <body className="mdl-login-root">
        <ThemeProvider>
          <Tooltip.Provider>
            <Suspense
              fallback={
                <BackgroundWrapper className="mdl-login-stage">
                  <div className="mdl-login-frame">
                    <header className="mdl-login-header">
                      <MyDermaLifeWordmark />
                    </header>
                    <main className="mdl-login-main mdl-login-main--loading">
                      <div className="mdl-login-loader">
                        <Skeleton>
                          <div className="h-40" />
                        </Skeleton>
                      </div>
                    </main>
                    <div className="mdl-login-footer" aria-hidden="true" />
                  </div>
                </BackgroundWrapper>
              }
            >
              <LanguageProvider>
                <BackgroundWrapper className="mdl-login-stage">
                  <div className="mdl-login-frame">
                    <header className="mdl-login-header">
                      <a className="mdl-login-header__brand" href="https://stormbyva.com/" aria-label={shell("brandHome")}>
                        <MyDermaLifeWordmark />
                      </a>
                      <div className="mdl-login-header__utilities">
                        <LanguageSwitcher languages={languages} />
                        <ThemeSwitch />
                      </div>
                    </header>
                    <main className="mdl-login-main">{children}</main>
                    <footer className="mdl-login-footer">
                      <p>{shell("privacyPromise")}</p>
                      <nav aria-label={shell("footerNavigation")}>
                        <a href="https://stormbyva.com/trust">{shell("privacy")}</a>
                        <a href="https://stormbyva.com/contact">{shell("help")}</a>
                      </nav>
                    </footer>
                  </div>
                </BackgroundWrapper>
              </LanguageProvider>
            </Suspense>
          </Tooltip.Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
