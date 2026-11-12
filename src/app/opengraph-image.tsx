import { ImageResponse } from "next/og";
export const alt = "MOX. — Desenvolvimento web em Fortaleza";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#0c0c0f",
        color: "#f7f7fa",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 80,
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", fontSize: 100, fontWeight: 900 }}>
        mox<span style={{ color: "#b17aff" }}>.</span>
      </div>
      <div style={{ display: "flex", fontSize: 70, fontWeight: 700 }}>
        Seu negócio. O próximo nível digital.
      </div>
      <div style={{ display: "flex", fontSize: 24, color: "#b17aff" }}>
        ESTRATÉGIA · DESIGN · DESENVOLVIMENTO / FORTALEZA
      </div>
    </div>,
    size,
  );
}
