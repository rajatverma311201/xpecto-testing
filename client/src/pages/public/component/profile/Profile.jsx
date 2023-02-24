import React, { useEffect } from "react";
import { useState, useRef } from "react";
import styles from "./Profile.module.css";
import { Modal, Box } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import { WindowSharp } from "@mui/icons-material";
import Layout from "../Layout/Layout";

const Profile = () => {
  const navigate = useNavigate();
  const [loadingUser, setLoadingUser] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [openJoinTeam, setOpenJoinTeam] = useState(false);
  const [errorInJoinTeam, setErrorInJoinTeam] = useState(null);
  const [createdTeams, setCreatedTeams] = useState([]);
  const [joinedTeams, setJoinedTeams] = useState([]);
  const [loadingTeams, setLoadingTeams] = useState(true);
  const handleJoinTeamOpen = () => setOpenJoinTeam(true);
  const handleJoinTeamClose = () => {
    window.location.reload(false);

    setOpenJoinTeam(false);
  };

  const eventsRef = useRef(null);

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
  if (!loadingUser && !isAuthenticated) {
    navigate("/");
  }
  const logoutUser = () => {
    localStorage.removeItem("UserJwtToken");
    window.location.reload(false);
  };
  useEffect(() => {
    getprofiledata();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        if (!loadingUser && isAuthenticated) {
          const url = `${process.env.REACT_APP_BACKENDURL}/api/eventTeam`;
          const resp1 = await axios.get(
            `${url}/allTeams/createrId/${userdetails?._id}`
          );
          console.log(resp1.data.data.teams);
          setCreatedTeams((prev) => resp1?.data?.data?.teams);
          const resp2 = await axios.get(
            `${url}/allTeams/userId/${userdetails?._id}`
          );
          console.log(resp2.data.data.teams);
          setJoinedTeams((prev) => resp2?.data?.data?.teams);
          setLoadingTeams(false);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [userdetails]);
  const [joinCode, setJoinCode] = useState(null);
  const formSubmitHandler = async (e) => {
    setErrorInJoinTeam(null);
    try {
      e.preventDefault();

      const url = `${process.env.REACT_APP_BACKENDURL}/api/eventTeam`;

      const resp = await axios.post(url + "/add-player", {
        teamCode: joinCode,
      });

      if (resp.data.status == "success") {
        window.location.reload(false);
      }
      // console.log(resp.data);
    } catch (error) {
      setErrorInJoinTeam(error?.response?.data?.message);
      // console.log(error.response.data.message);
    }
  };
  return (
    <>
      <Layout dataColor="#5dd9ff">
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
              innerCircleColor="#5dd9ff"
              middleCircleColor=""
            />
          </div>
        ) : (
          <>
            <div className={styles["page-container"]}>
              <div className={styles["profile-main-container"]}>
                <div className="logoutdiv">
                  <h2 className={styles["logout-button"]} onClick={logoutUser}>
                    LOGOUT
                  </h2>
                </div>
                <div className={styles["details-card"]}>
                  <div className={styles["image-container"]}>
                    <img
                      src={userdetails.image}
                      alt={userdetails.name}
                      className={styles["image"]}
                    />
                  </div>
                  <div className={styles["name-container"]}>
                    <h2 className={styles["name"]}>
                      {userdetails.displayName}
                    </h2>
                  </div>
                  <div className={styles["email-container"]}>
                    <div className={styles["email"]}>{userdetails.email}</div>
                  </div>
                  <div className={styles["phone-container"]}>
                    <div className={styles["phone"]}>
                      {userdetails.phoneNumber}
                    </div>
                  </div>
                  <div className={styles["college-container"]}>
                    <div className={styles["college"]}>
                      {userdetails.collegeName}
                    </div>
                  </div>
                  <div className={styles["join-team-container"]}>
                    {" "}
                    <span
                      className={styles["join-team-button"]}
                      onClick={handleJoinTeamOpen}
                    >
                      Join A Team
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles["teams-container"]}>
                <div>
                  <h2 className={styles["teams-heading"]}>TEAMS CREATED</h2>
                  {!loadingTeams && createdTeams && createdTeams.length > 0 ? (
                    <div className={styles["teams-inner-container"]}>
                      <div className={styles["created-teams-container"]}>
                        {createdTeams.map((team) => (
                          <div
                            key={team._id}
                            className={styles["created-team-card"]}
                          >
                            <div>{team.teamName}</div>
                            <div>Event - {team.game.name}</div>
                            <div>{team.players.length} Members</div>
                            <Link to={`/profile/created-teams/${team._id}`}>
                              <button>More</button>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className={styles["not-done"]}>No Team Created</div>
                  )}
                </div>

                <div>
                  <h2 className={styles["teams-heading"]}>TEAMS JOINED</h2>
                  {!loadingTeams && joinedTeams && joinedTeams.length > 0 ? (
                    <div className={styles["teams-inner-container"]}>
                      <div className={styles["joined-teams-container"]}>
                        {joinedTeams.map((team) => (
                          <div
                            key={team._id}
                            className={styles["joined-team-card"]}
                          >
                            <div>{team.teamName}</div>
                            <div>Event - {team.game.name}</div>
                            <div>Creator - {team.creater.displayName}</div>
                            <div>{team.creater.email}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className={styles["not-done"]}>No Team Joined</div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </Layout>

      <Modal
        sx={{ backdropFilter: "blur(20px)" }}
        open={openJoinTeam}
        onClose={handleJoinTeamClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "none",
          }}
        >
          <div className={styles["join-team-modal"]} id="join-team-modal">
            {/* <h2 className={styles[""]}>{eventdata.name} </h2> */}
            <div>
              <h2>Join A Team</h2>
              <form className="form">
                <div className={styles["submit-grp"]}>
                  <div className={styles["join-team-grp"]}>
                    <label
                      htmlFor="join-code"
                      className={styles["join-team-label"]}
                    >
                      Enter The Code
                    </label>
                    <br />
                    <input
                      onChange={(e) => {
                        setErrorInJoinTeam();
                        setJoinCode((prev) => e.target.value.trim());
                      }}
                      type="text"
                      className={styles["join-team-input"]}
                      id="join-team-input"
                      name="join-code"
                    />
                  </div>
                  {errorInJoinTeam ? (
                    <div className={styles["error-message"]}>
                      {errorInJoinTeam}
                    </div>
                  ) : null}
                  <input
                    type="submit"
                    onClick={formSubmitHandler}
                    id="submit"
                    value="Submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Profile;
