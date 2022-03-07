import "./Body.css";
import {
  SimpleGrid,
  Box,
  AspectRatio,
  Flex,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { Title } from "./Title";

function Body() {
  return (
    <Box>
      <Flex pb={5} pt={5}>
        <Title>Mint your board and get on board.</Title>
        <Spacer />
        <Title>There are 18 boards left</Title>
        <Title variant="negative" ml={5}>
          Mint yours!
        </Title>
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
