import React, { useEffect, useState } from "react";
import styles from "./FaqPage.module.css";
import Layout from "../component/Layout/Layout";
// import MemberCard from "./MemberCard";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import { Accordion, AccordionDetails } from "@mui/material";

const FaqPage = () => {
  const [faqs, setFaqs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fire window scroll event to update scrollbar
    window.dispatchEvent(new Event("scroll"));
  }, [faqs]);

  const getFaqs = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKENDURL}/api/faqs/`;
      const data = await axios.get(url);

      setFaqs((prev) => data.data.data);
      // setFaqs(tempFaqs);
      // console.log();
      setIsLoading((prev) => false);
      // const teamsObj = {};
    } catch (err) {
      // setFaqs(tempFaqs);
      setIsLoading((prev) => true);
      console.log(err);
    }
  };

  useEffect(() => {
    getFaqs();
  }, []);

  return (
    <>
      <Layout
        dataColor="#00b4d8"
        // dataColor="#00ddcc"
      >
        <div className={styles["header"]}>
          <h1 className={styles["main-heading"]}>FAQ</h1>
        </div>

        {isLoading ? (
          <div className={styles["loading"]}>
            <ThreeCircles
              height="150px"
              width="150px"
              color="#fff"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor="#00b4d8"
              middleCircleColor=""
            />
          </div>
        ) : faqs.length > 0 ? (
          <main className={styles["container"]}>
            {faqs.map((faq, index) => {
              return <Faq key={index} faq={faq} />;
            })}
          </main>
        ) : (
          <h1 className={styles["coming-soon"]}>Coming Soon</h1>
        )}
      </Layout>
    </>
  );
};

export default FaqPage;

const Faq = ({ faq }) => {
  const [isAnsVisible, setIsAnsVisible] = useState(false);

  return (
    <Accordion
      expanded={isAnsVisible}
      square={true}
      className={`${styles["faq-container"]} ${
        isAnsVisible && styles["faq-open"]
      }`}
      disableGutters
      onClick={() => {
        setIsAnsVisible((prev) => !prev);
      }}
    >
      <h1 className={styles["faq-question"]}>{faq.question}</h1>
      <AccordionDetails>
        <p className={styles["faq-answer"]}>{faq.answer}</p>
      </AccordionDetails>
    </Accordion>
  );
};
