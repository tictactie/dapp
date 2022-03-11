import "./Body.css";
import {
  SimpleGrid,
  Box,
  AspectRatio,
  Flex,
  Spacer,
  Button,
  Image,
  GridItem,
  Input,
  VStack,
} from "@chakra-ui/react";
import { Title } from "./Title";

function Body() {
  function renderRow(col: number, row: number, i: number) {
    console.log(col, row, i);
    return (
      <GridItem colStart={col} rowStart={row}>
        <AspectRatio ratio={1}>
          <Box>
            <Image src={"/dapp/boards/board_" + i + ".svg"}></Image>
          </Box>
        </AspectRatio>
        <Button width="100%" height="2ch" display="flex">
          MINT!
        </Button>
      </GridItem>
    );
  }

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

      <SimpleGrid columns={10} gap={2}>
        <GridItem colStart={4} rowStart={0} colSpan={3} rowSpan={3}>
          <AspectRatio ratio={1}>
            <Box>
              <Image src={"/dapp/boards/board_4.svg"}></Image>
            </Box>
          </AspectRatio>
        </GridItem>
        <GridItem colStart={7} rowStart={0} colSpan={1} rowSpan={1}>
          <AspectRatio ratio={1}>
            <Image src={"/dapp/sample.svg"}></Image>
          </AspectRatio>
        </GridItem>
        <GridItem colStart={7} rowStart={2} colSpan={1} rowSpan={1}>
          <AspectRatio ratio={1}>
            <VStack>
              <Input display="flex" placeholder="A3" />
              <Box width="100%">30m 40s</Box>
            </VStack>
          </AspectRatio>
        </GridItem>
        <GridItem colStart={7} rowStart={3} colSpan={1} rowSpan={1}>
          <AspectRatio ratio={1}>
            <Button display="flex" width="100%">
              PLAY
            </Button>
          </AspectRatio>
        </GridItem>

        {[...Array(70).keys()].map((i) => {
          return (
            <GridItem colStart={i % 10} rowStart={Math.floor(i / 10 + 4)}>
              <AspectRatio ratio={1}>
                <Box>
                  <Image src={"/dapp/boards/board_" + i + ".svg"}></Image>
                </Box>
              </AspectRatio>
              <Button width="100%" height="2ch" display="flex">
                MINT!
              </Button>
            </GridItem>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}

export default Body;
