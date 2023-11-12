"use client";

import {
  type MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function Dock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="absolute bottom-[20px] left-1/2 mx-auto flex h-16 w-min -translate-x-1/2 items-end gap-4 rounded-2xl bg-gray-700 bg-opacity-90 px-4 pb-3"
    >
      {[...Array(3).keys()].map((i) => (
        <AppIcon mouseX={mouseX} key={i} />
      ))}
    </motion.div>
  );
}

function AppIcon({ mouseX }: { mouseX: MotionValue }) {
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

  const [appState, setAppState] = useState<"closed" | "open">("closed");

  const handleChangeAppSate = () => {
    if (appState === "closed") {
      setAppState("open");
    }
  };

  return (
    <>
      <motion.button
        ref={ref}
        type="button"
        onClick={handleChangeAppSate}
        style={{ width }}
        className="aspect-square w-10 rounded-[12px] bg-gray-400"
      />

      {appState === "open" &&
        createPortal(
          <div className="absolute left-1/2 top-1/2 h-[50%] w-[75%] -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl">
            This child is placed in the document body.
          </div>,
          document.getElementById("app-space") ?? document.body,
        )}
    </>
  );
}
