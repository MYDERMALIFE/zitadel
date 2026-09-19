"use client";
import { ThemeProvider as ThemeP } from "next-themes";
import { ReactNode } from "react";

export function ThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ThemeP attribute="class" defaultTheme="light" storageKey="cp-theme" value={{ dark: "dark", light: "light" }}>
      {children}
    </ThemeP>
  );
}
