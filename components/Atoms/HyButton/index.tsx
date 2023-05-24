import { ReactNode } from "react";

import styles from "./HyButton.module.css";

type THyButton = {
  children: ReactNode;
  onClick: any;
  variant?: "secondary" | "error";
  isDisabled?: boolean;
  withIcon?: boolean;
};

export const HyButton = (props: THyButton) => {
  const { children, variant, onClick, isDisabled, withIcon } = props;
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`${styles.button} ${variant && styles[variant]} ${
        !withIcon && styles.minwidth
      }`}
    >
      {children}
    </button>
  );
};
