/**
 * Providers component for wrapping the app with necessary context providers
 * Configures ChakraUI, Apollo Client, and user context
 */

"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/lib/apollo-client";
import { UserProvider } from "@/contexts/UserContext";
import { theme } from "@/lib/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <UserProvider>{children}</UserProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}
