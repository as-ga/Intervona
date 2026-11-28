import { ImageResponse } from "next/og";

export const alt = "Intervona — Practice the interview out loud";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#18162A",
        padding: "80px",
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 26,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#AFA0FF",
          fontFamily: "monospace",
          marginBottom: 28,
        }}
      >
        YOUR INTERVIEW STUDIO
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 104,
          lineHeight: 1.05,
          color: "#FFFFFF",
          letterSpacing: "-0.02em",
        }}
      >
        Intervona
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 36,
          color: "#C9C4DB",
          marginTop: 28,
          maxWidth: 900,
        }}
      >
        Rehearse the conversation before it matters.
      </div>
    </div>,
    { ...size },
  );
}
