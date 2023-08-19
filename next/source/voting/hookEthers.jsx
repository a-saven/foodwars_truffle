import { useEffect, useState } from "react";
import { BrowserProvider } from "ethers";

export function useEthers() {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const providerInstance = new BrowserProvider(window.ethereum);
      setProvider(providerInstance);
    } else {
      alert("Please install MetaMask!");
    }
  }, []);

  return provider;
}
