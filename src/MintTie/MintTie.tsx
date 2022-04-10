import { useState, useEffect } from "react";
import { Box, Button, Container } from "@chakra-ui/react";
import { Contract } from "ethers";
import { interact, getMintableTies } from "../utils/tictactie";
import { parseEther } from "ethers/lib/utils";

type MintTieProps = {
  tokenId: number | undefined;
  contract: Contract | undefined;
  isAccountTurn: boolean; // to refresh
  donation: string;
};
function MintTie(props: MintTieProps) {
  const [contract, setContract] = useState<Contract>();
  const [minting, setMinting] = useState(false);
  const [tokenId, setTokenId] = useState<number>();
  const [mintableTies, setMintableTies] = useState<number>(0);
  const [error, setError] = useState<string>();

  useEffect(() => {
    (async () => {
      if (props.contract && props.tokenId)
        await fetchMintableTies(props.contract, props.tokenId);
      else {
        setMintableTies(0);
      }
    })();
  }, [props.contract, props.tokenId, props.isAccountTurn]);

  useEffect(() => {
    setContract(props.contract);
  }, [props.contract]);

  useEffect(() => {
    setTokenId(props.tokenId);
  }, [props.tokenId]);

  useEffect(() => {
    setTokenId(props.tokenId);
  }, [mintableTies]);

  async function fetchMintableTies(contract: Contract, tokenId: number) {
    const nTies = await getMintableTies(contract, tokenId);
    setMintableTies(nTies);
  }

  async function mint(tokenId: number) {
    if (contract) {
      interact(
        () => setMinting(true),
        (error) => setError(error),
        async () => {
          setMinting(false);
          await fetchMintableTies(props.contract!, props.tokenId!);
        },
        async () => {
          return await contract.mintTie(tokenId, {
            value: parseEther(props.donation),
            from: await contract.signer.getAddress(),
          });
        }
      );
    }
  }

  function renderContent() {
    if (mintableTies > 0) {
      return (
        <Container>
          <b>Hurray!</b> You have{" "}
          <Button
            onClick={() => mint(tokenId!)}
            fontSize={12}
            height="20px"
            isLoading={minting}
          >
            {mintableTies} ties to MINT!
          </Button>
          <br />
          {!minting && error && <span>ERROR: {error}</span>}
        </Container>
      );
    } else {
      return (
        <Container>
          <span style={{ color: "#008F07" }}>
            You have <b>0</b> mintable ties.
          </span>
          <br />
          <span style={{ color: "#FFD900" }}>Play and tie to earn them.</span>
        </Container>
      );
    }
  }

  return renderContent();
}

export default MintTie;
