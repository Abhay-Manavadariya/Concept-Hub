import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { Toaster } from "sonner";
import ModalProvider from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Concept Hub",
  description: "The connected workspace where better, faster work happens.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/idea-logo-dark.png",
        href: "/idea-logo-dark.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/idea-logo-white.png",
        href: "/idea-logo-white.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* The suppressHydrationWarning attribute suppresses the warning message that React would typically log to the console when it detects a mismatch between the server-rendered content and the client-rendered content.
      This can be useful when you know the mismatches are harmless or expected and you want to avoid cluttering the console with warnings. */}
      <body className={inter.className} suppressHydrationWarning>
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="conceptHub-theme"
              // The storageKey parameter is used by the ThemeProvider component to specify the key under which the theme preference is stored in the browser's local storage.
            >
              <Toaster position="bottom-center" />
              <ModalProvider />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
