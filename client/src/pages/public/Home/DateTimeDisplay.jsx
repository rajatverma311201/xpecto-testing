import React from "react";
import styles from "./Timer.module.css";
const DateTimeDisplay = ({ value, type }) => {
  return (
    <div className={styles["countdown"]}>
      <span>{value}</span>
      <span>{type}</span>
    </div>
  );
};

export default DateTimeDisplay;
