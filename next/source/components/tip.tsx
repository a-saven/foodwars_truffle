"use client";
import { useState, useEffect } from "react";
import { parseEther } from "ethers";
import { useEthers } from "@/source/utils/useEthers";
import { getContract } from "@/source/utils/contract";

function TipInner({ restaurantId, signer }: { restaurantId: number; signer: any }) {
  const [tipAmount, setTipAmount] = useState<string>("");

  const contract = getContract(signer);

  useEffect(() => {
    const handleTipped = async (restaurantId: any, tipAmount: any, authorFee: any) => {
      console.log("Tipped");
    };

    contract.on("Tipped", handleTipped);

    return () => {
      contract.off("Tipped", handleTipped);
    };
  }, [contract]);

  const handleTip = async (restaurantId: number) => {
    try {
      const amount = parseEther(tipAmount);
      const tx = await contract.tipRestaurant(restaurantId, { value: amount });
      await tx.wait();
      console.log("TX:", tx);
      alert("Tip sent successfully!");
      setTipAmount(""); // Reset the input field after successful tip
    } catch (error) {
      console.error(`Error sending tip: ${error}`);
      alert("Failed to send tip");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div> Tip {restaurantId}</div>
      <div className="flex-row justify-center items-center">
        <input
          type="text"
          placeholder="ETH"
          value={tipAmount}
          onChange={(e) => setTipAmount(e.target.value)}
          className="p-1 border rounded mr-2 w-16"
        />
        <button onClick={() => handleTip(restaurantId)} className="p-1 bg-blue-500 rounded text-white">
          TIP
        </button>
      </div>
    </div>
  );
}

export function Tip(props: { restaurantId: number }) {
  const { signer } = useEthers();

  if (!signer) return null;

  return <TipInner {...props} signer={signer} />;
}
