import React from "react";
import styles from "./event.module.css";
import { Grid } from "@mui/material";
import { oldeventdetails } from "./oldevents";

// import { useState } from "react";
import EventCard from "./EventCard";
import Layout from "../component/Layout/Layout";
const Event = () => {
  // const [eventdetails, seteventdetails] = useState(oldeventdetails);
  return (
    <>
      <Layout dataColor="#faea09">
    <div className={styles["event-main"]}>
      <p className={styles.heading}>Past Events</p>
      <div>
        <Grid
          container
          columnSpacing={5}
          rowSpacing={0}
          className={styles["event-container"]}
        >
          {oldeventdetails.map((element) => {
            return <EventCard data={element} />;
          })}
        </Grid>
      </div>
    </div>
    </Layout>
    </>
  );
};

export default Event;
