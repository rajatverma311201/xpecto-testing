import { style } from "@mui/system";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import styles from "./Profile.module.css";
// import Sidebar from "../SidebarMenu/SidebarMenu";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { ReactComponent as FixedLogo } from "../../../../svg/xpecto-logo.svg";

import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";

const Profile = () => {
    const navigate = useNavigate();
    const [loadingUser, setLoadingUser] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    if (!loadingUser && !isAuthenticated) {
        navigate("/");
    }
    const eventsRef = useRef(null);

    useEffect(() => {
        const current = eventsRef.current;
        document.body.style.setProperty(
            "--current-page-color",
            current.getAttribute("data-color")
        );
    });
    const [userdetails, setuserdetails] = useState({ data: {} });
    const [imageurl, setimageurl] = useState();
    const getprofiledata = async () => {
        try {
            const url = `${process.env.REACT_APP_BACKENDURL}/api/user`;
            const data = await axios.get(url);
            const usrDATA = data.data.user;
            setuserdetails((userdetails) => ({
              ...userdetails,
              ...usrDATA,
            }));
            setLoadingUser((prev) => false);
            if (usrDATA.email) {
                setIsAuthenticated((prev) => true);
            }
            setimageurl(usrDATA.image);
        } catch (err) {
            console.log(err);
            setIsAuthenticated((prev) => false);
        }
    };
    const logoutUser = () => {
        localStorage.removeItem("UserJwtToken");
        // navigate("/");
        window.location.reload(false);
    };
    useEffect(() => {
        getprofiledata();
    }, []);
    //   const user = useSelector((state) => state.userinfo);
    // const[userdetails,setuserdetails]=useState({data:{}});
    // const navigate=useNavigate()
    // const [imageurl,setimageurl]=useState();
    // const getprofiledata=async()=>{
    //   try{
    //          const url = `${process.env.REACT_APP_BACKENDURL}/api/user/profile`;
    //          const  data  = await axios.post(url,{
    //            user:user.email,
    //          });
    //          setuserdetails((userdetails)=>({
    //           ...userdetails,
    //           data:data.data.data
    //          }))
    //          console.log("vkkrb0",data.data.data)
    //          setimageurl(data.data.data.image);
    //     }catch{
    //          console.log("data saved sifnufreb");
    //    }
    // }
    // useEffect(()=>{
    //   getprofiledata();
    // },[])
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
                ref={eventsRef}
                className={styles["events-page-container"]}
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/home/background.jpg)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    //   backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                    //   height: "100vh",
                }}
            >
                {loadingUser ? (
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
                            innerCircleColor="#f8e856"
                            middleCircleColor=""
                        />
                    </div>
                ) : (
                    <>
                        <h2
                            className={styles["logout-button"]}
                            onClick={logoutUser}
                        >
                            LOGOUT
                        </h2>
                        <div className={styles["pback"]}>
                            <div className={styles["containers"]}>
                                <div className={styles["card-container"]}>
                                    <img
                                        className={styles["round"]}
                                        src={imageurl}
                                        alt={userdetails.displayName}
                                    />
                                    <h3>Name: {userdetails.displayName}</h3>
                                    <h6>Email ; {userdetails.email}</h6>
                                    <h6>
                                        Phone number: {userdetails.phoneNumber}
                                    </h6>
                                    <Button
                                        onClick={() => {
                                            navigate("/");
                                        }}
                                    >
                                        Home
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Profile;
