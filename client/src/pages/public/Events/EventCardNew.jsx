import React from "react";
import styles from "./EventCardNew.module.css";
const EventCardNew = (props) => {
    return (
        <div className={styles["card-outer-container"]}>
            <div className={styles["card-inner-container"]}>
                <div className={styles["main-container"]}>
                    <h2 className={styles["event-name"]}>
                        {props.data.name.toUpperCase()}
                    </h2>

                    {props.data.info !== "" && (
                        <h3 className={styles["event-tagline"]}>
                            {props.data.info}
                        </h3>
                    )}
                </div>
                {props.data.isLive ? (
                    <span className={styles["live"]}>LIVE</span>
                ) : (
                    ""
                )}
                <a
                    href={`/events/${props.data._id}`}
                    className={styles["more-button"]}
                >
                    MORE {">>>"}
                </a>
            </div>
        </div>
    );
};

export default EventCardNew;
