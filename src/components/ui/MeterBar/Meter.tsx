"use client";

import { useEffect, useRef } from "react";
import styles from "./Meter.module.css";

type MeterBarProps = {
  value: number; // 🔢 This is your in-game value (health, energy, etc.)
};

const MeterBar = ({ value }: MeterBarProps) => {
  const arrowRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  // 🎯 This converts the value to an angle for the needle
  const calcAngle = (val: number): number => {
    let angle = -90;
    if (val < 1.5) {
      angle = (val / 1.5) * 60 - 90;
    } else if (val > 1.5 && val < 6.5) {
      angle = (val / 6.5) * 90 - 90;
    } else if (val > 6.5 && val < 15) {
      angle = (val / 15) * 30;
    } else {
      angle = (val / 15) * 90;
    }
    return Math.round(angle);
  };

  useEffect(() => {
    const angle = calcAngle(value);

    if (arrowRef.current) {
      arrowRef.current.style.transform = `rotate(${angle}deg)`;
    }

    if (counterRef.current) {
      // 💡 This is where the digits are displayed (e.g., "82 HP")
      counterRef.current.innerText = `${value.toFixed(1)} ⚡`;
    }
  }, [value]);

  return (
    <div className='flex items-center justify-center p-4'>
      <div>
        <div className={styles.speedometr}>
          <div className={styles.scale + " " + styles.low} />
          <div className={styles.scale + " " + styles.middle} />
          <div className={styles.scale + " " + styles.hight} />
          <div ref={arrowRef} className={styles.arrow} />
        </div>
        <div
          ref={counterRef}
          className='text-gray-800 text-center text-base font-semibold pt-4 pb-0'
        >
          {/* This will be updated dynamically */}
          0.0 ⚡
        </div>
      </div>
    </div>
  );
};

export default MeterBar;
