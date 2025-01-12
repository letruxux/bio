import Card from "@/components/main-card";
import Lastfm from "@/components/lastfm";

export default function Home() {
  return (
    <>
      <main className="bg-black px-8 min-h-dvh flex flex-col items-center justify-center">
        <Card />
        <Lastfm />
      </main>
    </>
  );
}
