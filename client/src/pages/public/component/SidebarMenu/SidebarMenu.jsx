import React, { useEffect, useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import styles from "./SidebarMenu.module.css";
import axios from "axios";
function SidebarMenu() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [prevColor, setPrevColor] = useState("#faea09");

  useEffect(() => {
    if (sidebarOpen) {
      setPrevColor(
        document.body.style.getPropertyValue("--current-page-color")
      );
      document.body.style.setProperty("--current-page-color", "#ccf1e0");
      document.body.style.overflow = "hidden";
    } else {
      if (prevColor)
        document.body.style.setProperty("--current-page-color", prevColor);
      document.body.style.overflow = "unset";
    }
  }, [sidebarOpen]);
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setSidebarOpen((prev) => false);
      }
    };
    document.addEventListener("keydown", keyDownHandler);

    // 👇️ clean up event listener
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const [loadingUser, setLoadingUser] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userdetails, setuserdetails] = useState({ data: {} });
  const [imageurl, setimageurl] = useState();
  const getprofiledata = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKENDURL}/api/user`;
      const data = await axios.get(url);
      setLoadingUser((prev) => false);
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
  return (
    <>
      <button
        className={styles.sidebarToggle}
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        <svg
          className={`${styles.sidebarIcon} ${
            sidebarOpen ? styles.sidebarIconChange : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <line
            x1="10"
            y1="24"
            x2="90"
            y2="24"
            stroke="black"
            strokeWidth={10}
          />
          <line
            x1="10"
            y1="50"
            x2="90"
            y2="50"
            stroke="black"
            strokeWidth={10}
          />
          <line
            x1="10"
            y1="76"
            x2="90"
            y2="76"
            stroke="black"
            strokeWidth={10}
          />
        </svg>
      </button>
      <div
        className={`${styles.sidebarBackdrop} ${
          sidebarOpen ? styles.sidebarBackdropOpen : ""
        }`}
      >
        <div
          className={`${styles.sidebarContainer} ${
            sidebarOpen ? styles.sidebarOpen : ""
          }`}
        >
          {/* --animation-order species order of animations */}
          <button
            style={{ "--animation-order": 1 }}
            className={styles.sidebarBtn}
          >
            <Link smooth to="/#" onClick={() => setSidebarOpen(false)}>
              HOME
            </Link>
          </button>
          <button
            style={{ "--animation-order": 2 }}
            className={styles.sidebarBtn}
          >
            <Link smooth to="/#about" onClick={() => setSidebarOpen(false)}>
              ABOUT US
            </Link>
          </button>
          {/* <button
            style={{ "--animation-order": 3 }}
            className={styles.sidebarBtn}
          >
            <Link smooth to="/profile" onClick={() => setSidebarOpen(false)}>
              PROFILE
            </Link>
          </button> */}
          <button
            style={{ "--animation-order": 4 }}
            className={styles.sidebarBtn}
          >
            <Link to="/events">EVENTS</Link>
          </button>
          {!loadingUser && isAuthenticated ? (
            <button
              style={{ "--animation-order": 3 }}
              className={styles.sidebarBtn}
            >
              <Link smooth to="/profile" onClick={() => setSidebarOpen(false)}>
                PROFILE
              </Link>
            </button>
          ) : (
            ""
          )}
          {/* <button
            style={{ "--animation-order": 4 }}
            className={styles.sidebarBtn}
          >
            <Link to="/sponsors">SPONSORS</Link>
          </button> */}
          {/* <button
            style={{ "--animation-order": 5 }}
            className={styles.sidebarBtn}
          >
            <Link to="/timeline">TIMELINE</Link>
          </button> */}
          {/* <button
            style={{ "--animation-order": 6 }}
            className={styles.sidebarBtn}
          >
            <Link to="/workshops">WORKSHOPS</Link>
          </button> */}
          {/* <button
            style={{ "--animation-order": 7 }}
            className={styles.sidebarBtn}
          >
            <Link to="/faq">FAQ</Link>
          </button> */}
        </div>
      </div>
    </>
  );
}

export default SidebarMenu;
