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
  components: {
    PunchlineComponent,
    TitleComponent,
  },
});

export default theme;
