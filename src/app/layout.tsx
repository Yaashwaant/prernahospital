import type { Metadata } from "next";
import "./globals.css";
import DoctorChatbot from "@/components/DoctorChatbot";

export const metadata: Metadata = {
  title: "Prerna Hospital",
  description: "Inspiring Minds – Advanced brain and spine care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <DoctorChatbot />
      </body>
    </html>
  );
}