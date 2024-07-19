import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { ModalProvider } from "@/providers/modal-provider";
import { ToasterProvider } from "@/providers/toast-provider";
import { Toaster } from "sonner";

import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

const aRoute = process.env.NEXT_CLERK_ADMIN_SIGN_IN_FALLBACK_URL;

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "For admin role",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <ClerkProvider afterSignOutUrl={"/"} signInForceRedirectUrl={aRoute}>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {/* <QueryClientProvider client={queryClient}> */}
            <ToasterProvider />
            <Toaster />
            <ModalProvider />
              {children}
            {/* </QueryClientProvider> */}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
