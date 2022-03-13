import { useState, useEffect } from "react";
import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import "./Mint.css";
import { Button, useProps } from "@chakra-ui/react";
import { Contract, ContractReceipt, ethers, BigNumber } from "ethers";

type MintProps = {
  tokenId: number;
  minted: boolean;
  provider: JsonRpcProvider | undefined;
  signer: JsonRpcSigner | undefined;
};

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS!;

const ABI = [
  "function mint(uint256) public payable",
  "function tokenURI(uint256) public view returns (string memory)",
  "event Transfer(address indexed, address indexed, uint)",
];

function Mint(props: MintProps) {
  const [contract, setContract] = useState<Contract>();
  const [provider, setProvider] = useState<JsonRpcProvider>();
  const [address, setAddress] = useState<string>();
  const [minting, setMinting] = useState(false);
  const [tokenId, setTokenId] = useState<number>(0);
  const [minted, setMinted] = useState<boolean>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    setProvider(props.provider);
  }, [props.provider]);

  useEffect(() => {
    setMinted(props.minted);
  }, [props.minted]);

  useEffect(() => {
    setTokenId(props.tokenId);
  }, [props.tokenId]);

  useEffect(() => {
    (async () => {
      const signer = props.signer;
      setAddress(await signer?.getAddress());
      const contract = signer
        ? new Contract(CONTRACT_ADDRESS, ABI, signer)
        : undefined;
      setContract(contract);
    })();
  }, [props.signer, CONTRACT_ADDRESS, ABI]);

  useEffect(() => {
    (async () => {
      if (contract && tokenId) {
        const metadataResponse = await fetch(await contract?.tokenURI(tokenId));
        const metadata = await metadataResponse.json();
      }
    })();
  }, [tokenId]);

  async function mint(tokenId: number) {
    if (contract) {
      try {
        setError(undefined);
        const tx = await contract.mint(tokenId, {
          value: ethers.utils.parseEther("0.1"),
          from: address,
        });

        setMinting(true);
        const receipt = await tx.wait(1);
        setMinting(false);
      } catch (e) {
        if (typeof e === "string") {
          setError(e);
        } else if (e instanceof Error) {
          setError(e.message);
        }
      }
    }
  }

  return (
    <div className="Mint">
      <Button
        onClick={() => mint(tokenId)}
        height="20px"
        width="100%"
        isDisabled={minted || !address}
        isLoading={minting}
      >
        MINT!
      </Button>
      <br />
      {!minting && error && <span>ERROR: {error}</span>}
    </div>
  );
}

export default Mint;
