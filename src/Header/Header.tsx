import "./Header.css";
import { Box, Flex, Spacer, Stack, Button } from "@chakra-ui/react";
import { Punchline } from "./Punchline";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <Box backgroundColor="lightgray" p={5}>
      <Flex>
        <Spacer />
        <Box p={2}>
          <NavLink to="/game">GAME</NavLink>
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
      <Flex>
        <Box mr={3} ml={3}>
          Logo
        </Box>
        <Stack align="stretch" justifyContent="left" ml={3}>
          <Punchline># the first NFT game where you own the board.</Punchline>
          <Punchline>
            # the first game where winning is fun, losing is fun and a tie is
            fun too.
          </Punchline>
          <Punchline>
            # the first thing you should do is to mint you board, and support
            world peace.
          </Punchline>
        </Stack>
      </Flex>
    </Box>
  );
}

export default Header;
