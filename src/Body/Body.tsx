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
import NewBoard from "../NewBoard/NewBoard";
import Play from "../Play/Play";
import Challenge from "../Challenge/Challenge";
import Mint from "../Mint/Mint";
import { Contract } from "ethers";
import useSupply from "../hooks/useSupply";

type BodyProps = {
  contract: Contract | undefined;
};

function Body(props: BodyProps) {
  const [contract, setContract] = useState<Contract>();
  const [supply] = useSupply(contract);

  useEffect(() => {
    (async () => {
      setContract(props.contract);
    })();
  }, [props.contract]);

  function isMinted(i: number) {
    return (BigInt(supply) & (BigInt(1) << BigInt(i))) != BigInt(0);
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
      <Play contract={contract} tokenId={1} />

      <SimpleGrid columns={10} gap={2}>
        {[...Array(70).keys()].map((i) => {
          return (
            <GridItem colStart={i % 10} rowStart={Math.floor(i / 10 + 4)}>
              <Box>
                <Image src={"/dapp/boards/board_" + i + ".svg"}></Image>
              </Box>

              <Mint tokenId={i} minted={isMinted(i)} contract={contract} />
            </GridItem>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}

export default Body;
