import styles from "./HyToggle.module.css";

export const HyToggle = () => {
  return (
    <div>
      <label className={styles.switch}>
        <input type="checkbox" />
        <span className={styles.slider}></span>
      </label>
      Switch 3
    </div>
  );
};
