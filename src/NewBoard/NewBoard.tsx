import {
  SimpleGrid,
  Box,
  AspectRatio,
  Flex,
  Image,
  GridItem,
  Input,
  Text,
  Button,
  VStack,
} from "@chakra-ui/react";

function NewBoard() {
  return (
    <SimpleGrid columns={10} gap={2}>
      <GridItem colStart={4} rowStart={0} colSpan={2} rowSpan={2}>
        <AspectRatio ratio={1}>
          <Box borderColor="black" borderWidth={3}>
            ?
          </Box>
        </AspectRatio>
      </GridItem>
      <GridItem colStart={6} colSpan={2} rowSpan={1}>
        <VStack>
          <Button
            colorScheme="black"
            variant="outline"
            height="40px"
            width="100%"
          >
            MINT BOARD
          </Button>
          <Input
            borderColor="black"
            height="100px"
            placeholder="NFT BOARD NUMBER"
          />
        </VStack>
      </GridItem>
    </SimpleGrid>
  );
}

export default NewBoard;

{
  /*
  
  <GridItem colStart={5} rowStart={1} colSpan={1} rowSpan={1}>
          <AspectRatio ratio={1}>
            <Image src={"/dapp/sample.svg"}></Image>
          </AspectRatio>
        </GridItem>
        <GridItem colStart={6} rowStart={1} colSpan={1} rowSpan={1}>
          <AspectRatio ratio={1}>
            <VStack>
              <Input display="flex" placeholder="A3" />
            </VStack>
          </AspectRatio>
        </GridItem>
        <GridItem colStart={5} rowStart={2} colSpan={2} rowSpan={1}>
          <AspectRatio ratio={1}>
            <Button display="flex" width="100%">
              PLAY
            </Button>
          </AspectRatio>
        </GridItem>
        
  */
}
