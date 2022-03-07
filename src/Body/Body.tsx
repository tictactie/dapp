import "./Body.css";
import {
  SimpleGrid,
  Box,
  AspectRatio,
  Container,
  Flex,
  Spacer,
  Button,
} from "@chakra-ui/react";

function Body() {
  return (
    <Box>
      <Flex pb={5} pt={5}>
        <Box>Mint your board and get on board.</Box>
        <Spacer />
        <Box>There are 18 boards left</Box>
        <Box ml={5} bgColor="red">
          Mint yours!
        </Box>
      </Flex>

      <SimpleGrid columns={8} gap={2}>
        {Array(64)
          .fill(0)
          .map((_) => {
            return (
              <Box>
                <AspectRatio ratio={1}>
                  <Box borderColor="black" borderWidth={2}>
                    Hello
                  </Box>
                </AspectRatio>
                <Button width="100%" height="2ch" display="flex">
                  MINT!
                </Button>
              </Box>
            );
          })}
      </SimpleGrid>
    </Box>
  );
}

export default Body;
