import Card from "@/components/main-card";
import Lastfm from "@/components/lastfm";

export default function Home() {
  return (
    <>
      <style>
        {/* hide scrollbar, messes up padding */}
        {`
*::-webkit-scrollbar { display: none; }
* { overflow: -moz-scrollbars-none; }
        `}
      </style>
      <main className="bg-black px-8 min-h-dvh flex flex-col items-center justify-center">
        <Card />
        <Lastfm />
      </main>
    </>
  );
}
