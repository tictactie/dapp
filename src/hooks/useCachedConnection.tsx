import { Web3Provider } from "@ethersproject/providers";
import { useEffect, useState } from "react";

function useCachedConnection() {
  const [alreadyConnected, setAlreadyConnected] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (window.ethereum) {
        const tempProvider = new Web3Provider(window.ethereum);
        const existingAccounts = await tempProvider.listAccounts();
        setAlreadyConnected(existingAccounts.length > 0);
      }

      return setAlreadyConnected(false);
    })();
  }, []);

  return alreadyConnected;
}

export default useCachedConnection;
