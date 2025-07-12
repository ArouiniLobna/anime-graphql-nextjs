/**
 * Chakra UI theme configuration
 * Provides consistent design system with responsive breakpoints
 */

import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: true,
  },
  styles: {
    global: {
      "html, body": {
        height: "100%",
      },
      "#__next": {
        height: "100%",
      },
    },
  },
  breakpoints: {
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "blue",
      },
    },
    Badge: {
      baseStyle: {
        textTransform: "uppercase",
        fontSize: "0.75em",
        fontWeight: "bold",
        letterSpacing: "0.025em",
      },
    },
  },
  fonts: {
    heading: "system-ui, sans-serif",
    body: "system-ui, sans-serif",
  },
});
