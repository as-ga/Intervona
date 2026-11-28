import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://intervona.local",
  ),
  title: {
    default: "Intervona — Practice the interview out loud",
    template: "%s · Intervona",
  },
  description:
    "Role-aware voice interview practice shaped by your CV and target job, with focused feedback after every session.",
  applicationName: "Intervona",
  openGraph: {
    title: "Intervona — Practice the interview out loud",
    description:
      "Role-aware voice interview practice — rehearse the conversation before it matters.",
    url: "/",
    siteName: "Intervona",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Intervona — Practice the interview out loud",
    description:
      "Role-aware voice interview practice — rehearse the conversation before it matters.",
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="font-sans">
      <body className="font-sans">
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: ".reveal{opacity:1!important;transform:none!important}",
            }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
