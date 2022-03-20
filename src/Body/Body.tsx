import "./Body.css";
import {
  SimpleGrid,
  Box,
  Flex,
  Spacer,
  Image,
  Text,
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
import useUserMinted from "../hooks/useUserBoard";
import UserBoardInput from "../UserBoardInput/UserBoardInput";
import { useLocalStorage } from "../hooks/useLocalStorage";
import MintTie from "../MintTie/MintTie";
import MintFinal from "../MintFinal/MintFinal";

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
  const minted = useUserMinted(contract, justMinted);
  const [opponent, setOpponent] = useState<number>();
  const [boardSVGs, setBoardSVGs] = useState<string[] | undefined>();

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
      if (
        address &&
        contract &&
        tokenId &&
        !(await isOwnerOf(contract, tokenId))
      )
        setTokenId(undefined);
    })();
  }, [address]);

  useEffect(() => {
    (async () => {
      if (
        contract &&
        tokenId &&
        address &&
        (await isOwnerOf(contract, parseInt(tokenId)))
      )
        window.localStorage.setItem(address, JSON.stringify(tokenId));

      if (
        contract &&
        tokenId !== null &&
        tokenId !== undefined &&
        tokenId !== "undefined" &&
        !(await isOwnerOf(contract, parseInt(tokenId)))
      ) {
        window.localStorage.removeItem("tokenId");
      }
    })();
  }, [tokenId, address]);

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

  function renderInteractiveComponent() {
    if (minted && opponent && tokenId) {
      return (
        <Play opponentId={opponent} contract={contract} tokenId={tokenId} />
      );
    } else if (minted && tokenId) {
      return (
        <Challenge
          setOpponent={setOpponent}
          contract={contract}
          tokenId={tokenId}
        />
      );
    } else {
      // (minted) {
      return <UserBoardInput contract={contract} setTokenId={setTokenId} />;
    } /*else {
      return (
        <Text
          backgroundColor="rgba(255,255,255,0.8)"
          height="30px"
          fontSize="l"
        >
          Get a Board. Mint it or <a href="https://opensea.io">Buy</a> it.
        </Text>
      );
    }*/
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

      {/*<HStack spacing={1}>
        <MintTie contract={contract} tokenId={tokenId} />
        {renderInteractiveComponent()}
        <MintFinal contract={contract} tokenId={tokenId} />
      </HStack>*/}

      <Flex>
        <Box w="25%">
          <MintTie contract={contract} tokenId={tokenId} />
        </Box>
        <Spacer />
        <Box w="50%">{renderInteractiveComponent()}</Box>
        <Spacer />
        <Box w="25%">
          <MintFinal contract={contract} tokenId={tokenId} />
        </Box>
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
                    <span dangerouslySetInnerHTML={{ __html: boardSVGs[i] }} />
                  </AspectRatio>
                )}
                {!boardSVGs && (
                  <Image src={"/dapp/boards/board_" + i + ".svg"}></Image>
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
