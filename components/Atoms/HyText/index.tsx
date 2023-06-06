import { ReactNode } from "react";
import styles from "./HyText.module.css";

type THyText = {
  children: ReactNode;
  variant?: "title" | "subtitle" | "heading" | "subheading";
  color?: "secondary";
  weight?: "bold";
  addStyle?: "truncate";
  classes?: string;
};

export const HyText = (props: THyText) => {
  const { children, variant, weight, color, classes, addStyle } = props;
  return (
    <p
      className={`${variant && styles[variant]} ${weight && styles[weight]} ${
        addStyle && styles[addStyle]
      }  ${color && styles[color]} ${classes} ${styles.default}`}
    >
      {children}
    </p>
  );
};
