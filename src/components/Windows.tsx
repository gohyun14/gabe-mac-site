"use client";

import React from "react";
import { motion } from "framer-motion";
import { type appState } from "lib/types";
import { XMarkIcon, MinusIcon } from "@heroicons/react/24/outline";

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
  const handleCloseApp = () => {
    setComputerState((prev) =>
      prev.map((state) =>
        state.id === iconState.id ? { ...state, state: "closed" } : state,
      ),
    );
  };

  const handleMinimizeApp = () => {
    setComputerState((prev) =>
      prev.map((state) =>
        state.id === iconState.id ? { ...state, state: "minimized" } : state,
      ),
    );
  };

  return (
    <motion.div
      layoutId={`window-${iconState.id}`}
      drag
      dragMomentum={false}
      whileTap={{ cursor: "grabbing" }}
      className="flex h-[500px] w-[500px] flex-col overflow-hidden rounded-xl bg-zinc-400 shadow-2xl"
    >
      {/* window controls */}
      <div className="flex h-8 flex-row items-center gap-x-2 bg-transparent px-3">
        <button
          type="button"
          aria-label="Close"
          onClick={handleCloseApp}
          className="group flex h-[18px] w-[18px] items-center justify-center rounded-full bg-red-500 focus:outline-2 focus:outline-black"
        >
          <XMarkIcon className="invisible h-3 w-3 stroke-red-800 stroke-[2.5px] group-hover:visible" />
        </button>

        <button
          type="button"
          aria-label="Minimize"
          onClick={handleMinimizeApp}
          className="group flex h-[18px] w-[18px] items-center justify-center rounded-full bg-yellow-400 focus:outline-2 focus:outline-black"
        >
          <MinusIcon className="invisible h-3 w-3 stroke-red-800 stroke-[2.5px] group-hover:visible" />
        </button>
      </div>

      {/* content */}
      <div className="h-full w-full bg-white">hi</div>
    </motion.div>
  );
}
