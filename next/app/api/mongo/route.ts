// pages/api/mongoRestaurants.ts

import { NextResponse } from "next/server";

const API_KEY = process.env.MONGO_KEY || "no key";

const getMongoRestaurants = async () => {
  const url = "https://eu-central-1.aws.data.mongodb-api.com/app/data-velzl/endpoint/data/v1/action/find";
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Request-Headers": "*",
    apiKey: API_KEY,
  };
  const body = JSON.stringify({
    collection: "menus",
    database: "prod",
    dataSource: "Cluster0",
    sort: { createdAt: 1 },
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    return result?.documents;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export async function GET() {
  try {
    const restaurants = await getMongoRestaurants();
    return NextResponse.json({ data: restaurants }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}
