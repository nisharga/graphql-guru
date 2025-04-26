import {
  FONT_DEFAULT,
  SITE_DESCRIPTION_DEFAULT,
  SITE_DOMAIN,
  SITE_TITLE_DEFAULT,
  SITE_TITLE_TEMPLATE_DEFAULT,
  SITE_VERIFICATION_GOOGLE_DEFAULT,
  switchThemeDuration,
} from "@/config";
import { ThemeProvider } from "@/providers/theme-provider";
import { Metadata } from "next";
import React from "react";
import "../styles/global.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_DOMAIN),
  title: {
    default: SITE_TITLE_DEFAULT,
    template: SITE_TITLE_TEMPLATE_DEFAULT,
  },
  description: SITE_DESCRIPTION_DEFAULT,
  verification: {
    google: SITE_VERIFICATION_GOOGLE_DEFAULT,
  },
  icons: {
    icon: {
      url: "/favicon.svg",
      type: "images/svg",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${FONT_DEFAULT.variable} ${switchThemeDuration}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
