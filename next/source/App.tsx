"use client";
import { Connect } from "@/source/components/connect";
import { useEffect, useState } from "react";
import { getData } from "@/source/utils/getData";

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = async () => {
    const res = await getData();
    setData(res);
  };

  return (
    <div>
      <Connect getData={handleGetData} />
    </div>
  );
}
