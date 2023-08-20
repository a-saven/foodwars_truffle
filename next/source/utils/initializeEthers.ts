import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

export async function initializeEthers(): Promise<{ provider: ethers.Provider; signer: ethers.Signer | null }> {
  let signer: ethers.Signer | null = null;
  let provider: ethers.Provider | null = null;

  try {
    const isClient = typeof window !== "undefined";

    if (isClient && window.ethereum) {
      provider = new ethers.BrowserProvider(window.ethereum);
      if (provider instanceof ethers.BrowserProvider) {
        signer = await provider.getSigner();
      }
    } else {
      provider = ethers.getDefaultProvider("http://127.0.0.1:8545/"); //development
    }

    return { provider, signer };
  } catch (err) {
    throw new Error(`Failed to initialize ethers: ${(err as Error).message}`);
  }
}
