import { Input, Text, Button, VStack } from "@chakra-ui/react";
import { Contract } from "ethers";
import { useEffect, useState } from "react";

type UserBoardInputProps = {
  contract: Contract | undefined;
  setTokenId: (tokenId: number) => void;
};

function UserBoardInput(props: UserBoardInputProps) {
  const [tokenId, setTokenId] = useState<number>(0);
  const handleChange = (event: any) => setTokenId(event.target.value);
  const [address, setAddress] = useState<string>();
  const [contract, setContract] = useState(props.contract);
  const [text, setText] = useState("Type the ID of your board");

  useEffect(() => {
    (async () => {
      if (contract) {
        setContract(contract);
        setAddress(await contract.signer.getAddress());
      }
    })();
  }, [contract]);

  async function handleClick() {
    if (tokenId) {
      try {
        const owner = await contract?.ownerOf(tokenId);
        if (owner === address) {
          props.setTokenId(tokenId);
        } else {
          setText("Not your board!");
        }
      } catch (e) {
        setText("Non existing token Id");
      }
    }
  }

  return (
    <VStack width="30%" margin="auto">
      <Text backgroundColor="rgba(255,255,255,0.8)" height="30px" fontSize="l">
        {text}
      </Text>
      <Input
        value={tokenId}
        onChange={handleChange}
        backgroundColor="rgba(255,255,255,0.8)"
        borderColor="black"
        height="50px"
        placeholder="Token Id"
        type="number"
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
