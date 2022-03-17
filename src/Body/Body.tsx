import "./Body.css";
import {
  SimpleGrid,
  Box,
  Flex,
  Spacer,
  Image,
  GridItem,
} from "@chakra-ui/react";
import { Title } from "./Title";
import { useEffect, useState } from "react";
import Play from "../Play/Play";
import Challenge from "../Challenge/Challenge";
import Mint from "../Mint/Mint";
import { Contract } from "ethers";
import { getSupply } from "../utils/supply";
import useOpponent from "../hooks/useOpponent";
import useUserMinted from "../hooks/useUserBoard";
import UserBoardInput from "../UserBoardInput/UserBoardInput";

type BodyProps = {
  contract: Contract | undefined;
};

function Body(props: BodyProps) {
  const [contract, setContract] = useState<Contract>();
  const [supply, setSupply] = useState();
  const [tokenId, setTokenId] = useState<number>();
  const [justMinted, setJustMinted] = useState(false);
  const minted = useUserMinted(contract, justMinted);
  const opponent = useOpponent(contract, tokenId);

  useEffect(() => {
    (async () => {
      setContract(props.contract);
      setJustMinted(false);
      setTokenId(undefined);
    })();
  }, [props.contract]);

  useEffect(() => {
    setJustMinted(false);
  }, [tokenId]);

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
      return <Play contract={contract} tokenId={tokenId} />;
    } else if (minted && tokenId) {
      return <Challenge contract={contract} tokenId={tokenId} />;
    } else if (minted) {
      return <UserBoardInput contract={contract} setTokenId={setTokenId} />;
    } else {
      return null;
    }
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

      {renderInteractiveComponent()}

      <SimpleGrid columns={10} gap={2}>
        {[...Array(70).keys()].map((i) => {
          return (
            <GridItem
              colStart={(i % 10) + 1}
              key={i}
              rowStart={Math.floor(i / 10 + 4)}
            >
              <Box>
                <Image src={"/dapp/boards/board_" + i + ".svg"}></Image>
              </Box>

              <Mint
                tokenId={i}
                minted={isMinted(i)}
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
