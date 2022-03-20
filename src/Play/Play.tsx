import {
  SimpleGrid,
  AspectRatio,
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
import { isTurn, interact } from "../utils/tictactie";
import { Title } from "../Body/Title";

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
  const [coordinate, setCoordinate] = useState<number>();
  const [isAccountTurn, setIsAccountTurn] = useState(false);
  const [round, setRound] = useState(0);
  const imageSVG = useImageSVG(contract, tokenId, round);
  const [waiting, setWaiting] = useState(false);
  const [inputInvalid, setInputInvalid] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const handleChange = (event: any) => setCoordinate(event.target.value);

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

  async function handleClick() {
    if (coordinate) {
      setInputInvalid(false);
      await play(coordinate);
    } else {
      setInputInvalid(true);
    }
  }

  async function play(coordinate: number) {
    if (contract && tokenId) {
      setWaiting(false);
      setError(undefined);
      interact(
        () => setWaiting(true),
        (e) => setError(e),
        () => {
          setExpiresInSeconds(0);
          setRound(round + 1);
        },
        async () => {
          return await contract.play(tokenId, 1 << coordinate);
        }
      );
    }
  }

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
        </VStack>
      );
    } else {
      return (
        <VStack>
          <Box>Opponent did not move yet. Come back later.</Box>
        </VStack>
      );
    }
  }

  return (
    <Box>
      {opponent && (
        <Title>
          You are playing against {tokenIdToCountry(opponent)}{" "}
          {tokenIdToFlag(opponent)}
        </Title>
      )}

      <br />
      {imageSVG && expiresInSeconds !== undefined && tokenId && contract && (
        <SimpleGrid columns={9} gap={2} rowGap={1}>
          <GridItem colStart={0} rowStart={0} colSpan={4} rowSpan={3}>
            <AspectRatio ratio={1}>
              <span dangerouslySetInnerHTML={{ __html: imageSVG }} />
            </AspectRatio>
          </GridItem>
          <GridItem colStart={5} colSpan={5} rowSpan={1}>
            {renderPanel(expiresInSeconds)}
          </GridItem>
          <GridItem colStart={5} colSpan={3} rowStart={2} rowSpan={3}>
            <Image height="130px" src={"/dapp/sample.svg"}></Image>
          </GridItem>

          <GridItem colStart={8} colSpan={2} rowStart={2} rowSpan={1}>
            <Button
              isLoading={waiting}
              isDisabled={!isAccountTurn}
              onClick={handleClick}
              backgroundColor="rgba(255,255,255,0.8)"
              colorScheme="black"
              variant="outline"
              height="50px"
              width="100%"
            >
              {isAccountTurn ? "PLAY" : "WAIT"}
            </Button>
          </GridItem>
          <GridItem colStart={8} colSpan={2} rowStart={3} rowSpan={1}>
            <Input
              isInvalid={inputInvalid}
              backgroundColor="rgba(255,255,255,0.8)"
              borderColor="black"
              height="50px"
              marginTop="15%"
              placeholder="#"
              value={coordinate}
              onChange={handleChange}
            />
          </GridItem>
        </SimpleGrid>
      )}
      <br />
      {!waiting && error && <span>ERROR: {error}</span>}
    </Box>
  );
}

export default Play;
