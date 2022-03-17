import { Input, Text, Button, VStack } from "@chakra-ui/react";
import { Contract } from "ethers";
import { useState } from "react";
import { countryToId } from "../utils/countries";
import { useAsync } from "../hooks/useAsync";

type UserBoardInputProps = {
  contract: Contract | undefined;
  setTokenId: (tokenId: number) => void;
};

function UserBoardInput(props: UserBoardInputProps) {
  const [country, setCountry] = useState("");
  const handleChange = (event: any) => setCountry(event.target.value);
  const [address, setAddress] = useState<string>();
  const [text, setText] = useState("Type the Country of your board");
  useAsync(getAddress, setAddress);

  async function getAddress() {
    return await props.contract?.signer.getAddress();
  }

  async function handleClick() {
    if (country) {
      console.log("DIOMERDA");
      console.log(country);
      try {
        const tokenId = countryToId(country);
        const owner = await props.contract?.ownerOf(tokenId);
        console.log(owner);
        if (owner === address) {
          props.setTokenId(tokenId);
        } else {
          setText("Not your board!");
        }
      } catch (e) {
        console.log(e);
        setText("Not your board!");
      }
    }
  }

  return (
    <VStack width="30%" margin="auto">
      <Text backgroundColor="rgba(255,255,255,0.8)" height="30px" fontSize="l">
        {text}
      </Text>
      <Input
        value={country}
        onChange={handleChange}
        backgroundColor="rgba(255,255,255,0.8)"
        borderColor="black"
        height="50px"
        placeholder="Country"
      />
      <Button
        backgroundColor="rgba(255,255,255,0.8)"
        colorScheme="black"
        variant="outline"
        height="40px"
        width="100%"
        onClick={async () => await handleClick()}
      >
        SET BOARD
      </Button>
    </VStack>
  );
}

export default UserBoardInput;
