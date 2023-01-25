import React, { useEffect, useRef } from 'react'
import styles from"./About.module.css"
import { Button, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom';
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
      const midIntersecting = top <= 2 && mid <= window.screen.height && mid >= 0;
      const isElementVisible = top <= 2 && bottom >= window.screen.height;
      // console.log(top, bottom, window.screen.height,isElementVisible)
      if (midIntersecting || isElementVisible) {
        // console.log("here",midIntersecting)
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
        data-color="#1AF527"
        className={styles["aboutcontainer"]}
      >
        <p className={styles["heading1"]}>ABOUT US</p>
        <p className={styles["aboutcontent"]}>
          <br/>
          XPECTO’23 is the second edition of IIT Mandi’s afresh Inter College Technical Fest, organised by the Science and Technical Council (SNTC) at IIT Mandi. 
          <br />
          <br />
          XPECTO’22 envisioned a platform where our nation’s astute
          and beaming minds could unite and dazzle in discussions and
          competitions relating to diverse science, technology, and management
          domains.
          <br /> 
          <br /> 
          After the astounding participation of 7200+ contestants from
          650+ colleges across India, it is back with another thunderous
          edition. 
          <br />
          <br />
          XPECTO’23 now flaunts a plethora of offline events, where the
          contestants will be accommodated in IIT Mandi. 
          <br />
          <br />
          XPECTO’23 aspires to be the greatest offline convention of the brightest contestants in the
          country, working their way through intense events ranging from
          hackathons, contests, and conferences, all topped with an icing of
          entertaining shows and events.
        </p>
        <Grid container  >
       {/* <Grid  item xs={12}sm={6} md={6}display="flex" justifyContent="center" alignItems="center" padding={2} color="yellow">  <TextField   id="outlined-basic" size="small" label="Firstname" value={user.firstname} onChange={signupchange}name="firstname"variant="outlined" disabled/>
</Grid>
       <Grid  item xs={12}sm={6} md={6}display="flex" justifyContent="center" alignItems="center" padding={2}>  <TextField id="outlined-basic" required size="small" label="Lastname" value={newdata.lastname} onChange={signupchange}name="lastname"variant="outlined" />
</Grid> */}
       <Grid  item xs={12}sm={6} md={6}display="flex" justifyContent="center" alignItems="center" ><a href='/oldsponsors' className={styles["just"]} >Past Sponsors</a> 
</Grid>
       <Grid  item xs={12}sm={6} md={6}display="flex" justifyContent="center" alignItems="center"> <a href='/oldevents' className={styles["just"]}>Past Events</a> 
</Grid>
       

       </Grid>
      </div>
    </>
  );
}
