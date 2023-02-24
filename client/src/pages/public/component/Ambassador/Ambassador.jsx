import React, { useEffect, useRef } from "react";
import styles from "./Ambassador.module.css";
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
        data-color="#C078F7"
        className={styles["aboutcontainer"]}
      >
        <p className={styles["heading1"]}>Campus Ambassador Program</p>
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
          Represent Xpecto in your college community and encourage students to
          participate by highlighting the advantages of taking part in the fest.
          Win awesome goodies, free passes to the fest and much more!
       
        </motion.p>
      <Grid container>
      <Grid  item xs={12}sm={6} md={6}display="flex" justifyContent="center" alignItems="center" ><Link to='/campusambassadors' className={styles["just"]} >Read More</Link></Grid>
      </Grid>
      </div>

      {/* <img
        src={`${process.env.PUBLIC_URL}/home/5.png`}
        alt="graphic"
        className={styles["graphic1"]}
      />
      <img
        src={`${process.env.PUBLIC_URL}/home/6.png`}
        alt="graphic"
        className={styles["graphic2"]}
      /> */}
    </>
  );
}
