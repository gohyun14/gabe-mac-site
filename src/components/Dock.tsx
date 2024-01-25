"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { type appState } from "lib/types";
import { useRef } from "react";

export default function Dock({
  computerState,
  setComputerState,
}: {
  computerState: appState[];
  setComputerState: React.Dispatch<React.SetStateAction<appState[]>>;
}) {
  const mouseX = useMotionValue(Infinity);

  const hasMinimized = computerState.some(
    (state) => state.state === "minimized",
  );

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="absolute bottom-[20px] left-1/2 mx-auto flex h-16 w-min -translate-x-1/2 items-end gap-4 rounded-2xl bg-gray-700 bg-opacity-90 px-4 py-3"
    >
      {/* app icons */}
      {computerState.map((state) => (
        <AppIcon
          key={state.id}
          mouseX={mouseX}
          iconState={state}
          setComputerState={setComputerState}
        />
      ))}

      {/* minimized icons */}
      {hasMinimized && (
        <>
          <div className="h-full w-[1.5px] rounded-full bg-white opacity-70" />
          {computerState
            .filter((state) => state.state === "minimized")
            .map((state) => (
              <MinimizedIcon
                key={state.id}
                mouseX={mouseX}
                iconState={state}
                setComputerState={setComputerState}
              />
            ))}
        </>
      )}
    </motion.div>
  );
}

function MinimizedIcon({
  mouseX,
  iconState,
  setComputerState,
}: {
  mouseX: MotionValue;
  iconState: appState;
  setComputerState: React.Dispatch<React.SetStateAction<appState[]>>;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 100, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const handleChangeAppSate = (id: number) => {
    if (iconState.state === "closed") {
      setComputerState((prev) =>
        prev.map((state) =>
          state.id === id ? { ...state, state: "opening" } : state,
        ),
      );
      setTimeout(
        () =>
          setComputerState((prev) =>
            prev.map((state) =>
              state.id === id ? { ...state, state: "open" } : state,
            ),
          ),
        2550,
      );
    }
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => handleChangeAppSate(iconState.id)}
      style={{ width }}
      data-opening={iconState.state === "opening" ? true : null}
      className="data-[opening]:animate-bounceUp relative aspect-square w-10 rounded-[12px] bg-gray-400"
    />
  );
}

function AppIcon({
  mouseX,
  iconState,
  setComputerState,
}: {
  mouseX: MotionValue;
  iconState: appState;
  setComputerState: React.Dispatch<React.SetStateAction<appState[]>>;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 100, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const handleChangeAppSate = (id: number) => {
    if (iconState.state === "closed") {
      setComputerState((prev) =>
        prev.map((state) =>
          state.id === id ? { ...state, state: "opening" } : state,
        ),
      );
      setTimeout(
        () =>
          setComputerState((prev) =>
            prev.map((state) =>
              state.id === id ? { ...state, state: "open" } : state,
            ),
          ),
        2550,
      );
    }
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => handleChangeAppSate(iconState.id)}
      style={{ width }}
      data-opening={iconState.state === "opening" ? true : null}
      className="data-[opening]:animate-bounceUp relative aspect-square w-10 rounded-[12px] bg-gray-400"
    >
      <div
        data-open={
          iconState.state === "open" || iconState.state === "minimized"
            ? true
            : null
        }
        className="absolute bottom-[-7px] left-1/2 h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-white opacity-0 transition-all duration-150 data-[open]:opacity-50"
      />
    </motion.button>
  );
}
