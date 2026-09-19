"use client";

import { BrandingSettings } from "@zitadel/proto/zitadel/settings/v2/branding_settings_pb";
import { useTranslations } from "next-intl";
import { Children, ReactNode } from "react";
import { MyDermaLifeMaterial } from "./mydermalife-brand";
import { ThemeWrapper } from "./theme-wrapper";

/**
 * Preserves the upstream title/form child contract while CSS owns the
 * responsive composition. Avoiding a client-side media-query branch keeps the
 * first paint and hydrated layout identical.
 */
export function DynamicTheme({
  branding,
  children,
}: Readonly<{
  children: ReactNode | ((isSideBySide: boolean) => ReactNode);
  branding?: BrandingSettings;
}>) {
  const t = useTranslations("mydermalifeShell");

  // Keep compatibility with the upstream render-prop API. MyDermaLife always
  // renders the semantic side-by-side structure and lets CSS collapse it.
  const actualChildren: ReactNode = typeof children === "function" ? children(true) : children;

  const childArray = Children.toArray(actualChildren);
  const titleContent = childArray[0] || null;
  const formContent = childArray[1] || null;
  const hasTitleAndForm = childArray.length > 1;

  return (
    <ThemeWrapper branding={branding}>
      <div className="mdl-auth-composition">
        <aside className="mdl-auth-editorial" aria-label={t("secureSpace")}>
          <MyDermaLifeMaterial className="mdl-auth-editorial__material" aria-hidden="true" />
          <div className="mdl-auth-editorial__copy">
            <p className="mdl-auth-editorial__context">{t("secureSpace")}</p>
            <h2>{t("editorialTitle")}</h2>
            <p className="mdl-auth-editorial__description">{t("editorialDescription")}</p>
            <div className="mdl-auth-editorial__evidence">
              <span aria-hidden="true" />
              <p>{t("evidence")}</p>
            </div>
          </div>
        </aside>

        <section className="mdl-auth-task">
          <div className="mdl-auth-task__inner">
            {hasTitleAndForm ? (
              <>
                <header className="mdl-auth-task__heading">{titleContent}</header>
                <div className="mdl-auth-task__form">{formContent}</div>
              </>
            ) : (
              <div className="mdl-auth-task__form mdl-auth-task__form--single">{actualChildren}</div>
            )}
          </div>
        </section>
      </div>
    </ThemeWrapper>
  );
}
