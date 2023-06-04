import { Dispatch, SetStateAction } from "react";
import { HyText } from "../../..";

import styles from "./HyLabelInput.module.css";

type THyLabelInput = {
  label: string;
  value: string | number;
  setValue: Dispatch<SetStateAction<any>>;
  type: "password" | "text" | "number" | "email" | "date";
};

export const HyLabelInput = (props: THyLabelInput) => {
  const { label, value, setValue, type } = props;
  return (
    <div className={styles.labelinput}>
      <HyText weight="bold">{label}:</HyText>
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        required
      />
    </div>
  );
};
