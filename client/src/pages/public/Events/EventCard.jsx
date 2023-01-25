import React, { useRef, useEffect } from "react";
import style from "./event.module.css";
import { Grid } from "@mui/material";

const EventCard = (props) => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove(style["event-card-invisible"]);
        } else {
          entry.target.classList.add(style["event-card-invisible"]);
        }
      },
      { threshold: 0.5 }
    );
    const ref1Current = ref1.current;
    const ref2Current = ref2.current;
    observer.observe(ref1Current);
    observer.observe(ref2Current);
    return () => {
      observer.unobserve(ref1Current);
      observer.unobserve(ref2Current);
    };
  }, [ref1, ref2]);

  return (
    <>
      <Grid item xs={12} sm={6} md={4} width={80}>
        <div className={style["event-card"]}>
          <div className={style["event-heading"]}>
            <div className={style["event-title"]}>
            <div>
              {props.data.name}
              </div>
              <div className={style["event-club"]}>
                {props.data.club}
              </div>

            </div>
            
          </div>
          <div className={style["event-prize-money"]} ref={ref1}>
            <hr />
            Prizes Worth: <span>{props.data.pricesworth}</span>
            <hr />
          </div>
          <div className={style["event-desc"]}>{props.data.description}</div>
          <div className={style["event-prize-money"]} ref={ref2}>
            <hr />
            Team Size: {props.data.teamMinSize}
            {props.data.teamMaxSize !== props.data.teamMinSize &&
              ` - ${props.data.teamMaxSize}`}
            <hr />
          </div>
        </div>
      </Grid>
    </>
  );
};

export default EventCard;
