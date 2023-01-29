import React, { useEffect, useState } from "react";
import styles from "./OurTeamPage.module.css";
import Layout from "./../component/Layout/Layout";
import MemberCard from "./MemberCard";
import axios from "axios";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { ReactComponent as FixedLogo } from "../../../svg/xpecto-logo.svg";
import { ReactComponent as BackToTop } from "../../../svg/backtop-btn.svg";
import { HashLink } from "react-router-hash-link";
import { ThreeCircles } from "react-loader-spinner";
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
            <Sidebar />
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
                    <div
                        className={`${styles["fixed-logo"]} ${styles["fixed-logo-visible"]}`}
                    >
                        <FixedLogo />
                    </div>
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
                                    <section
                                        key={team}
                                        className={styles["team-container"]}
                                    >
                                        <div className={styles["team-heading"]}>
                                            {team}
                                        </div>
                                        <div
                                            className={
                                                styles["team-cards-container"]
                                            }
                                        >
                                            {teamMembers.map((member) => {
                                                if (
                                                    isSameTeam(
                                                        member.team,
                                                        team
                                                    )
                                                ) {
                                                    return (
                                                        <MemberCard
                                                            key={member._id}
                                                            member={member}
                                                        />
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
