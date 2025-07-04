import Card from "@/components/main-card";
import Lastfm from "@/components/lastfm";

export default function Home() {
  return (
    <>
      <main className="bg-gradient-to-br from-gray-900 via-black to-gray-800 px-2 min-h-dvh flex flex-col items-center justify-center">
        <Card />
        <Lastfm />
      </main>
    </>
  );
}
