import React from "react";
import styles from "./MemberCard.module.css";
import { Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import {
    LazyLoadComponent,
    LazyLoadImage,
} from "react-lazy-load-image-component";
import { ThreeCircles } from "react-loader-spinner";

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

export default MemberCard;
