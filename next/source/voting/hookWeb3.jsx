import { useEffect, useState } from "react";
import Web3 from "web3";

export function useWeb3Initialization() {
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    } else {
      alert("Please install MetaMask!");
    }
  }, []);

  return web3;
}
