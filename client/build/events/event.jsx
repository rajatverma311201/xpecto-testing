import React from "react";
import style from "./event.css";
import { Grid } from "@mui/material";
// import { oldeventdetails } from "./oldevents";
import EventCard from "./EventCard";
const Event = () => {
 
  return (
    <div className={style["event-main"]}>
      <p className={style.heading}>Events</p>
      <div>
        <Grid
          container
          columnSpacing={5}
          rowSpacing={2}
          className={style["event-container"]}
        >
          {oldeventdetails.map((element) => {
            return <EventCard data={element} />;
          })}
        </Grid>
      </div>
    </div>
  );
};

export default Event;
