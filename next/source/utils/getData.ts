const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function getData() {
  const res = await fetch(`${BASE_URL}/api/restaurants`, { next: { revalidate: 3600 }});
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log("res", res);
  }

  const { data } = await res.json();
  return data;
}
