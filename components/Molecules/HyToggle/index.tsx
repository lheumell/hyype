import styles from "./HyToggle.module.css";

export const HyToggle = (props: any) => {
  const { label, value, setValue } = props;

  const onClick = () => {
    setValue(!value);
  };

  return (
    <div>
      <label className={styles.switch}>
        <input type="checkbox" checked={value} onChange={onClick} />
        <span className={styles.slider}></span>
      </label>
      {label}
    </div>
  );
};
