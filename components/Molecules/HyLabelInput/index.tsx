import { Dispatch, SetStateAction } from "react";
import { HyText } from "../../..";

import styles from "./HyLabelInput.module.css";

type THyLabelInput = {
  label: string;
  value: string | number;
  setValue: Dispatch<SetStateAction<any>>;
  type: "password" | "text" | "number" | "email" | "date";
  isDisabled?: boolean;
  autoComplete?: string;
};

export const HyLabelInput = (props: THyLabelInput) => {
  const { label, value, setValue, type, isDisabled, autoComplete } = props;
  return (
    <div className={styles.labelinput}>
      <HyText weight="bold">{label}:</HyText>
      <input
        disabled={isDisabled}
        className={`${styles.input} ${isDisabled && styles.disabled}`}
        type={type}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        required
        autoComplete={autoComplete}
      />
    </div>
  );
};
