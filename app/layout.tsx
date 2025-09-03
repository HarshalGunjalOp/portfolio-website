import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://www.harshalgunjal.in"),
  title: "Harshal Gunjal",
  description: "Portfolio Website for Harshal Gunjal",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png", sizes: "32x32" }, // main favicon
    ],
    shortcut: ["/logo.png"],
    apple: [{ url: "/logo.png" }],
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Harshal Gunjal",
    description: "Portfolio Website for Harshal Gunjal",
    images: [
      {
        url: "https://opengraph.b-cdn.net/production/images/2f117436-3db6-4ac7-9a99-a49b2d9d2a8d.png?token=JUj-rDVbpMKBdVV837m39IceL4qAot8VDXgxHSz7W1A&height=1024&width=1024&expires=33292891374",
        width: 1200,
        height: 630,
        alt: "Harshal Gunjal — Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harshal Gunjal",
    description: "Portfolio Website for Harshal Gunjal",
    images: ["https://opengraph.b-cdn.net/production/images/2f117436-3db6-4ac7-9a99-a49b2d9d2a8d.png?token=JUj-rDVbpMKBdVV837m39IceL4qAot8VDXgxHSz7W1A&height=1024&width=1024&expires=33292891374"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
    </html>
  )
}
