import React from "react";
import styles from "./event.module.css";
import { Grid } from "@mui/material";
import { oldeventdetails } from "./oldevents";
import { ReactComponent as FixedLogo } from "../../../svg/xpecto-logo.svg";

// import { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import EventCard from "./EventCard";
const Event = () => {
  // const [eventdetails, seteventdetails] = useState(oldeventdetails);
  return (
    <>
    <Sidebar />
      <div
        className={`${styles["fixed-logo"]} ${styles["fixed-logo-visible"]}`}
      >
        <FixedLogo />
      </div>
      <div 
      data-color="#f8e856"
      // ref={eventsRef}
      // className={stylesss["events-page-container"]}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/home/background.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        //   backgroundPosition: "center",
        backgroundAttachment: "fixed",
        //   height: "100vh",
      }}>
    <div className={styles["event-main"]}>
      <p className={styles.heading}>Past Events</p>
      <div>
        <Grid
          container
          columnSpacing={5}
          rowSpacing={1}
          className={styles["event-container"]}
        >
          {oldeventdetails.map((element) => {
            return <EventCard data={element} />;
          })}
        </Grid>
      </div>
    </div>
    </div>
    </>
  );
};

export default Event;
