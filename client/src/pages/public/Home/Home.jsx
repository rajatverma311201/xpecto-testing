import React from "react";
import styles from "./Home.module.css";

import CountdownTimer from "./CountdownTimer";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
// import Razorpay from "../component/payment/Razorpay";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as action from "../../../actions/index";
import About from "../component/About/About";
import Ambassador from "../component/Ambassador/Ambassador";
import { useRef } from "react";
import { ReactComponent as FixedLogo } from "../../../svg/xpecto-logo.svg";
import { ReactComponent as BackToTop } from "../../../svg/backtop-btn.svg";
import LinkedIn from "@mui/icons-material/LinkedIn";
import Instagram from "@mui/icons-material/Instagram";
import Twitter from "@mui/icons-material/Twitter";
import { GoogleLogin } from "@react-oauth/google";
import { Modal, Box } from "@mui/material";
import LayoutPage from "../component/Layout/Layout";
import Contact from "../component/Contact/Contact";
import { motion } from "framer-motion";
export default function Home() {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const loginSuccessHandler = async (cred) => {
    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_BACKENDURL}/api/user/login`,
        {
          credential: cred,
        }
      );
      localStorage.setItem("UserJwtToken", resp.data.jwtToken);
      if (resp.data.isNewUser) {
        navigate("/signup");
      }

      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  const getprofiledata = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKENDURL}/api/user`;
      const data = await axios.get(url);
      setLoadingUser(false);
      const usrDATA = data.data.user;
      if (usrDATA.email) {
        setIsAuthenticated((prev) => true);
      }
    } catch (err) {
      setLoadingUser(false);
      setIsAuthenticated((prev) => false);
      console.log(err);
    }
  };
  useEffect(() => {
    getprofiledata();
  }, []);

  const [fixedLogoVisible, setFixedLogoVisible] = useState(false);
  useEffect(() => {
    const scrollEvent = () => {
      if (window.scrollY > window.screen.height / 2) {
        setFixedLogoVisible(true);
      } else {
        setFixedLogoVisible(false);
      }
    };
    window.addEventListener("scroll", scrollEvent, { passive: true });
    return () => {
      window.removeEventListener("scroll", scrollEvent, { passive: true });
    };
  }, []);

  const mainLogoRef = useRef(null);
  useEffect(() => {
    const current = mainLogoRef.current;
    const scrollEvent = () => {
      const rect = current.getBoundingClientRect();
      const top = rect.top;
      const bottom = rect.bottom;
      const mid = top + current.clientHeight / 2;
      const midIntersecting =
        top <= 2 && mid <= window.screen.height && mid >= 0;
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
  }, [mainLogoRef]);

  // console.log("usedetail " ,user)

  const XPECTO_TIME = new Date("March 3, 2023").getTime();
  return (
    <>
      <LayoutPage>
        <motion.div
          initial={{ y: -100 }}
          whileInView={{ y: 0 }}
          transition={{
            type: "spring",
            bounce: 0.4,
            duration: 1,
          }}
          className={`${styles["fixed-logo"]} ${
            fixedLogoVisible && styles["fixed-logo-visible"]
          }`}
        >
          <FixedLogo />
        </motion.div>
        <HashLink
          smooth
          to="/#"
          className={`${styles["back-to-top"]} ${
            fixedLogoVisible && styles["back-to-top-visible"]
          }`}
        >
          <BackToTop />
        </HashLink>
        {/* <Sidebar /> */}
        <div
          ref={mainLogoRef}
          data-color="#f8e856"
          className={styles["section1"]}
          id="#"

          // initial={{opacity:0}}
          // whileInView={{opacity:1 }}
          // transition={{
          //   // type: "spring",
          //   // bounce: 0.4,
          //   duration: 1,
          // }}
        >
          {/* <img
            className={styles["section1-plus"]}
            src={`${process.env.PUBLIC_URL}/home/plusplus.svg`}
            alt="plusplusgraphic"
          /> */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              bounce: 0.4,
              duration: 1,
              delay: 1,
            }}
            className={styles["mainlogo"]}
          >
            <img
              src={`${process.env.PUBLIC_URL}/home/mainlogo.svg`}
              alt="XpectoLogo"
            />

            <CountdownTimer targetDate={XPECTO_TIME} />
            {/* temporary solution start */}
            <div className={styles["social-icons"]}>
              <a
                target="_blank"
                href="https://www.linkedin.com/company/xpecto-tech/"
                className={styles["home-icons"]}
              >
                <LinkedIn />
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/tech.xpecto"
                className={styles["home-icons"]}
              >
                <Instagram />
              </a>
              <a
                target="_blank"
                href="https://www.twitter.com/XpectoTech"
                className={styles["home-icons"]}
              >
                <Twitter />
              </a>
            </div>
            {/* temporary solution end */}
          </motion.div>

          {/* <motion.img
            className={styles["section1-rightrectangle"]}
            src={`${process.env.PUBLIC_URL}/home/rightrectangle.svg`}
            alt="rightrectangle"
            initial={{ y: "-100%" }}
            whileInView={{ y: 0 }}
            transition={{
              type: "spring",
              bounce: 0.4,
              duration: 1.5,
            }}
          /> */}
          <HashLink
            smooth
            to="/#about"
            className={styles["section1-scrolldown"]}
          >
            <motion.img
              initial={{ y: "150%" }}
              whileInView={{ y: 0 }}
              transition={{
                type: "spring",
                bounce: 0.4,
                duration: 1.5,
              }}
              src={`${process.env.PUBLIC_URL}/home/scrolldown.svg`}
              alt="scrolldown"
            />
          </HashLink>
          <img
            className={styles["section1-bottomleftgraphic"]}
            src={`${process.env.PUBLIC_URL}/home/lineslines.svg`}
            alt="bottomleftgraphic"
          />
          {!loadingUser && !isAuthenticated ? (
            <button
              className={styles["section1-register"]}
              onClick={handleOpen}
            >
              SIGN IN
            </button>
          ) : (
            ""
          )}
        </div>
        <motion.div
          initial={{ y: 0 }}
          whileInView={{ y: 0 }}
          transition={{
            // type: "spring",
            // bounce: 0.4,
            duration: 1,
          }}
          className={styles["section1"]}
          id="about"
        >
          <About />
        </motion.div>
        <motion.div
          initial={{ y: 0 }}
          whileInView={{ y: 0 }}
          transition={{
            // type: "spring",
            // bounce: 0.4,
            duration: 1,
          }}
          className={styles["section1"]}
          id="about"
        >
          <Ambassador />
        </motion.div>
        <div className={styles["section2"]} id="contact">
          <Contact />
        </div>
      </LayoutPage>

      {/* <div className={styles["page"]}>
        <Link to="/admin/dashboard">Go to Admin Dashboard</Link>
      </div> */}
      {/* <Button variant="outlined" onClick={googleAuth} sx={{ m: 5 }}>
      <img
            className={styles["section1-register"]}
            src={`${process.env.PUBLIC_URL}/home/register.svg`}
            alt="register"
          />
      </Button> */}
      {/* <Button variant="outlined" onClick={googleAuth} sx={{ m: 5 }}>
        Login with google
      </Button>
      <Button variant="outlined" onClick={logout} sx={{ m: 5 }}>
        Logout
      </Button> */}
      {/* <h1>Name : {user.firstname}</h1>
      <h1>Name : {user.email}</h1> */}
      {/* <button onClick={(nav())}> got got </button> */}
      {/* <div>
        <Razorpay />
      </div> */}
      <Modal
        sx={{ backdropFilter: "blur(25px)" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <GoogleLogin
            size="large"
            width="300"
            useOneTap
            onSuccess={(credentialResponse) => {
              loginSuccessHandler(credentialResponse.credential);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </Box>
      </Modal>
    </>
  );
}
