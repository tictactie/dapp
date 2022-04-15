import { Input, Button, Container } from "@chakra-ui/react";
import { Contract } from "ethers";
import { useState } from "react";
import { countryToId } from "../utils/countries";
import { useAsync } from "../hooks/useAsync";
import useErrorMessage from "../hooks/useErrorMessage";

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
  useErrorMessage(error);
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
          <b>Mint a board</b>. Already have one?
          <br />
          <Button
            onClick={async () => await handleClick()}
            fontSize={12}
            width="8em"
            height="22px"
          >
            Restore it
          </Button>{" "}
          <Input
            isInvalid={inputInvalid}
            value={country}
            onChange={handleChange}
            borderColor="transparent"
            borderBottomColor="black"
            height="20px"
            fontSize={12}
            width="13em"
            placeholder="Country or Flag"
          ></Input>{" "}
        </Container>
      );
    }
  }

  return renderContent();
}

export default SetBoard;
