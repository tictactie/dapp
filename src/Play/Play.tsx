import {
  SimpleGrid,
  AspectRatio,
  Flex,
  Image,
  Box,
  GridItem,
  Input,
  Text,
  Button,
  VStack,
} from "@chakra-ui/react";
import { Contract } from "ethers";
import { useEffect, useState } from "react";
import useImageSVG from "../hooks/useImageSVG";

type PlayProps = {
  contract: Contract | undefined;
  tokenId: number;
};

function Play(props: PlayProps) {
  const [contract, setContract] = useState<Contract>();
  const [tokenId, setTokenId] = useState<number>();
  const [expiryBlock, setExpiryBlock] = useState<number>();
  const [opponent, setOpponent] = useState<number>();
  const imageSVG = useImageSVG(contract, tokenId);

  useEffect(() => {
    setContract(props.contract);
  }, [props.contract]);

  useEffect(() => {
    setTokenId(props.tokenId);
  }, [props.tokenId]);

  useEffect(() => {
    (async () => {
      console.log("effect");
      if (contract && tokenId) {
        await fetchExpiryBlock(contract, tokenId);
      }
    })();
  }, [tokenId, contract]);

  useEffect(() => {
    (async () => {
      if (contract && opponent) {
        await fetchOpponent(contract, opponent);
      }
    })();
  }, [opponent, contract]);

  async function fetchExpiryBlock(contract: Contract, tokenId: number) {
    const response = await contract.expiryBlock(tokenId);
    setExpiryBlock(response.toNumber());
  }

  async function fetchOpponent(contract: Contract, tokenId: number) {
    const response = await contract.opponent(tokenId);
    setOpponent(response.toNumber());
  }

  return (
    <Box>
      {imageSVG && (
        <SimpleGrid columns={10} gap={2}>
          <GridItem colStart={4} rowStart={0} colSpan={2} rowSpan={2}>
            <AspectRatio ratio={1}>
              <span dangerouslySetInnerHTML={{ __html: imageSVG }} />
            </AspectRatio>
          </GridItem>
          <GridItem colStart={6} colSpan={2} rowSpan={1}>
            <VStack>
              <Text
                backgroundColor="rgba(255,255,255,0.8)"
                height="30px"
                fontSize="xl"
              >
                {expiryBlock}
              </Text>
              <Button
                backgroundColor="rgba(255,255,255,0.8)"
                colorScheme="black"
                variant="outline"
                height="40px"
                width="100%"
              >
                PLAY
              </Button>
            </VStack>
          </GridItem>

          <GridItem colStart={6} colSpan={2} rowSpan={1}>
            <Flex>
              <Image height="100px" src={"/dapp/sample.svg"}></Image>
              <Input
                backgroundColor="rgba(255,255,255,0.8)"
                borderColor="black"
                height="100px"
                placeholder="A3"
              />
            </Flex>
          </GridItem>
        </SimpleGrid>
      )}
    </Box>
  );
}

export default Play;
