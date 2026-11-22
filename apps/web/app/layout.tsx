import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Intervona",
  description:
    "Intervona is a platform that helps you prepare for interviews by providing a wide range of interview questions and answers across various domains. It offers a comprehensive collection of questions, including technical, behavioral, and situational questions, to help you practice and improve your interview skills. With Intervona, you can enhance your confidence and increase your chances of success in job interviews.",
};

function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
export default RootLayout;
