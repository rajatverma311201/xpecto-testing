import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import LayoutPage from "../component/Layout/Layout";
import { ReactComponent as FixedLogo } from "../../../svg/xpecto-logo.svg";
import styles from "./eventopen.module.css";
export default function EventOpen(props) {
    const params = useParams();
    const navigate = useNavigate();

    const [eventdata, seteventdata] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const getevent = async () => {
        try {
            const url = `${process.env.REACT_APP_BACKENDURL}/api/events/${params.id}`;
            const data = await axios.get(url);
            // console.log(data.data.data.prices);
            seteventdata((prev) => data.data.data);
            // const x = data.data.data.prices.first + data.data.data.prices.first
        } catch {
            navigate("/events");
        }
    };
    useEffect(() => {
        getevent();
    }, []);
    if (eventdata === undefined) {
        return (
            <>
                <h1>Loading...</h1>
            </>
        );
    }
    return (
        <>
            <Sidebar />
            <LayoutPage dataColor="#F8C456">
                <div className={styles["header"]}>
                    <h1 className={styles["events-page-heading"]}>
                        {eventdata.name}
                    </h1>
                    <h2 className={styles["events-page-teamsize"]}>
                        Team Size:{" "}
                        {`${eventdata.teamMinSize} ${
                            eventdata.teamMinSize !== eventdata.teamMaxSize
                                ? ` - ${eventdata.teamMaxSize}`
                                : ""
                        }`}
                    </h2>
                    <div
                        className={`${styles["fixed-logo"]} ${styles["fixed-logo-visible"]}`}
                    >
                        <FixedLogo />
                    </div>
                </div>
                {/* main */}
                <div className={styles["main"]}>
                    <p className={styles["eventdesc"]}>
                        {eventdata.description}
                    </p>
                    <br />
                    <div className={styles["event-btns"]}>
                        {eventdata.rulebook_link ? (
                            <a
                                className={styles["eventbutton"]}
                                href={eventdata.rulebook_link}
                                target="_blank"
                            >
                                Rulebook
                            </a>
                        ) : (
                            ""
                        )}
                        <br />
                        {eventdata.problemset_link ? (
                            <a
                                className={styles["eventbutton"]}
                                href={eventdata.problemset_link}
                                target="_blank"
                            >
                                Problem Statement
                            </a>
                        ) : (
                            ""
                        )}
                        <br />
                        {eventdata.submission_link ? (
                            <a
                                className={styles["eventbutton"]}
                                href={eventdata.submission_link}
                                target="_blank"
                            >
                                Submission Link
                            </a>
                        ) : (
                            ""
                        )}
                    </div>

                    <br />
                    <h2 className={styles["eventprize"]}>
                        Prizes Worth : Rs.{" "}
                        {eventdata.prices.first +
                            eventdata.prices.second +
                            eventdata.prices.third +
                            eventdata.prices.fourth}
                    </h2>
                    <div className={styles["prizes"]}>
                        {eventdata.prices.first != "" && (
                            <p className={styles["prize"]}>
                                First : Rs. {eventdata.prices.first}
                            </p>
                        )}
                        {eventdata.prices.second != "" && (
                            <p className={styles["prize"]}>
                                Second : Rs. {eventdata.prices.second}
                            </p>
                        )}
                        {eventdata.prices.third != "" && (
                            <p className={styles["prize"]}>
                                Third : Rs. {eventdata.prices.third}
                            </p>
                        )}
                        {eventdata.prices.fourth ? (
                            <p className={styles["prize"]}>
                                Fourth : Rs. {eventdata.prices.fourth}
                            </p>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </LayoutPage>
        </>
    );
}
