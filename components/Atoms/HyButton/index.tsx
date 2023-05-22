import { ReactNode } from "react";

import styles from "./HyButton.module.css";

type THyButton = {
  children: ReactNode;
  onClick: any;
  variant?: "secondary";
};

export const HyButton = (props: THyButton) => {
  const { children, variant, onClick } = props;
  return (
    <button onClick={onClick} className={`${styles.button} ${styles[variant]}`}>
      {children}
    </button>
  );
};
