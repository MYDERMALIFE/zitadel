import { HTMLAttributes, ImgHTMLAttributes } from "react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function myDermaLifeAssetPath(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalizedPath}`;
}

type WordmarkProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "alt" | "src"> & {
  tone?: "ink" | "clay";
};

export function MyDermaLifeWordmark({ tone = "ink", className = "", ...props }: WordmarkProps) {
  return (
    <img
      {...props}
      className={`mdl-wordmark mdl-wordmark--${tone} ${className}`.trim()}
      src={myDermaLifeAssetPath(`/brand/mydermalife-wordmark-${tone}.svg`)}
      alt="MyDermaLife"
      width={996}
      height={135}
    />
  );
}

export function MyDermaLifeMaterial({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`mdl-material ${className}`.trim()}
      style={{
        ...props.style,
        backgroundImage: `linear-gradient(145deg, rgba(29, 14, 9, 0.08), rgba(29, 14, 9, 0.56)), url(${myDermaLifeAssetPath(
          "/brand/skin-contours.svg",
        )})`,
      }}
    />
  );
}
