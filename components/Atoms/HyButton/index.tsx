import { ReactNode } from "react";

import styles from "./HyButton.module.css";

type THyButton = {
  children: ReactNode;
  onClick: any;
  variant?: "secondary";
  isDisabled?: boolean;
};

export const HyButton = (props: THyButton) => {
  const { children, variant, onClick, isDisabled } = props;
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]}`}
    >
      {children}
    </button>
  );
};
