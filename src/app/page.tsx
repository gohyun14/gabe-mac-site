"use client";

import { useState } from "react";
import Dock from "~/components/Dock";
import { type appState } from "lib/types";

export default function HomePage() {
  const [computerState, setComputerState] = useState<appState[]>([
    {
      id: 0,
      state: "closed",
    },
    {
      id: 1,
      state: "closed",
    },
    {
      id: 2,
      state: "minimized",
    },
  ]);

  return (
    <div id="app-space" className="relative h-[100vh] w-[100vw]">
      <Dock computerState={computerState} setComputerState={setComputerState} />
    </div>
  );
}
