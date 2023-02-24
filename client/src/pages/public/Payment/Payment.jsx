import React, { useEffect, useMemo, useState } from "react";
import styles from "./Payment.module.css";
import Layout from "../component/Layout/Layout";
import { ThreeCircles } from "react-loader-spinner";
import axios from "axios";

const Payment = () => {
  const [paymentDetails, setPaymentDetails] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fire window scroll event to update scrollbar
    window.dispatchEvent(new Event("scroll"));
  }, [paymentDetails]);

  const getPaymentDetails = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKENDURL}/api/payment/details`;
      const data = await axios.get(url);

      setPaymentDetails((prev) => data.data.data);
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
    getPaymentDetails();
  }, []);

  return (
    <>
      <Layout dataColor="#00ddcc">
        <div className={styles["header"]}>
          <h1 className={styles["events-page-heading"]}>Payment</h1>

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
                innerCircleColor="#00ddcc"
                middleCircleColor=""
              />
            </div>
          ) : !paymentDetails ? null : (
            <div className={styles["payment-main"]}>
              <div className={styles["content-container"]}>
                <div className={styles["message"]}>
                  <h1 className={styles["amount"]}>
                    Rs. {paymentDetails.amount} per person
                  </h1>
                  <h1>For offline participation</h1>
                  <h2>
                    INCLUDED <br />
                    {paymentDetails.includes}
                  </h2>
                  <h1 className={styles["payment-deadline"]}>
                    Deadline for fee payment
                    <br />
                    {paymentDetails.deadline}
                  </h1>
                  {/* <h2>Payment to be made by CONTINGENT LEADER ONLY</h2> */}
                  <h2>Please fill the form after Payment</h2>
                  {/* <h2></h2> */}
                </div>
                <div className={styles["content-inner"]}>
                  <a
                    href={paymentDetails.formLink}
                    target="_blank"
                    className={styles["form-link"]}
                  >
                    FORM
                  </a>
                  <div className={styles["info"]}>
                    <div className={styles["account-name"]}>
                      <span>Account Name</span>
                      <span>{paymentDetails.accountName}</span>
                    </div>
                    <div className={styles["account-name"]}>
                      <span>Bank Name</span>
                      <span>{paymentDetails.bankName}</span>
                    </div>
                    <div className={styles["account-name"]}>
                      <span>Bank Branch</span>
                      <span>{paymentDetails.bankBranch}</span>
                    </div>
                    <div className={styles["account-number"]}>
                      <span>Account Number</span>
                      <span>{paymentDetails.accountNumber}</span>
                    </div>
                    <div className={styles["ifsc-code"]}>
                      <span>IFSC Code</span>
                      <span>{paymentDetails.ifscCode}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Payment;
