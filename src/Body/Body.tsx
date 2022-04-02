import "./Body.css";
import {
  SimpleGrid,
  Box,
  Flex,
  Spacer,
  Image,
  GridItem,
  AspectRatio,
} from "@chakra-ui/react";
import { Title } from "./Title";
import { useEffect, useState } from "react";
import Play from "../Play/Play";
import Challenge from "../Challenge/Challenge";
import Mint from "../Mint/Mint";
import { Contract, Signer } from "ethers";
import {
  getSupply,
  getOpponent,
  getBoardSVGs,
  isOwnerOf,
} from "../utils/tictactie";
import { useLocalStorage } from "../hooks/useLocalStorage";
import MintTie from "../MintTie/MintTie";
import MintFinal from "../MintFinal/MintFinal";
import Board from "../Board/Board";
import Tie from "../Tie/Tie";
import SetBoard from "../SetBoard/SetBoard";
import GameStatus from "../GameStatus/GameStatus";

type BodyProps = {
  contract: Contract | undefined;
  signer: Signer | undefined;
};

function Body(props: BodyProps) {
  const [contract, setContract] = useState<Contract>();
  const [address, setAddress] = useState<string>();
  const [supply, setSupply] = useState<number>();
  const [tokenId, setTokenId] = useLocalStorage("tokenId", undefined);
  const [justMinted, setJustMinted] = useState(false);
  const [abandoned, setAbandoned] = useState(false);
  const [isAccountTurn, setIsAccountTurn] = useState(false);
  const [round, setRound] = useState(0);
  const [opponent, setOpponent] = useState<number>();
  const [tieId, setTieId] = useState<number>();
  const [boardSVGs, setBoardSVGs] = useState<string[] | undefined>();
  const colors = [
    "violet",
    "purple",
    "blue",
    "green",
    "yellow",
    "orange",
    "red",
  ];

  useEffect(() => {
    (async () => {
      setContract(props.contract);

      if (props.contract) {
        setBoardSVGs(await getBoardSVGs(props.contract));
      }
    })();
  }, [props.contract]);

  useEffect(() => {
    (async () => {
      setJustMinted(false);

      const newAddress = await props.signer?.getAddress();

      setAddress(newAddress);
    })();
  }, [props.signer]);

  useEffect(() => {
    (async () => {
      if (contract && tokenId && address) {
        if (await isOwnerOf(contract, parseInt(tokenId))) {
          window.localStorage.setItem(address, JSON.stringify(tokenId));
        } else {
          window.localStorage.removeItem("tokenId");
          setTokenId(undefined);
        }
      }
    })();
  }, [tokenId, address, contract, setTokenId]);

  useEffect(() => {
    (async () => {
      if (contract && tokenId) {
        setOpponent(await getOpponent(contract, tokenId));
      }
    })();
  }, [tokenId, contract]);

  useEffect(() => {
    (async () => {
      setSupply(await getSupply(contract));
    })();
  }, [justMinted, contract]);

  function isMinted(i: number) {
    return (BigInt(supply || 0) & (BigInt(1) << BigInt(i))) !== BigInt(0);
  }

  function renderChallenge() {
    if (!opponent && tokenId)
      return (
        <Challenge
          contract={contract}
          tokenId={tokenId}
          setOpponent={setOpponent}
        />
      );
  }

  function renderPlay() {
    if (opponent && tokenId && !abandoned)
      return (
        <Flex direction="column" w="10%" paddingLeft={5}>
          <Play
            contract={contract}
            tokenId={tokenId}
            setRound={setRound}
            round={round}
            setIsAccountTurn={setIsAccountTurn}
            isAccountTurn={isAccountTurn}
            setOpponent={setOpponent}
          />
        </Flex>
      );
    else return <Box></Box>;
  }

  function renderSetBoard() {
    if (!tokenId)
      return (
        <SetBoard
          contract={contract}
          tokenId={tokenId}
          setTokenId={setTokenId}
        />
      );
  }

  return (
    <Box>
      <Flex pb={5} pt={5}>
        <Title>Mint your board and get on board.</Title>
        <Spacer />
        <Title>
          There are{" "}
          {70 -
            (BigInt(supply || 0)
              .toString(2)
              .match(/1/g)?.length || 0)}{" "}
          boards left
        </Title>
        <Title variant="negative" ml={5}>
          Mint yours!
        </Title>
      </Flex>
      <Flex>
        <Flex direction="column" w="20%">
          <Spacer />
          <Board contract={contract} tokenId={tokenId} round={round} />
        </Flex>
        {renderPlay()}
        <Flex textAlign="left" direction="column" lineHeight={6}>
          <Spacer />
          {renderSetBoard()}
          {renderChallenge()}
          <GameStatus
            contract={contract}
            tokenId={tokenId}
            isAccountTurn={isAccountTurn}
            opponentId={opponent}
            setRound={setRound}
            setAbandoned={setAbandoned}
            setOpponent={setOpponent}
          />
          <MintTie
            contract={contract}
            tokenId={tokenId}
            setTieId={setTieId}
            isAccountTurn={isAccountTurn}
          />
          <MintFinal
            contract={contract}
            tokenId={tokenId}
            isAccountTurn={isAccountTurn}
          />
        </Flex>
        <Spacer />
        <Tie contract={contract} tieId={tieId} />;
      </Flex>

      <SimpleGrid columns={10} gap={2}>
        {[...Array(70).keys()].map((i) => {
          const tokenId = i + 1;
          return (
            <GridItem
              colStart={(i % 10) + 1}
              key={i}
              rowStart={Math.floor(i / 10 + 4)}
            >
              <Box>
                {boardSVGs && (
                  <AspectRatio ratio={1}>
                    <span dangerouslySetInnerHTML={{ __html: boardSVGs![i] }} />
                  </AspectRatio>
                )}
                {!boardSVGs && (
                  <Image
                    src={
                      "/dapp/boards/board_" +
                      colors[Math.floor(i / 10)] +
                      "_" +
                      4 +
                      (Math.random() > 10.5 ? "_play" : "") +
                      ".svg"
                    }
                  ></Image>
                )}
              </Box>

              <Mint
                tokenId={tokenId}
                minted={isMinted(tokenId)}
                setJustMinted={setJustMinted}
                setTokenId={setTokenId}
                contract={contract}
              />
            </GridItem>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}

export default Body;
