"use client";
import Card from "@/components/card";
import Lastfm from "@/components/lastfm";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  return (
    <>
      <main className="bg-black p-8 min-h-screen flex flex-col items-center justify-center">
        <Card />
        {/* Lastfm */}
        <Lastfm />
      </main>
    </>
  );
}
