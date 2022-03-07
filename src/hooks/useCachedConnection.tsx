import { Web3Provider } from "@ethersproject/providers";
import { useEffect, useState } from "react";

function useCachedConnection() {
  const [alreadyConnected, setAlreadyConnected] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      console.log("check cache");
      if (window.ethereum) {
        console.log("ethereum");
        const tempProvider = new Web3Provider(window.ethereum);
        const existingAccounts = await tempProvider.listAccounts();
        console.log(existingAccounts);
        setAlreadyConnected(existingAccounts.length > 0);
      }

      return setAlreadyConnected(false);
    })();
  }, []);

  return alreadyConnected;
}

export default useCachedConnection;
