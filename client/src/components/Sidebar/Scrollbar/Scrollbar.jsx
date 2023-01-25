import React, { useEffect, useRef } from "react";
import styles from "../Sidebar.module.css";

function Scrollbar() {
  const scrollContRef = useRef(null);
  const scrollBtnRef = useRef(null);

  useEffect(() => {
    const scrollbar = scrollBtnRef.current;
    const container = scrollContRef.current;

    const scrollFunc = () => {
      const height = document.body.scrollHeight;
      if (height - window.innerHeight < 0) {
        scrollbar.style.height = "0px";
        return;
      }
      scrollbar.style.height = `${
        (window.innerHeight / height) * container.clientHeight
      }px`;
      scrollbar.style.marginTop = `${
        (window.scrollY / (height - window.innerHeight)) *
        (container.clientHeight - scrollbar.clientHeight)
      }px`;
    };
    scrollFunc();

    // scroll refresh
    // const interval = setInterval(()=>{
    //   scrollFunc()
    // },2000);

    window.addEventListener("scroll", scrollFunc, { passive: true });
    window.addEventListener("resize", scrollFunc, { passive: true });

    return () => {
      // clearInterval(interval)
      window.removeEventListener("scroll", scrollFunc, { passive: true });
      window.removeEventListener("resize", scrollFunc, { passive: true });
    };
  }, [scrollContRef, scrollBtnRef]);

  return (
    <div
      ref={scrollContRef}
      className={styles["scrollbar-container"]}
      id="scrollbar-container"
    >
      <img
        ref={scrollBtnRef}
        src={`${process.env.PUBLIC_URL}/home/scrollbtn.svg`}
        className={styles["scrollbar"]}
        id="scrollbar"
      />
    </div>
  );
}

export default Scrollbar;
