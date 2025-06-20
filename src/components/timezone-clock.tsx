"use client";

import React, { useState, useEffect } from "react";
import Card from "./card";
import AnimatedDigit from "./animated-digit";
import AnimatedNumber from "./animated-digit";

function TimezoneClock({ ref }: { ref: React.RefObject<HTMLDivElement | null> }) {
  const [timeDifference, setTimeDifference] = useState({ hours: 0, minutes: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAhead, setIsAhead] = useState<boolean | null>(null); // true= ahead, false=behind, null=same

  useEffect(() => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const targetTimezone = "Europe/Rome";

    const getTimeInTimeZone = (tz: string) => {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: tz,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      const parts = formatter.formatToParts(new Date());
      const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "0", 10);
      const minute = parseInt(parts.find((p) => p.type === "minute")?.value || "0", 10);
      return { hour, minute };
    };

    const userTime = getTimeInTimeZone(userTimezone);
    const targetTime = getTimeInTimeZone(targetTimezone);

    // Calcolo differenza in minuti totali (per capire se ahead o behind)
    let diffHours = targetTime.hour - userTime.hour;
    let diffMinutes = targetTime.minute - userTime.minute;

    if (diffMinutes < 0) {
      diffMinutes += 60;
      diffHours -= 1;
    }
    if (diffHours < 0) {
      diffHours += 24;
    }

    const totalDiffMinutes = diffHours * 60 + diffMinutes;

    if (totalDiffMinutes === 0) {
      setIsAhead(null); // stesso orario
    } else if (
      // userTime è avanti rispetto a Roma se il totale differenza (target - user) è negativo
      targetTime.hour * 60 + targetTime.minute <
      userTime.hour * 60 + userTime.minute
    ) {
      // User è ahead
      setIsAhead(true);
    } else {
      // User è behind
      setIsAhead(false);
    }

    setIsLoaded(true);
    setTimeDifference({ hours: Math.abs(diffHours), minutes: Math.abs(diffMinutes) });
  }, []);

  if (!isLoaded) {
    return (
      <Card ref={ref} className="w-full max-w-md text-center space-y-4">
        <div className="text-white text-sm opacity-50">
          Calculating timezone difference...
        </div>
      </Card>
    );
  }

  if (isAhead === null) {
    return (
      <Card ref={ref} className="w-full max-w-md text-center space-y-4">
        <div className="text-2xl text-green-400">
          <span style={{ fontFamily: "Phonk" }}>same timezone</span>
          <span className="font-black text-3xl">!</span>
        </div>
      </Card>
    );
  }

  return (
    <Card ref={ref} className="w-full max-w-md text-center p-4">
      <h2 className="text-lg text-zinc-400">you are</h2>

      <div className="flex items-center justify-center text-4xl font-mono">
        <div className="flex">
          <AnimatedNumber targetNumber={timeDifference.hours} delay={1500} />
        </div>
        <span className="transform -translate-y-[2px]">:</span>
        <div className="flex">
          <AnimatedNumber targetNumber={timeDifference.minutes} delay={1600} />
        </div>
      </div>

      <h2 className="text-lg text-zinc-400">
        {isAhead ? "hours ahead" : "hours behind"} of me
      </h2>
    </Card>
  );
}

export default TimezoneClock;
