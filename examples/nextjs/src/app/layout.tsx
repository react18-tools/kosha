import "./styles.css";
import "react18-loaders/dist/index.css";
import { Core } from "nextjs-darkmode-lite";
import { Layout } from "@repo/shared/dist/server";
import { GlobalLoader, Header } from "@repo/shared";
import { Inter } from "next/font/google";
import { Particles } from "webgl-generative-particles/react";
import { ReactNode } from "react";
import { CustomLink } from "./custom-link";

const inter = Inter({ subsets: ["latin"] });

/** Root layout. */
export default function RootLayout({ children }: { children: React.ReactNode }): ReactNode {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Core />
        <Layout>
          <Header linkComponent={CustomLink} />
          {children}
        </Layout>
        <GlobalLoader />
        <Particles fullScreenOverlay />
      </body>
    </html>
  );
}
