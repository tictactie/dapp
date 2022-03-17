import {
  SimpleGrid,
  AspectRatio,
  Flex,
  Image,
  Box,
  GridItem,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";
import { Contract } from "ethers";
import { useEffect, useState } from "react";
import useImageSVG from "../hooks/useImageSVG";
import { tokenIdToFlag, tokenIdToCountry } from "../utils/countries";
import Countdown from "react-countdown";
import { isTurn } from "../utils/tictactie";

type PlayProps = {
  contract: Contract | undefined;
  tokenId: number;
  opponentId: number;
};

function Play(props: PlayProps) {
  const [contract, setContract] = useState<Contract>();
  const [tokenId, setTokenId] = useState<number>();
  const [expiresInSeconds, setExpiresInSeconds] = useState<number>();
  const [opponent, setOpponent] = useState<number>();
  const [isAccountTurn, setIsAccountTurn] = useState(false);
  const imageSVG = useImageSVG(contract, tokenId);

  useEffect(() => {
    setContract(props.contract);
  }, [props.contract]);

  useEffect(() => {
    setTokenId(props.tokenId);
  }, [props.tokenId]);

  useEffect(() => {
    setOpponent(props.opponentId);
  }, [props.opponentId]);

  useEffect(() => {
    (async () => {
      if (contract && tokenId) {
        await fetchExpiryBlock(contract, tokenId);
        await updateTurn(contract, tokenId);
      }
    })();
  }, [tokenId, contract]);

  useEffect(() => {
    (async () => {
      if (contract && tokenId) await updateTurn(contract, tokenId);
    })();
  }, [expiresInSeconds, contract, tokenId]);

  async function updateTurn(contract: Contract, tokenId: number) {
    setIsAccountTurn(await isTurn(contract, tokenId));
  }

  async function fetchExpiryBlock(contract: Contract, tokenId: number) {
    const epxirationBlock = await contract.expiryBlock(tokenId);
    const currentBlock = await contract.provider.getBlockNumber();
    setExpiresInSeconds((epxirationBlock.toNumber() - currentBlock) * 13);
  }

  function renderPanel(expiresInSeconds: number) {
    if (isAccountTurn) {
      return (
        <VStack>
          <Box>
            Your turn expires in:{" "}
            <Countdown
              onComplete={() => setExpiresInSeconds(0)}
              date={Date.now() + expiresInSeconds * 1000}
            />
          </Box>
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
      );
    } else {
      return (
        <VStack>
          <Box>Opponent did not move yet. Come back later.</Box>
          <Button
            isDisabled={true}
            backgroundColor="rgba(255,255,255,0.8)"
            colorScheme="black"
            variant="outline"
            height="40px"
            width="100%"
          >
            WAIT
          </Button>
        </VStack>
      );
    }
  }

  return (
    <Box>
      {opponent && (
        <Box>
          You are playing against {tokenIdToCountry(opponent)}{" "}
          {tokenIdToFlag(opponent)}
        </Box>
      )}

      <br />
      {imageSVG && expiresInSeconds && tokenId && contract && (
        <SimpleGrid columns={10} gap={2}>
          <GridItem colStart={4} rowStart={0} colSpan={2} rowSpan={2}>
            <AspectRatio ratio={1}>
              <span dangerouslySetInnerHTML={{ __html: imageSVG }} />
            </AspectRatio>
          </GridItem>
          <GridItem colStart={6} colSpan={2} rowSpan={1}>
            {renderPanel(expiresInSeconds)}
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
