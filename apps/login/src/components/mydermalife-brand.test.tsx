import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MyDermaLifeMaterial, MyDermaLifeWordmark, myDermaLifeAssetPath } from "./mydermalife-brand";

describe("MyDermaLife brand adapter", () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  test("keeps brand assets inside the configured Login V2 base path", () => {
    expect(myDermaLifeAssetPath("brand/mdl-mark-clay.svg")).toBe(`${basePath}/brand/mdl-mark-clay.svg`);
  });

  test("renders the approved outlined wordmark with an accessible name", () => {
    render(<MyDermaLifeWordmark tone="clay" />);

    expect(screen.getByRole("img", { name: "MyDermaLife" })).toHaveAttribute(
      "src",
      `${basePath}/brand/mydermalife-wordmark-clay.svg`,
    );
  });

  test("uses the owned living-skin material asset", () => {
    const { container } = render(<MyDermaLifeMaterial aria-hidden="true" />);
    const material = container.firstElementChild as HTMLElement;

    expect(material.style.backgroundImage).toContain("/brand/skin-contours.svg");
  });
});
