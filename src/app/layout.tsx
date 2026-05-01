import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/navbar";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider as ThemeConfigProvider } from "@/context/theme-context";
import { ThemeWrapper } from "@/components/theme-wrapper";
import FooterComp from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: siteConfig.icon,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground h-full overflow-x-hidden" suppressHydrationWarning>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <ThemeConfigProvider>
            <ThemeWrapper>
              <Navbar />
              <main className="flex-1 pb-20 md:pb-0">
                {children}
              </main>
              <FooterComp />
            </ThemeWrapper>
          </ThemeConfigProvider>
        </NextThemesProvider>
      </body >
    </html >
  );
}