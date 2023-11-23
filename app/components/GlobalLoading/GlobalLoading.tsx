import { clsx } from "clsx";
import styles from "./styles.module.css";
import { useNavigation } from "@remix-run/react";
import { FC, useEffect, useRef, useState } from "react";

const GloabalLoader: FC = () => {
  const transition = useNavigation();
  const active = transition.state !== "idle";
  const ref = useRef<HTMLDivElement>(null);
  const [animationComplete, setAnimationComplete] = useState(true);
  useEffect(() => {
    if (!ref.current) return;
    if (active) setAnimationComplete(false);

    Promise.allSettled(
      ref.current.getAnimations().map(({ finished }) => finished)
    ).then(() => !active && setAnimationComplete(true));
  }, [active]);
  return (
    <div
      role="progressbar"
      aria-hidden={!active}
      aria-valuetext={active ? "Loading" : undefined}
      className={clsx(styles.loader, { [styles.active]: active })}
    >
      <div
        ref={ref}
        className={clsx(
          styles.bar,
          {
            [styles.animationComplete]:
              transition.state === "idle" && animationComplete,
          },
          { [styles.loading]: transition.state === "loading" },
          { [styles.idle]: transition.state === "idle" }
        )}
      ></div>
    </div>
  );
};
export default GloabalLoader;
