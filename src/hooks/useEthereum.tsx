import { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { JsonRpcSigner } from "@ethersproject/providers/src.ts";
import { Contract } from "ethers";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS!;

const ABI = [
  "function mint(uint256) public payable",
  "function tokenURI(uint256) public view returns (string memory)",
  "function mintable() public view returns (uint256)",
  "event Transfer(address indexed, address indexed, uint)",
  "function opponent(uint256) public view returns (uint256)",
  "function expiryBlock(uint256) public view returns (uint256)",
];

function useEthereum(
  requiresConnection: boolean
): [
  provider: JsonRpcProvider | undefined,
  signer: JsonRpcSigner | undefined,
  network: string | undefined,
  contract: Contract | undefined,
  rejected: boolean
] {
  const INFURA_ID = process.env.REACT_APP_INFURA_ID;
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: INFURA_ID,
      },
    },
  };
  const web3Modal = new Web3Modal({
    network: "any",
    cacheProvider: true,
    providerOptions,
  });

  const [provider, setProvider] = useState<JsonRpcProvider | undefined>();
  const [contract, setContract] = useState<Contract>();
  const [signer, setSigner] = useState<JsonRpcSigner | undefined>();
  const [accounts, setAccounts] = useState<string[]>();
  const [rejected, setRejected] = useState<boolean>(false);
  const [chainId, setChainId] = useState<number>();
  const [network, setNetwork] = useState<string>();

  async function resetSigner() {
    try {
      const newSigner = provider?.getSigner();
      await newSigner?.getAddress();
      setSigner(newSigner);
    } catch {
      setProvider(undefined);
      setSigner(undefined);
    }
  }

  async function init() {
    try {
      const instance = await web3Modal.connect();
      setRejected(false);

      const newProvider = new Web3Provider(instance, "any");
      setProvider(newProvider);

      instance.on("accountsChanged", async (accounts: string[]) => {
        setAccounts(accounts);
      });

      instance.on("chainChanged", async (chainId: number) => {
        setChainId(chainId);
      });
    } catch {
      console.log("connection failed");
      setRejected(true);
    }
  }

  useEffect(() => {
    (async () => {
      await resetSigner();
    })();
  }, [provider, accounts]);

  useEffect(() => {
    (async () => {
      const networkName = (await provider?.getNetwork())?.name;
      setNetwork(networkName);
    })();
  }, [chainId, provider]);

  useEffect(() => {
    (async () => {
      if (requiresConnection) {
        await init();
      } else {
        setProvider(undefined);
      }
    })();
  }, [requiresConnection]);

  useEffect(() => {
    (async () => {
      const contract = signer
        ? new Contract(CONTRACT_ADDRESS, ABI, signer)
        : undefined;
      setContract(contract);
    })();
  }, [signer, CONTRACT_ADDRESS, ABI]);

  return [provider, signer, network, contract, rejected];
}

export default useEthereum;
