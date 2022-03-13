import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, keyframes, Box } from "@chakra-ui/react";
import theme from "./theme/index";

const colorShift = keyframes`
  0%{background-position:0% 50%}
  100%{background-position:100% 50%}
`;

{
  /*
const colorShift = keyframes`
  0% {background: linear-gradient(270deg, #FF0000, #161fe2);}
  20% {background-color: hsl(33, 100%, 90%);}
  30% {background-color: hsl(60, 100%, 90%);}
  50% {background-color: hsl(120, 100%, 98%);}
  70% {background-color: hsl(180, 100%, 88%);}
  80% {background-color: hsl(265, 100%, 90%);}
  100% {background-color: hsl(300, 100%, 98%);}
`;
*/
}

const colorShiftAnimation = `${colorShift} infinite 10s ease alternate`;

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
