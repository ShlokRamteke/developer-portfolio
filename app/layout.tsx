import type { Metadata } from "next";
import "./globals.css";
const websiteUrl =
  process.env.WEBSITE_URL || "https://www.mediaconverterpro.com";

export const metadata: Metadata = {
  title: "Shlok Ramteke - Portfolio",
  description:
    "Welcome to my personal portfolio! I am a passionate developer showcasing my projects, skills, and experiences. Created with v0.",
  applicationName: "Shlok Ramteke Portfolio",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Shlok Ramteke",
    "Portfolio",
    "Developer",
    "Projects",
    "Skills",
    "Experiences",
    "Web Development",
    "Software Engineer",
  ],
  authors: [{ name: "Shlok Ramteke", url: websiteUrl }],
  creator: "Shlok Ramteke",
  publisher: "Shlok Ramteke",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Shlok Ramteke - Portfolio",
    description:
      "Welcome to my personal portfolio! I am a passionate developer showcasing my projects, skills, and experiences. Created with v0.",
    url: websiteUrl,
    siteName: "Shlok Ramteke Portfolio",
    images: [
      {
        url: `${websiteUrl}/photo.png`,
        width: 1200,
        height: 630,
        alt: "Shlok Ramteke Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shlok Ramteke - Portfolio",
    description:
      "Welcome to my personal portfolio! I am a passionate developer showcasing my projects, skills, and experiences. Created with v0.",
    images: [`${websiteUrl}/photo.png`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={`${websiteUrl}`} />
        <link rel="icon" href={`${websiteUrl}/favicon.ico`} />
        <meta name="robots" content="index, follow" />
        <meta
          name="google-site-verification"
          content={process.env.GOOGLE_SITE_VERIFICATION}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
