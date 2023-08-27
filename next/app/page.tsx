import { Restaurants } from "@/source/components/restaurants";
import { Connect } from "@/source/components/connect";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="z-10 w-full max-w-5xl items-center font-mono text-center m-2">
        <Connect />
        <div>
          <h1 className="text-6xl font-extrabold mb-4 text-brown-500 bg-brown-500 p-2 rounded-lg tracking-widest font-mono text-shadow-lg shadow-amber-800">
            FOODWARS
          </h1>
          <h6>Ulitmate King-of-the-Hill Tounament</h6>
          <h6>Establisment with most tips wins!</h6>
        </div>
        <Restaurants />
      </div>
    </main>
  );
}
