import { Box, Container } from "@chakra-ui/react";
import { Contract } from "ethers";
import { useEffect, useState } from "react";
import { tokenIdToFlag, tokenIdToCountry } from "../utils/countries";
import Countdown from "react-countdown";

type GameStatusProps = {
  contract: Contract | undefined;
  tokenId: number | undefined;
  opponentId: number | undefined;
  isAccountTurn: boolean;
};

function GameStatus(props: GameStatusProps) {
  const [expiresInSeconds, setExpiresInSeconds] = useState<number>();

  useEffect(() => {
    (async () => {
      if (props.contract && props.tokenId) {
        await fetchExpiryBlock(props.contract, props.tokenId);
      }
    })();
  }, [props.tokenId, props.contract]);
  useEffect(() => {
    console.log(expiresInSeconds);
  }, [expiresInSeconds]);

  async function fetchExpiryBlock(contract: Contract, tokenId: number) {
    const epxirationBlock = await contract.expiryBlock(tokenId);
    const currentBlock = await contract.provider.getBlockNumber();
    setExpiresInSeconds((epxirationBlock.toNumber() - currentBlock) * 13);
  }

  function renderContent() {
    if (props.tokenId && props.opponentId) {
      return (
        <Container>
          You are playing against {tokenIdToCountry(props.opponentId)}{" "}
          {tokenIdToFlag(props.opponentId)}
          <br />
          {props.isAccountTurn ? (
            <span>
              <b>Your</b> turn.
            </span>
          ) : (
            <span>
              <b>Opponent</b>'s turn.
            </span>
          )}{" "}
          Expires in{" "}
          {expiresInSeconds && (
            <Countdown
              onComplete={() => setExpiresInSeconds(0)}
              date={Date.now() + expiresInSeconds * 1000}
            />
          )}
          <br />
          {!props.isAccountTurn && "Come back later."}
        </Container>
      );
    } else {
      return <Box></Box>;
    }
  }

  return renderContent();
}

export default GameStatus;
