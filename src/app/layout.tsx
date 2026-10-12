import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wangaratta Radiators | Tractor, Ag Machinery & Automotive Cooling Specialists",
  description: "Specialist radiator repairs, custom aluminium fabrication, re-coring, and cooling system replacements for tractors, harvesters, 4WDs, and cars at 135 Vincent Rd, Wangaratta. Call (03) 5721 3486.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-surface-950 text-surface-100 antialiased selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
