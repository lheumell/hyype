import React from "react";
import styles from "./HyNotification.module.css";
export const HyNotification = (isOpen: any, setOpen: any, message: string) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className={`${styles.notification} ${isOpen && styles.active}`}>
          <p onClick={handleClose}>close</p>
          <p>{message}</p>
        </div>
      )}
    </>
  );
};
