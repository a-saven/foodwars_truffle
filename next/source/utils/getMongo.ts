const API_KEY = process.env.MONGO_KEY || "no key";

export const getRestaurants = async () => {
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
