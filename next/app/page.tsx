import App from "@/source/App";
import { Restaurants } from "@/source/components/restaurants";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 w-full max-w-5xl items-center font-mono text-center">
        {/* Big puffy font header */}
        <div>
          <h1 className="text-6xl font-extrabold mb-8 text-brown-500 bg-brown-500 p-4 rounded-lg tracking-widest font-mono text-shadow-lg shadow-amber-800">
            FOODWARS
          </h1>
          <h6>Ulitmate King-of-the-Hill Tounament</h6>
          <h6>Establisment with most tips wins!</h6>
        </div>
        <Restaurants />
        <App />
      </div>
    </main>
  );
}
