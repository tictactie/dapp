import "./Body.css";
import {
  SimpleGrid,
  Box,
  AspectRatio,
  Flex,
  Spacer,
  Button,
  Image,
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
        {[...Array(64).keys()].map((i) => {
          return (
            <Box>
              <AspectRatio ratio={1}>
                <Box>
                  <Image src={"/dapp/boards/board_" + i + ".svg"}></Image>
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
