import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import styles from "./SidebarMenu.module.css";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { Modal, Box } from "@mui/material";
function SidebarMenu() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [prevColor, setPrevColor] = useState(undefined);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
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

      handleClose();
      navigate("/events");
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [loadingUser, setLoadingUser] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getprofiledata = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKENDURL}/api/user`;
      const data = await axios.get(url);
      setLoadingUser((prev) => false);
      const usrDATA = data.data.user;

      if (usrDATA.email) {
        setIsAuthenticated((prev) => true);
      }
    } catch (err) {
      setIsAuthenticated((prev) => false);
      console.log(err);
    }
  };
  const linkClicked = (e) => {
    e.stopPropagation();
    setSidebarOpen(false);
  };
  useEffect(() => {
    getprofiledata();
  }, []);

  const eventClickHandler = (e) => {
    e.preventDefault();
    if (!loadingUser && !isAuthenticated) {
      handleOpen();
    }
    navigate("/events");
  };
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
        onClick={() => setSidebarOpen(false)}
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
            <Link smooth to="/#" onClick={linkClicked}>
              HOME
            </Link>
          </button>
          <button
            style={{ "--animation-order": 2 }}
            className={styles.sidebarBtn}
          >
            <Link smooth to="/#about" onClick={linkClicked}>
              ABOUT US
            </Link>
          </button>
          <button
            style={{ "--animation-order": 3 }}
            className={styles.sidebarBtn}
          >
            <Link smooth to="/#contact" onClick={linkClicked}>
              CONTACT US
            </Link>
          </button>
          {/* <button
            style={{ "--animation-order": 3 }}
            className={styles.sidebarBtn}
          >
            <Link smooth to="/profile" onClick={linkClicked}>
              PROFILE
            </Link>
          </button> */}
          <button
            style={{ "--animation-order": 4 }}
            className={styles.sidebarBtn}
          >
            <Link onClick={eventClickHandler}>EVENTS</Link>
          </button>
          {!loadingUser && isAuthenticated ? (
            <button
              style={{ "--animation-order": 5 }}
              className={styles.sidebarBtn}
            >
              <Link smooth to="/profile" onClick={linkClicked}>
                PROFILE
              </Link>
            </button>
          ) : (
            ""
          )}
          <button
            style={{ "--animation-order": 6 }}
            className={styles.sidebarBtn}
          >
            <Link to="/payment-info">PAYMENT</Link>
          </button>
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
          <button
            style={{ "--animation-order": 7 }}
            className={styles.sidebarBtn}
          >
            <Link smooth to="/ourteam" onClick={linkClicked}>
              MEET OUR TEAM
            </Link>
          </button>
          <button
            style={{ "--animation-order": 8 }}
            className={styles.sidebarBtn}
          >
            <Link smooth to="/faq" onClick={linkClicked}>
              FAQS
            </Link>
          </button>
        </div>
      </div>

      <Modal
        sx={{ backdropFilter: "blur(25px)" }}
        open={open}
        // onClose={handleClose}
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

export default SidebarMenu;
