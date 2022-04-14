import "./Header.css";
import {
  Box,
  Flex,
  Spacer,
  Stack,
  Container,
  Image,
  Link,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Punchline } from "./Punchline";
import { NavLink } from "react-router-dom";
import { openSeaCollection } from "../utils/links";

function Header() {
  return (
    <Container
      marginLeft={{ base: "1%", md: "auto" }}
      maxWidth={{ md: "130ch" }}
      marginBottom={5}
      marginTop={5}
    >
      <Box
        position="absolute"
        right="0"
        backgroundColor="white"
        display={{ base: "block", md: "none" }}
      >
        <Menu>
          <MenuButton as={Button}>Menu</MenuButton>
          <MenuList>
            <MenuItem>
              <Link href={openSeaCollection()} isExternal>
                OPENSEA
              </Link>
            </MenuItem>
            <MenuItem>
              <NavLink to="/about">ABOUT</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/rules">RULES</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/prize">PRIZE</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/ties">TIES</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/peace">PEACE</NavLink>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Flex direction="row">
        <Flex direction={{ base: "column", md: "row" }}>
          <Box>
            <NavLink to="/">
              <Image
                width={140}
                margin={{ base: "auto", md: 0 }}
                src="/logo_cold.png"
              />
            </NavLink>
          </Box>
          <Stack
            margin="auto"
            align="stretch"
            justifyContent="left"
            fontSize={{ base: "10px", md: "1em" }}
          >
            <Punchline color="#B500D1">
              Welcome to the first 100% on-chain Tic Tac Toe NFT game.
            </Punchline>
            <Punchline color="#4500AD">
              Reach level 5 to claim the final prize.
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
          display={{ base: "none", md: "block" }}
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
