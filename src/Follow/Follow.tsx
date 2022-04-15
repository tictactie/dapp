import {
  Box,
  Container,
  Flex,
  Link,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function FollowUs() {
  return (
    <VStack>
      <Text>
        <b>Follow us!</b>
      </Text>
      <Flex direction={{ base: "column", md: "row" }}>
        <Box padding="5px" margin="5px" borderColor="#B500D1" borderWidth="2px">
          <Link href="https://twitter.com/tictactienft">
            TicTacTie @tictactienft
          </Link>
        </Box>
        <Box padding="5px" margin="5px" borderColor="#4500AD" borderWidth="2px">
          <Link href="https://twitter.com/the_innerspace">
            Inner Space @the_innerspace
          </Link>
        </Box>
        <Box padding="5px" margin="5px" borderColor="#F50010" borderWidth="2px">
          <Link href="https://twitter.com/delirium_tre">
            Delirium @delirium_tre
          </Link>
        </Box>
      </Flex>
    </VStack>
  );
}

export default FollowUs;
