import React, { useEffect, useRef } from "react";
import SidebarMenu from "../../pages/public/component/SidebarMenu/SidebarMenu";
import Scrollbar from "./Scrollbar/Scrollbar";
import { ReactComponent as NavbarSvgTop } from "../../svg/navbar-top.svg";
import { ReactComponent as NavbarSvgMiddle } from "../../svg/navbar-middle.svg";
import { ReactComponent as NavbarSvgBottom } from "../../svg/navbar-bottom.svg";
import { useMediaQuery } from "@mui/material";
import styles from "./Sidebar.module.css";
// social icons
import LinkedIn from "@mui/icons-material/LinkedIn";
import Instagram from "@mui/icons-material/Instagram";
import Twitter from "@mui/icons-material/Twitter";

const Sidebar = () => {
  const scrollNotVisible = useMediaQuery("(max-width:450px)");
  return (
    <div className={styles["navbar-container"]}>
      <div className={`${styles["navbar-top"]} ${styles["navbar"]}`}>
        <NavbarSvgTop />
        <div className={styles["hamburger-menu"]}>
      <div className={styles["blur-strip"]}></div>
          <SidebarMenu />
        </div>
      </div>
      {!scrollNotVisible && (
        <>
          <div className={`${styles["navbar-middle"]} ${styles["navbar"]}`}>
            <NavbarSvgMiddle />
            <Scrollbar />
          </div>

          <div className={`${styles["navbar-bottom"]} ${styles["navbar"]}`}>
            <NavbarSvgBottom />
            <div className={styles["navbar-blackboxes"]}>
              <a
                target="_blank"
                href="https://www.linkedin.com/company/xpecto-tech/"
                className={styles["navbar-icons"]}
              >
                <LinkedIn />
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/tech.xpecto"
                className={styles["navbar-icons"]}
              >
                <Instagram />
              </a>
              <a
                target="_blank"
                href="https://www.twitter.com/XpectoTech"
                className={styles["navbar-icons"]}
              >
                <Twitter />
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
