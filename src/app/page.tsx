"use client";

import { useState } from "react";
import Dock from "~/components/Dock";
import { type appState } from "lib/types";
import Windows from "~/components/Windows";

export default function HomePage() {
  const [computerState, setComputerState] = useState<appState[]>([
    {
      id: 0,
      state: "open",
    },
    {
      id: 1,
      state: "closed",
    },
    {
      id: 2,
      state: "closed",
    },
  ]);

  return (
    <div id="app-space" className="relative h-[100vh] w-[100vw]">
      <Windows
        computerState={computerState}
        setComputerState={setComputerState}
      />
      <Dock computerState={computerState} setComputerState={setComputerState} />
    </div>
  );
}
