import { useNavigation } from "@remix-run/react";
import { clsx } from "clsx";
import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

type GlobalLoaderProps = {
  isAdmin: boolean;
};

const GlobalLoader: FC<GlobalLoaderProps> = ({ isAdmin }) => {
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
            [styles.barAdmin]: isAdmin,
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
export default GlobalLoader;
