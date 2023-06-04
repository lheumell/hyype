import { THyButton } from "./types";

import styles from "./HyButton.module.css";

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
