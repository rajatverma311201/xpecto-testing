import React, { useEffect, useRef, useState } from "react";
import styles from "./EventsHomePage.module.css";
import axios from "axios";
import EventCardNew from "./EventCardNew";
import { ThreeCircles } from "react-loader-spinner";
import Layout from "../component/Layout/Layout";
const EventsHomePage = () => {
  const [events, setevents] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(true);
  //   useEffect(() => {
  //     window.location.reload(false);
  //   }, []);
  const getAllevents = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKENDURL}/api/events/`;
      const data = await axios.get(url);
      setevents((events) => ({
        ...events,
        data: data.data.data,
      }));
      console.log(data.data.data);
      setIsLoading((prev) => false);
    } catch (err) {
      setIsLoading((prev) => true);
      console.log(err);
    }
  };
  useEffect(() => {
    // fire window scroll event to update scrollbar
    window.dispatchEvent(new Event("scroll"));
  }, [events]);

  useEffect(() => {
    getAllevents();
  }, []);

  return (
    <>
      <Layout dataColor="#F8C456">
        <div className={styles["header"]}>
          <h1 className={styles["events-page-heading"]}>EVENTS</h1>
        </div>
        {!isLoading ? (
          <main className={styles["main"]}>
            {events.data.map((element) => {
              return element.isLive ? (
                <EventCardNew data={element} key={element.name} />
              ) : (
                ""
              );
            })}
            {events.data.map((element) => {
              return !element.isLive ? (
                <EventCardNew data={element} key={element.name} />
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
