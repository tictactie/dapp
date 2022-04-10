import "./Header.css";
import {
  Box,
  Flex,
  Spacer,
  Stack,
  Container,
  Image,
  Link,
} from "@chakra-ui/react";
import { Punchline } from "./Punchline";
import { NavLink } from "react-router-dom";
import { openSeaCollection } from "../utils/links";

function Header() {
  return (
    <Container maxWidth="130ch" marginBottom={5} marginTop={5}>
      <Flex direction="row">
        <Flex>
          <Box mr={3} ml={3}>
            <NavLink to="/">
              <Image width={140} src="/logo_cold.png" />
            </NavLink>
          </Box>
          <Stack align="stretch" justifyContent="left" ml={4}>
            <Box borderColor="black"></Box>
            <Punchline color="#B500D1">
              Welcome to the first 100% on-chain Tic Tac Toe NFT game.
            </Punchline>
            <Punchline color="#4500AD">
              Put together a string of 5 wins to get a juicy prize.
            </Punchline>
            <Punchline color="#008F07">
              Unlock the unique NFT Tie collection... By making ties!
            </Punchline>
            <Punchline color="#FF8C00">
              Mint your board and get on board. Make ties, not war.
            </Punchline>
          </Stack>
        </Flex>
        <Spacer />
        <Flex
          direction="column"
          textAlign="right"
          fontWeight="bold"
          color=""
          fontSize="1.1em"
          lineHeight="0.5em"
          style={{
            textDecoration: "underline dotted",
          }}
        >
          <Spacer />
          <Box p={2}>
            <Link href={openSeaCollection()} isExternal>
              OPENSEA
            </Link>
          </Box>
          <Box p={2}>
            <NavLink to="/about">ABOUT</NavLink>
          </Box>
          <Box p={2}>
            <NavLink to="/rules">RULES</NavLink>
          </Box>
          <Box p={2}>
            <NavLink to="/prize">PRIZE</NavLink>
          </Box>
          <Box p={2}>
            <NavLink to="/ties">TIES</NavLink>
          </Box>
          <Box p={2}>
            <NavLink to="/peace">PEACE</NavLink>
          </Box>
        </Flex>
      </Flex>
    </Container>
  );
}

export default Header;
