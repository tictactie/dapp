import "./Header.css";
import { Box, Flex, Spacer, Stack } from "@chakra-ui/react";
import { Punchline } from "./Punchline";

function Header() {
  return (
    <Box backgroundColor="lightgray" p={5}>
      <Flex>
        <Spacer />
        <Box p={2}>ABOUT</Box>
        <Box p={2}>TIES</Box>
        <Box p={2}>TIC TAC TIPS</Box>
        <Box p={2}>BRING PEACE</Box>
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
