import React, { useEffect, useRef } from "react";
import styles from "./About.module.css";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function About() {
  const aboutRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const current = aboutRef.current;
    const scrollEvent = () => {
      const rect = current.getBoundingClientRect();
      const top = rect.top;
      const bottom = rect.bottom;
      const mid = top + current.clientHeight / 2;
      const midIntersecting =
        top <= 100 && mid <= window.screen.height && mid >= 0;
      const isElementVisible = top <= 100 && bottom >= window.screen.height;
      if (midIntersecting || isElementVisible) {
        document.body.style.setProperty(
          "--current-page-color",
          current.getAttribute("data-color")
        );
      }
    };
    window.addEventListener("scroll", scrollEvent, { passive: true });
    return () => {
      window.removeEventListener("scroll", scrollEvent, { passive: true });
    };
  }, [aboutRef]);

  return (
    <>
      <div
        ref={aboutRef}
        data-color="#ffbb3c"
        className={styles["aboutcontainer"]}
      >
        <p className={styles["heading1"]}>ABOUT US</p>
        <motion.p
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          transition={{
            delay: 0.1,
            duration: 1,
          }}
          className={styles["aboutcontent"]}
        >
          <br />
          XPECTO’23 is the second edition of IIT Mandi’s afresh Inter College
          Technical Fest, organised by the Science and Technical Council (SNTC)
          at IIT Mandi.
          <br />
          <br />
          XPECTO’22 envisioned a platform where our nation’s astute and beaming
          minds could unite and dazzle in discussions and competitions relating
          to diverse science, technology, and management domains.
          <br />
          <br />
          After the astounding participation of 7200+ contestants from 650+
          colleges across India, it is back with another thunderous edition.
          <br />
          <br />
          XPECTO’23 now flaunts a plethora of offline events, where the
          contestants will be accommodated in IIT Mandi.
          <br />
          <br />
          XPECTO’23 aspires to be the greatest offline convention of the
          brightest contestants in the country, working their way through
          intense events ranging from hackathons, contests, and conferences, all
          topped with an icing of entertaining shows and events.
        </motion.p>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Link to="/oldsponsors" className={styles["just"]}>
              Past Sponsors
            </Link>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {" "}
            <Link to="/oldevents" className={styles["just"]}>
              Past Events
            </Link>
          </Grid>
        </Grid>
        <p className={styles["heading1"]}>Our Sponsors</p>
        <div className={styles["sponsors-container"]}>
          <motion.div
            initial={{ y: 100 }}
            whileInView={{ y: 0 }}
            transition={{
              delay: 0.1,
              duration: 1,
            }}
            className={styles["sponsor-card"]}
          >
            <div className={styles["sponsor-card-inner-container"]}>
              <img
                src={`${process.env.PUBLIC_URL}/sponsors/threeway.svg`}
                alt="Threeway logo"
              />
              <div className={styles["sponsor-name"]}>Threeway</div>
              <div className={styles["sponsor-type"]}>Web3 Partner</div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
