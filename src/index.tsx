import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/App";
import reportWebVitals from "./reportWebVitals";
import { Box, ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/index";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import About from "./static/About";
import Rules from "./static/Rules";
import Ties from "./static/Ties";
import Prize from "./static/Prize";
import Peace from "./static/Peace";
import Header from "./Header/Header";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Router>
        <Header />
        <Box height="3px" bgColor="#B500D1" />
        <Box height="3px" bgColor="#4500AD" />
        <Box height="3px" bgColor="#00BFE6" />
        <Box height="3px" bgColor="#008F07" />
        <Box height="3px" bgColor="#FFD900" />
        <Box height="3px" bgColor="#FF8C00" />
        <Box height="3px" bgColor="#F50010" />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/game" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/prize" element={<Prize />} />
          <Route path="/ties" element={<Ties />} />
          <Route path="/peace" element={<Peace />} />
        </Routes>
      </Router>
      {/*</Box>*/}
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
