import React from "react";
import DateTimeDisplay from "./DateTimeDisplay";
import styles from "./Timer.module.css";
import { useCountdown } from "./hooks/useCountdown";

const ExpiredNotice = () => {
  return (
    <div className={styles["expired-notice"]}>
      <p>The Game is on !!!</p>
      {/* <p>Please select a future date and time.</p> */}
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className={styles["show-counter"]}>
      <div className={styles["show-counter-inner"]}>
        <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />

        <DateTimeDisplay value={hours} type={"Hrs"} isDanger={false} />

        <DateTimeDisplay value={minutes} type={"Min"} isDanger={false} />

        <DateTimeDisplay value={seconds} type={"Sec"} isDanger={false} />
      </div>
    </div>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
