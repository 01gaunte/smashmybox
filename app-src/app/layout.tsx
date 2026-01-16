import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmashMyBox - The Parcel Prize Game",
  description: "Create boxes, share the target, watch them fill. When they're full, they pay out automatically.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="grain"></div>
        {children}
      </body>
    </html>
  );
}
