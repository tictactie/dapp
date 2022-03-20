import { Input, Text, Button, Container } from "@chakra-ui/react";
import { Contract } from "ethers";
import { useState } from "react";
import { countryToId } from "../utils/countries";
import { useAsync } from "../hooks/useAsync";

type SetBoardProps = {
  contract: Contract | undefined;
  tokenId: number | undefined;
  setTokenId: (tokenId: number) => void;
};

function SetBoard(props: SetBoardProps) {
  const [country, setCountry] = useState("");
  const handleChange = (event: any) => setCountry(event.target.value);
  const [address, setAddress] = useState<string>();
  const [error, setError] = useState("");
  const [inputInvalid, setInputInvalid] = useState(false);
  useAsync(getAddress, setAddress);

  async function getAddress() {
    return await props.contract?.signer.getAddress();
  }

  async function handleClick() {
    if (country) {
      setInputInvalid(false);
      try {
        const tokenId = countryToId(country);
        const owner = await props.contract?.ownerOf(tokenId);
        if (owner === address) {
          props.setTokenId(tokenId);
        } else {
          setError("Not your board!");
        }
      } catch (e) {
        console.log(e);
        setError("Not your board!");
      }
    } else {
      setInputInvalid(true);
    }
  }

  function renderContent() {
    if (props.tokenId) {
      return <Container>Your board: {country}.</Container>;
    } else {
      return (
        <Container>
          Get a board. Already have one?
          <br />
          <Button
            onClick={async () => await handleClick()}
            fontSize={12}
            width="20%"
            height="22px"
          >
            Set it
          </Button>{" "}
          <Input
            isInvalid={inputInvalid}
            value={country}
            onChange={handleChange}
            borderColor="transparent"
            borderBottomColor="black"
            height="20px"
            fontSize={12}
            width="40%"
            placeholder="Country or Flag"
          ></Input>{" "}
          <Text color="red">{error}</Text>
        </Container>
      );
    }
  }

  return renderContent();
}

export default SetBoard;
