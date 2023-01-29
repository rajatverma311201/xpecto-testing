import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import styles from "./EventsHomePage.module.css";
import axios from "axios";
import EventCardNew from "./EventCardNew";
import { ReactComponent as FixedLogo } from "../../../svg/xpecto-logo.svg";
import { ThreeCircles } from "react-loader-spinner";
import Layout from "../component/Layout/Layout";
const EventsHomePage = () => {
    const [events, setevents] = useState({ data: [] });
    const [isLoading, setIsLoading] = useState(true);

    const getAllevents = async () => {
        try {
            const url = `${process.env.REACT_APP_BACKENDURL}/api/events/`;
            const data = await axios.get(url);
            setevents((events) => ({
                ...events,
                data: data.data.data,
            }));
            setIsLoading((prev) => false);
        } catch (err) {
            setIsLoading((prev) => true);
            console.log(err);
        }
    };
    useEffect(() => {
        window.scrollTo({ top: window.scrollY + 1, behavior: "smooth" });
    }, [events]);

    useEffect(() => {
        getAllevents();
    }, []);

    return (
        <>
            <Sidebar />
            <Layout dataColor="#F8C456">
                <div className={styles["header"]}>
                    <h1 className={styles["events-page-heading"]}>EVENTS</h1>
                    <div
                        className={`${styles["fixed-logo"]} ${styles["fixed-logo-visible"]}`}
                    >
                        <FixedLogo />
                    </div>
                </div>
                {!isLoading ? (
                    <main className={styles["main"]}>
                        {events.data.map((element) => {
                            return element.isLive ? (
                                <EventCardNew data={element} />
                            ) : (
                                ""
                            );
                        })}
                        {events.data.map((element) => {
                            return !element.isLive ? (
                                <EventCardNew data={element} />
                            ) : (
                                ""
                            );
                        })}
                    </main>
                ) : (
                    <div className={styles["loading"]}>
                        <ThreeCircles
                            height="150px"
                            width="150px"
                            color="#fff"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel="three-circles-rotating"
                            outerCircleColor=""
                            innerCircleColor="#F8C456"
                            middleCircleColor=""
                        />
                    </div>
                )}
            </Layout>
        </>
    );
};

export default EventsHomePage;
