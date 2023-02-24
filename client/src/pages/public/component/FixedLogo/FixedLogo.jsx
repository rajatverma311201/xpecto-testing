import React from "react";
import { useLocation } from "react-router-dom";
import { ReactComponent as FixedLogoSvg } from "../../../../svg/xpecto-logo.svg";
import styles from "./FixedLogo.module.css";

function FixedLogo() {
  const { pathname } = useLocation();
  
  return (
    <>
      {pathname !== "/" && (
        <div
          className={`${styles["fixed-logo"]} ${styles["fixed-logo-visible"]}`}
        >
          <FixedLogoSvg />
        </div>
      )}
    </>
  );
}

export default FixedLogo;
