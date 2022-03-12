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
import NewBoard from "../NewBoard/NewBoard";
import Play from "../Play/Play";
import Challenge from "../Challenge/Challenge";

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
      {/*<NewBoard />*/}
      {/*<Challenge />*/}
      <Play />

      <SimpleGrid columns={10} gap={2}>
        {[...Array(70).keys()].map((i) => {
          return (
            <GridItem colStart={i % 10} rowStart={Math.floor(i / 10 + 4)}>
              <AspectRatio ratio={1}>
                <Box borderColor="black" borderWidth={2}>
                  <Image src={"/dapp/boards/board_" + i + ".svg"}></Image>
                </Box>
              </AspectRatio>
            </GridItem>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}

export default Body;
