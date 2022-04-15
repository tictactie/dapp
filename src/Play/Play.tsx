import {
  Image,
  Flex,
  Input,
  Button,
  Spacer,
  Container,
  Box,
} from "@chakra-ui/react";
import { Contract, ContractReceipt } from "ethers";
import { useEffect, useState } from "react";
import {
  isTurn,
  interact,
  getDidWinEvent,
  getDidTieEvent,
} from "../utils/tictactie";
import useErrorMessage from "../hooks/useErrorMessage";

type PlayProps = {
  contract: Contract | undefined;
  tokenId: number;
  round: number;
  setRound: (round: number) => void;
  isAccountTurn: boolean;
  setIsAccountTurn: (isAccountTurn: boolean) => void;
  setOpponent: (opponentId: number | undefined) => void;
};

function Play(props: PlayProps) {
  const [contract, setContract] = useState<Contract>();
  const [tokenId, setTokenId] = useState<number>();
  const [coordinate, setCoordinate] = useState<number>();
  const [waiting, setWaiting] = useState(false);
  const [inputInvalid, setInputInvalid] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const handleChange = (event: any) => setCoordinate(event.target.value);
  useErrorMessage(error);

  useEffect(() => {
    setContract(props.contract);
  }, [props.contract]);

  useEffect(() => {
    setTokenId(props.tokenId);
  }, [props.tokenId]);

  useEffect(() => {
    (async () => {
      if (contract && tokenId) {
        await updateTurn(contract, tokenId);
      }
    })();
  }, [tokenId, contract]);

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
        (e) => {
          setError(e);
        },
        async (receipt: ContractReceipt) => {
          const winEvent = getDidWinEvent(contract, receipt);
          const tieEvent = getDidTieEvent(contract, receipt);
          if (!winEvent && !tieEvent) {
            props.setRound(props.round + 1);
          } else {
            props.setRound(0);

            if (winEvent) {
              props.setOpponent(undefined);
            }
          }
          setWaiting(false);
          setError(undefined);
          setCoordinate(undefined);
          return await updateTurn(contract, tokenId);
        },
        async () => {
          return await contract.play(tokenId, 1 << coordinate);
        }
      );
    }
  }

  async function updateTurn(contract: Contract, tokenId: number) {
    props.setIsAccountTurn(await isTurn(contract, tokenId));
  }

  return (
    <Box className="mobilePlay">
      <Flex
        width="100%"
        display={{ base: "flex", md: "none" }}
        direction="column"
      >
        <Spacer />
        <Flex height="200px">
          <Image width="50%" src={"/sample.svg"}></Image>{" "}
          <Input
            isInvalid={inputInvalid}
            borderBottomColor="black"
            height="85%"
            width="50%"
            marginTop="15px"
            marginRight="15px"
            placeholder="#"
            value={coordinate || ""}
            onChange={handleChange}
          />
        </Flex>
        <Button
          isLoading={waiting}
          isDisabled={!props.isAccountTurn}
          onClick={handleClick}
          variant="outline"
          height="50px"
          width="100%"
        >
          {props.isAccountTurn ? "PLAY" : "WAIT"}
        </Button>
        <br />
      </Flex>
      <Flex display={{ base: "none", md: "flex" }} direction="column">
        <Spacer />
        <Image src={"/sample.svg"}></Image>{" "}
        <Input
          isInvalid={inputInvalid}
          borderBottomColor="black"
          height="50px"
          marginTop="15%"
          placeholder="#"
          value={coordinate || ""}
          onChange={handleChange}
        />
        <Button
          isLoading={waiting}
          isDisabled={!props.isAccountTurn}
          onClick={handleClick}
          variant="outline"
          height="50px"
          width="100%"
        >
          {props.isAccountTurn ? "PLAY" : "WAIT"}
        </Button>
        <br />
      </Flex>
    </Box>
  );
}

export default Play;
