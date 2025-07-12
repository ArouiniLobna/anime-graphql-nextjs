/**
 * Root layout component with providers and global styling
 * Configures ChakraUI, Apollo Client, and user context
 */

import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Leonardo.Ai Web Challenge",
  description:
    "A NextJS application showcasing anime data with GraphQL integration",
  keywords: ["nextjs", "react", "graphql", "anime", "chakra-ui"],
  authors: [{ name: "Leonardo.Ai Challenge Candidate" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
