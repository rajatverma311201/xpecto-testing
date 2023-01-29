import React from "react";
import styles from "./sponsor.module.css";
import { oldsponsors } from "./oldsponsorsinfos";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { ReactComponent as FixedLogo } from "../../../svg/xpecto-logo.svg";

export default function Sponsor() {

  const [oldsponsorsdata, setoldsponsordata] = useState(oldsponsors);
  const [spontype, setspontype] = useState([
    { name: "Associate Sponsors" },
    { name: "Gold Sponsors" },
    { name: "Bronze Sponsors" },
    { name: "Event Sponsors" },
    { name: "Partners" },
  ]);
  return (
    <>
      <Sidebar />
      <div
        className={`${styles["fixed-logo"]} ${styles["fixed-logo-visible"]}`}
      >
        <FixedLogo />
      </div>
      <div
        data-color="#f8e856"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/home/background.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div className={styles["container"]}>
          <p className={styles["heading1"]}>Our Past Sponsors</p>
          {spontype.map((spon) => {
            return (
              <div key={spon.name}>
                <p className={styles["heading2"]}>{spon.name}</p>
                <Grid container className={styles["container2"]}>
                  {oldsponsorsdata.map((element) => {
                    return (
                      element.spon_type === spon.name && (
                        <Grid
                          item
                          xs={12}
                          md={3}
                          sm={12}
                          className={styles["sponsordiv"]}
                          rowSpacing={3}
                        >
                          <a
                            href={element.spon_sitelink}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img
                              src={element.spon_imagelink}
                              alt={element.sponsor_name}
                            />
                            {element.spon_type === "Partners" && (
                              <p className={styles["eventpartners"]}>
                                {element.spon_additionalinfo}
                              </p>
                            )}
                          </a>
                        </Grid>
                      )
                    );
                  })}
                </Grid>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
