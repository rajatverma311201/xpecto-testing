import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
// import Razorpay from "../component/payment/Razorpay";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useDispatch } from "react-redux";
import * as action from "../../../actions/index";
import About from "../component/About/About";
import { useRef } from "react";
import { ReactComponent as FixedLogo } from "../../../svg/xpecto-logo.svg";
import { ReactComponent as BackToTop } from "../../../svg/backtop-btn.svg";
import LinkedIn from "@mui/icons-material/LinkedIn";
import Instagram from "@mui/icons-material/Instagram";
import Twitter from "@mui/icons-material/Twitter";
import { GoogleLogin } from "@react-oauth/google";
import BasicModal from "./BasicModal";
import Modal from "@mui/material/Modal";import LayoutPage from "../component/Layout/Layout";

export default function Home() {
  const user = useSelector((state) => state.userinfo);
  const dispatch = useDispatch();
  const [newuser, setnewuser] = useState(user);
  const navigate = useNavigate();
  const [isuser, setisuser] = useState(false);
  const [bool, setbool] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const getUser = async (props) => {
  //   try {
  //     const url = `${process.env.REACT_APP_BACKENDURL}/auth/login`;
  //     const { data } = await axios.get(url, { withCredentials: true });
  //     setnewuser((newuser) => ({
  //       ...newuser,
  //       email: data.data.email,
  //       displayname: data.data.displayName,
  //       image: data.data.image,
  //       firstname: data.data.firstName,
  //     }));
  //     const d = (newuser) => {
  //       dispatch(action.changeuserinfo(newuser));
  //     };
  //     d(newuser);
  //     setisuser(true);
  //     if (data.isnewuser) {
  //       setbool(true);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  //  if(data.isnewuser){
  // 	navigate("/signup");
  //  }
  // useEffect(() => {
  //   getUser();
  //   const nav = () => {
  //     if (bool) {
  //       navigate("/signup");
  //     }
  //   };
  //   nav();
  // }, [isuser, user]);

  // const usera = userDetails.user;
  // const logout = () => {
  //   window.open(`${process.env.REACT_APP_BACKENDURL}/auth/logout`, "_self");
  // };
  const loginSuccessHandler = async (cred) => {
    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_BACKENDURL}/api/user/login`,
        {
          credential: cred,
        }
      );
      // console.log(resp);
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
  const [userdetails, setuserdetails] = useState({ data: {} });
  const [imageurl, setimageurl] = useState();
  const getprofiledata = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKENDURL}/api/user`;
      const data = await axios.get(url);
      setLoadingUser(false);
      const usrDATA = data.data.user;
      setuserdetails((userdetails) => ({
        ...userdetails,
        ...usrDATA,
      }));
      setimageurl(usrDATA.image);
      if (usrDATA.email) {
        setIsAuthenticated((prev) => true);
      }
    } catch (err) {
      setIsAuthenticated((prev) => false);
      console.log(err);
    }
  };
  useEffect(() => {
    getprofiledata();
  }, []);
  const googleAuth = async () => {
    window.open(
      `${process.env.REACT_APP_BACKENDURL}/auth/google/callback`,
      "_self"
    );
  };

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

  // color change on scroll
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
  return (
    <>
      <LayoutPage>
        <div
          className={`${styles["fixed-logo"]} ${
            fixedLogoVisible && styles["fixed-logo-visible"]
          }`}
        >
          <FixedLogo />
        </div>
        <HashLink
          smooth
          to="/#"
          className={`${styles["back-to-top"]} ${
            fixedLogoVisible && styles["back-to-top-visible"]
          }`}
        >
          <BackToTop />
        </HashLink>
        <Sidebar />
        <div
          ref={mainLogoRef}
          data-color="#faea09"
          className={styles["section1"]}
          id="#"
        >
          <img
            className={styles["section1-plus"]}
            src={`${process.env.PUBLIC_URL}/home/plusplus.svg`}
            alt="plusplusgraphic"
          />
          <div className={styles["mainlogo"]}>
            <img
              src={`${process.env.PUBLIC_URL}/home/mainlogo.svg`}
              alt="XpectoLogo"
            />
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
          </div>

          <img
            className={styles["section1-rightrectangle"]}
            src={`${process.env.PUBLIC_URL}/home/rightrectangle.svg`}
            alt="rightrectangle"
          />
          <HashLink
            smooth
            to="/#about"
            className={styles["section1-scrolldown"]}
          >
            <img
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

          <img
            className={styles["section1-register"]}
            src={`${process.env.PUBLIC_URL}/home/register.svg`}
            alt="register"
            onClick={handleOpen}
          />
          ) : (
            ""
          )}
          {/* <Button variant="outlined" onClick={googleAuth} sx={{ m: 5 }}>
      <img
            className={styles["section1-register"]}
            src={`${process.env.PUBLIC_URL}/home/register.svg`}
            alt="register"
          />
      </Button> */}
        </div>
        <div className={styles["section1"]} id="about">
          <About />
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
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              loginSuccessHandler(credentialResponse.credential);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </Modal>
    </>
  );
}
