import { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { JsonRpcSigner } from "@ethersproject/providers/src.ts";
import { Contract } from "ethers";
import { ABI, CONTRACT_ADDRESS } from "./config";

function useEthereum(
  requiresConnection: boolean
): [
  provider: JsonRpcProvider | undefined,
  signer: JsonRpcSigner | undefined,
  network: string | undefined,
  contract: Contract | undefined,
  rejected: boolean
] {
  const [provider, setProvider] = useState<JsonRpcProvider | undefined>();
  const [contract, setContract] = useState<Contract>();
  const [signer, setSigner] = useState<JsonRpcSigner | undefined>();
  const [accounts, setAccounts] = useState<string[]>();
  const [rejected, setRejected] = useState<boolean>(false);
  const [chainId, setChainId] = useState<number>();
  const [network, setNetwork] = useState<string>();

  useEffect(() => {
    (async () => {
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
        async function init() {
          try {
            const INFURA_ID = process.env.REACT_APP_INFURA_ID;

            const providerOptions = {
              walletconnect: {
                package: WalletConnectProvider,
                options: {
                  infuraId: INFURA_ID,
                  rpc: {
                    1: "https://mainnet.infura.io/v3/55a919d275424d258567afe517821b92",
                    // ...
                  },
                },
              },
            };

            const web3Modal = new Web3Modal({
              network: "any",
              cacheProvider: true,
              providerOptions,
            });

            const instance = await web3Modal.connect();
            setRejected(false);

            const newProvider = new Web3Provider(instance, "any");
            setProvider(newProvider);

            instance.on("accountsChanged", async (accounts: string[]) => {
              setAccounts(accounts);
            });

            instance.on("chainChanged", async (chainId: number) => {
              console.log("changed");
              setChainId(chainId);
            });
          } catch {
            setRejected(true);
          }
        }

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
  }, [signer]);

  return [provider, signer, network, contract, rejected];
}

export default useEthereum;
