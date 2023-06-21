import { Dispatch, SetStateAction } from "react";
import { HyText } from "../../..";

import styles from "./HyLabelInput.module.css";

type THyLabelInput = {
  label: string;
  value: string | number;
  setValue: Dispatch<SetStateAction<any>>;
  type: "password" | "text" | "number" | "email" | "date" | "textArea";
  isDisabled?: boolean;
  autoComplete?: string;
};

export const HyLabelInput = (props: THyLabelInput) => {
  const { label, value, setValue, type, isDisabled, autoComplete } = props;
  return (
    <div className={styles.labelinput}>
      <HyText weight="bold">{label}:</HyText>
      {type === "textArea" ? (
        <textarea
          className={`${styles.input} ${isDisabled && styles.disabled}`}
        />
      ) : (
        <input
          disabled={isDisabled}
          className={`${styles.input} ${isDisabled && styles.disabled}`}
          type={type}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          required
          autoComplete={autoComplete}
          min="0"
        />
      )}
    </div>
  );
};
