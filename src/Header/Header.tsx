import { useState, useEffect } from "react";
import "./Header.css";
import useCachedConnection from "../hooks/useCachedConnection";
import useEthereum from "../hooks/useEthereum";
import UserInfo from "../UserInfo/UserInfo";
import NetworkStatus from "../NetworkStatus/NetworkStatus";
import Mint from "../Mint/Mint";
import {
  SimpleGrid,
  Box,
  AspectRatio,
  Container,
  Flex,
  Spacer,
  Stack,
} from "@chakra-ui/react";

function Header() {
  return (
    <Box>
      <Flex>
        <Spacer />
        <Box p={5}>ABOUT</Box>
        <Box p={5}>WHO WE ARE</Box>
        <Box p={5}>TIC TAC TIPS</Box>
        <Box p={5}>HELP UKRAINE</Box>
      </Flex>
      <Flex>
        <Box mr={3} ml={3}>
          Logo
        </Box>
        <Stack align="stretch" justifyContent="left" ml={3}>
          <Box display="flex">
            # the first NFT game where you own the board.
          </Box>
          <Box display="flex">
            # the first game where winning is fun, losing is fun and a tie is
            fun too.
          </Box>
          <Box display="flex">
            # the first thing you should do is to mint you board, and support
            world peace.
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
}

export default Header;
