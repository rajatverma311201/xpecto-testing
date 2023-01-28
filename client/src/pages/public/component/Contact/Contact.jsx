import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Contact.module.css";
import { Email, Phone } from "@mui/icons-material";
import { motion } from "framer-motion";
const Contact = () => {
  const contactRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const current = contactRef.current;
    const scrollEvent = () => {
      const rect = current.getBoundingClientRect();
      // console.log(rect)
      const top = rect.top;
      const bottom = rect.bottom;
      const mid = top + current.clientHeight / 2;
      const midIntersecting =
        top <= 300 && mid <= window.screen.height && mid >= 0;
      const isElementVisible = top <= 200 && bottom >= window.screen.height;
      // console.log(mid+","+top+","+bottom)
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
  }, [contactRef]);
  const squareVariants = {
    visible: { opacity: 1, transition: { duration: 1 }, y: 0 },
    hidden: { opacity: 0, y: 100 },
  };
  return (
    <motion.section
      id="contact"
      className={styles["contact-container"]}
      ref={contactRef}
      //   data-color="#cc5801"
      //   data-color="#ed7014"
      //   data-color="#00b4d8"
      data-color="#00ddcc"
      initial={{ y: 150 }}
      whileInView={{ y: 0 }}
      transition={{
        // type: "spring",
        // bounce: 0.4,
        duration: 1,
      }}
    >
      <h1 className={styles["contact-heading"]}>Contact Us</h1>
      <motion.div 
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            transition={{
              // type: "spring",
              // bounce: 0.4,
              duration: 0.75,
              delay:0.1
            }}
            
      
      className={styles["cards-container"]}>
        <div className={`${styles["card--1"]} ${styles["card"]}`}>
          <div className={styles["card-inner"]}>
            <div className={styles["card-heading"]}>
              <div>Overall Coordinators</div>
              <div className={styles["thick-line"]}></div>
            </div>
            <div className={styles["card-content"]}>
              <div className={styles["email"]}>
                <div className={styles["icon"]}>
                  <Email sx={{ color: "white", fontSize: "35px" }} />
                </div>
                <div className={styles["email-text"]}>convenor@xpecto.tech</div>
              </div>

              <div className={styles["phone"]}>
                <div className={styles["icon"]}>
                  <Phone sx={{ color: "white", fontSize: "35px" }} />
                  <div className={styles["phone-text"]}>Aryan - 8982562898</div>
                  <div className={styles["phone-text"]}>
                    Harshit - 8112500143
                  </div>
                  <div className={styles["phone-text"]}>
                    Vishal - 9540140310
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles["card--2"]} ${styles["card"]}`}>
          <div className={styles["card-inner"]}>
            <div className={styles["card-heading"]}>
              <div>Public Relations</div>
              <div className={styles["thick-line"]}> </div>
            </div>

            <div className={styles["card-content"]}>
              <div className={styles["email"]}>
                <div className={styles["icon"]}>
                  <Email sx={{ color: "white", fontSize: "35px" }} />
                </div>
                <div className={styles["email-text"]}>team@xpecto.tech</div>
              </div>
              <div className={styles["phone"]}>
                <div className={styles["icon"]}>
                  <Phone sx={{ color: "white", fontSize: "35px" }} />
                  <div className={styles["phone-text"]}>Ajeet - 8709612616</div>
                  <div className={styles["phone-text"]}>
                    Urvashi - 98722 13324
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Contact;
