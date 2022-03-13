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
} from "@chakra-ui/react";
import { Title } from "./Title";
import { useEffect, useState } from "react";
import NewBoard from "../NewBoard/NewBoard";
import Play from "../Play/Play";
import Challenge from "../Challenge/Challenge";
import Mint from "../Mint/Mint";
import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";

type BodyProps = {
  provider: JsonRpcProvider | undefined;
  signer: JsonRpcSigner | undefined;
};

function Body(props: BodyProps) {
  const [provider, setProvider] = useState<JsonRpcProvider>();
  const [signer, setSigner] = useState<JsonRpcSigner>();

  useEffect(() => {
    setProvider(props.provider);
  }, [props.provider]);

  useEffect(() => {
    setSigner(props.signer);
  }, [props.signer]);

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
              <Box>
                <Image src={"/dapp/boards/board_" + i + ".svg"}></Image>
              </Box>

              <Mint
                tokenId={i}
                minted={false}
                provider={provider}
                signer={signer}
              />
            </GridItem>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}

export default Body;
