import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/index";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      {/*
      <Box
      animation={colorShiftAnimation}
      background="linear-gradient(270deg, #FF0000, #FF8E00, #FFFF00, #008E00, #00C0C0, #400098, #8E008E);"
      backgroundSize="400% 400%"
      >*/}
      <App />
      {/*</Box>*/}
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
