// theme/index.js
import { extendTheme } from "@chakra-ui/react";

const PunchlineComponent = {
  // The styles all Cards have in common
  baseStyle: {
    display: "flex",
    color: "purple",
    fontWeight: "bold",
    fontSize: "0.8em",
    lineHeight: "1.5ch",
  },
};

const TitleComponent = {
  // The styles all Cards have in common
  baseStyle: {
    fontWeight: "bold",
    p: "2",
  },
  variants: {
    normal: {
      backgroundColor: "white",
      color: "red",
    },
    negative: {
      backgroundColor: "red",
      color: "white",
    },
  },
  defaultProps: {
    variant: "normal",
  },
};

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "monospace",
      },
    },
  },
  radii: {
    none: "0",
    sm: "0",
    base: "0",
    md: "0",
    lg: "0",
    xl: "0",
    "2xl": "0",
    "3xl": "0",
    full: "0",
  },
  components: {
    PunchlineComponent,
    TitleComponent,
    Button: {
      baseStyle: {
        borderColor: "black",
        transition: "none",
        _focus: {
          boxShadow: "0 0 1px 1px black, 0 1px 1px black",
        },
      },
      variants: {
        outline: {
          borderColor: "green",
        },
      },
      defaultProps: {
        variant: "outline",
      },
    },
  },
});

export default theme;
