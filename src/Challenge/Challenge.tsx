import { Input, Button, Container } from "@chakra-ui/react";
import { Contract } from "ethers";
import { useEffect, useState } from "react";
import { interact } from "../utils/tictactie";
import { countryToId } from "../utils/countries";
import useErrorMessage from "../hooks/useErrorMessage";

type ChallengeProps = {
  contract: Contract | undefined;
  tokenId: number;
  setOpponent: (opponentId: number) => void;
};

function Challenge(props: ChallengeProps) {
  const [contract, setContract] = useState<Contract>();
  const [tokenId, setTokenId] = useState<number>();
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState<string | undefined>();
  useErrorMessage(error);
  const [country, setCountry] = useState("");
  const handleChange = (event: any) => setCountry(event.target.value);
  const [inputInvalid, setInputInvalid] = useState(false);

  useEffect(() => {
    setContract(props.contract);
  }, [props.contract]);

  useEffect(() => {
    setTokenId(props.tokenId);
  }, [props.tokenId]);

  async function handleClick() {
    if (country) {
      setInputInvalid(false);
      const opponentId = countryToId(country);
      await challenge(opponentId);
    } else {
      setInputInvalid(true);
    }
  }

  async function challenge(opponentId: number) {
    if (contract && tokenId) {
      setError(undefined);
      setWaiting(false);

      interact(
        () => setWaiting(true),
        (error) => setError(error),
        () => {
          setWaiting(false);
          props.setOpponent(opponentId);
        },
        async () => {
          return await contract.challenge(tokenId, opponentId, {
            from: await contract.signer.getAddress(),
          });
        }
      );
    }
  }

  return (
    <Container fontSize={{ base: "30px", md: "1em" }}>
      Wait to be challenged.
      <br />
      Or{" "}
      <Button
        onClick={handleClick}
        isLoading={waiting}
        fontSize={{ base: "30px", md: 12 }}
        width="7em"
        height={{ base: "40px", md: "20px" }}
      >
        challenge
      </Button>{" "}
      a{" "}
      <Input
        isInvalid={inputInvalid}
        value={country}
        onChange={handleChange}
        borderColor="transparent"
        borderBottomColor="black"
        height={{ base: "80px", md: "20px" }}
        fontSize={{ base: "30px", md: 12 }}
        width="13em"
        textAlign="center"
        placeholder="Country or Flag"
      ></Input>
    </Container>
  );
}

export default Challenge;
