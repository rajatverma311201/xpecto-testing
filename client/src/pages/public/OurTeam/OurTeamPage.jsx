import React, { useEffect, useState } from "react";
import styles from "./OurTeamPage.module.css";
import Layout from "./../component/Layout/Layout";
// import MemberCard from "./MemberCard";
import axios from "axios";
import { ReactComponent as BackToTop } from "../../../svg/backtop-btn.svg";
import { HashLink } from "react-router-hash-link";
import { ThreeCircles } from "react-loader-spinner";

import { Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";


const teamHeadings = [
  "Overall Coordinators",
  "Planning And Management",
  "Public Relations",
  "Design",
  "Web Development",
  "Media",
  "Photography And Cinematics",
  "Content",
  "Corporate Relations",
  "Finance",
  "Hospitality",
  "Security",
  "Decoration",
  "Mentors",
];

const OurTeamPage = () => {
  const [teamMembers, setTeamMembers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fire window scroll event to update scrollbar
    window.dispatchEvent(new Event("scroll"));
  }, [teamMembers]);

  const getAllteamMembers = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKENDURL}/api/teamMembers/`;
      const data = await axios.get(url);
      setTeamMembers((prev) => data.data.data);
      // console.log();
      setIsLoading((prev) => false);
      // const teamsObj = {};
    } catch (err) {
      setIsLoading((prev) => true);
      console.log(err);
    }
  };

  useEffect(() => {
    getAllteamMembers();
  }, []);

  const splitAndJoin = (inp) =>
    inp
      .trim()
      .toLowerCase()
      .split(/\s{1,}/g)
      .join("-");

  const isSameTeam = (a, b) => {
    if (splitAndJoin(a) == splitAndJoin(b)) return true;
    else return false;
  };
  const [fixedLogoVisible, setFixedLogoVisible] = useState(false);
  useEffect(() => {
    const scrollEvent = () => {
      if (window.scrollY > window.screen.height / 2) {
        setFixedLogoVisible(true);
      } else {
        setFixedLogoVisible(false);
      }
    };
    window.addEventListener("scroll", scrollEvent, { passive: true });
    return () => {
      window.removeEventListener("scroll", scrollEvent, {
        passive: true,
      });
    };
  }, []);

  return (
    <>
      <HashLink
        smooth
        to="#"
        className={`${styles["back-to-top"]} ${
          fixedLogoVisible && styles["back-to-top-visible"]
        }`}
      >
        <BackToTop />
      </HashLink>
      <Layout
        // dataColor="#00b4d8"
        dataColor="#00ddcc"
      >
        <div className={styles["header"]}>
          <h1 className={styles["main-heading"]}>MEET OUR TEAM</h1>
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
              innerCircleColor="#00ddcc"
              middleCircleColor=""
            />
          </div>
        ) : (
          <main className={styles["container"]}>
            <div className={styles["teams-container"]}>
              {teamHeadings.map((team) => {
                return (
                  <section key={team} className={styles["team-container"]}>
                    <div className={styles["team-heading"]}>{team}</div>
                    <div className={styles["team-cards-container"]}>
                      {teamMembers.map((member) => {
                        if (isSameTeam(member.team, team)) {
                          return (
                            <MemberCard key={member._id} member={member} />
                          );
                        }
                      })}
                    </div>

                    <div className={styles["line"]}></div>
                  </section>
                );
              })}
            </div>
          </main>
        )}
      </Layout>
    </>
  );
};

export default OurTeamPage;


// import { WifiLoader } from "react-awesome-loaders";

const MemberCard = ({ member }) => {
  const iconStyles = {
    width: "30px",
    height: "30px",
  };
  const placeholderComponent = (
    <ThreeCircles
      height="100"
      width="100"
      color="#fff"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor=""
      innerCircleColor=""
      middleCircleColor=""
    />
  );
  return (
    <div className={styles["card-container"]}>
      <div className={styles["card-inner"]}>
        <div className={styles["image-container"]}>
          <LazyLoadComponent placeholder={placeholderComponent}>
            <img
              className={styles["image"]}
              src={`https://drive.google.com/uc?export=view&id=${
                member.image.split("=")[1]
              }`}
              // loading="lazy"
              alt={member.name}
            />
          </LazyLoadComponent>
        </div>
        <div className={styles["name-container"]}>
          <div className={styles["name"]}>{member.name}</div>
        </div>
        <div className={styles["role-container"]}>
          <div className={styles["role"]}>{member.role}</div>
        </div>

        {/* LINKS  */}
        <div className={styles["links-container"]}>
          {member.facebookLink ? (
            <div className={`${"link"} ${"link--facebook"}`}>
              <a
                className={styles["link-icon"]}
                href={member.facebookLink}
                target="_blank"
              >
                <Facebook sx={iconStyles} />
              </a>
            </div>
          ) : (
            ""
          )}

          {member.instagramLink ? (
            <div className={`${"link"} ${"link--instagram"}`}>
              <a
                className={styles["link-icon"]}
                href={member.instagramLink}
                target="_blank"
              >
                <Instagram sx={iconStyles} />
              </a>
            </div>
          ) : (
            ""
          )}

          {member.linkedinLink ? (
            <div className={`${"link"} ${"link--linkedin"}`}>
              <a
                className={styles["link-icon"]}
                href={member.linkedinLink}
                target="_blank"
              >
                <LinkedIn sx={iconStyles} />
              </a>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
