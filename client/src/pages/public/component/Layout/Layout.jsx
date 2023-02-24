import React, { useEffect } from "react";
import styles from "./Layout.module.css";

function LayoutPage({ children, dataColor }) {
  useEffect(() => {
    let color = dataColor;
    if (!dataColor) color = "#f8e856";
    document.body.style.setProperty("--current-page-color", color);
  }, [dataColor]);

  return (
    <div
      className={styles.layout}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/home/background.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      
      {children}
    </div>
  );
}

export default LayoutPage;
