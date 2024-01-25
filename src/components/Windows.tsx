"use client";

import React from "react";
import { motion } from "framer-motion";
import { type appState } from "lib/types";

export default function Windows({
  computerState,
  setComputerState,
}: {
  computerState: appState[];
  setComputerState: React.Dispatch<React.SetStateAction<appState[]>>;
}) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      {computerState
        .filter((state) => state.state === "open")
        .map((state) => (
          <Window
            key={state.id}
            iconState={state}
            setComputerState={setComputerState}
          />
        ))}
    </div>
  );
}

function Window({
  iconState,
  setComputerState,
}: {
  iconState: appState;
  setComputerState: React.Dispatch<React.SetStateAction<appState[]>>;
}) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      whileTap={{ cursor: "grabbing" }}
      className="h-[500px] w-[500px] overflow-hidden rounded-xl bg-zinc-400 shadow-2xl"
    >
      {/* controls */}
      <div className="flex h-[32px] flex-row items-center gap-x-[4px] bg-blue-300"></div>
      <div className="h-full w-full bg-white">hi</div>
    </motion.div>
  );
}
