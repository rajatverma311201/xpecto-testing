import axios from "axios";
import React, { useState, useReducer, useMemo, useRef } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LayoutPage from "../component/Layout/Layout";
import styles from "./eventopen.module.css";
import { Modal, Box } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { ThreeCircles } from "react-loader-spinner";

export default function EventOpen(props) {
  const submitRef = useRef(null);
  const params = useParams();
  const navigate = useNavigate();
  const [allEventTeams, setAllEventTeams] = useState(null);
  const [openEventTeam, setOpenEventTeam] = useState(false);
  const handleEventTeamOpen = () => setOpenEventTeam(true);
  const handleEventTeamClose = () => {
    window.location.reload(false);

    setOpenEventTeam(false);
  };
  // some clubs have links to their websites
  const clubsWithLinks = { Frosthack: "Frosthack", STAC: "Astrax" };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [eventdata, seteventdata] = useState(undefined);
  const [isEventDataLoading, setIsEventDataLoading] = useState(true);
  const [isRegisteredForEvent, setIsRegisteredForEvent] = useState(false);
  const [isRegisteredForEventLoading, setIsRegisteredForEventLoading] =
    useState(true);
  const pricesWorth = useMemo(() => {
    if (!eventdata?.prices) return 0;
    return (
      eventdata.prices.first +
      eventdata.prices.second +
      eventdata.prices.third +
      eventdata.prices.fourth
    );
  }, [eventdata]);

  useEffect(() => {
    // fire window scroll event to update scrollbar
    window.dispatchEvent(new Event("scroll"));
  }, [eventdata]);

  const getevent = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKENDURL}/api/events/${params.id}`;
      const data = await axios.get(url);
      seteventdata((prev) => data.data.data);
      setIsEventDataLoading(false);
    } catch {
      navigate("/events");
    }
  };
  useEffect(() => {
    getevent();
  }, []);

  const loginSuccessHandler = async (cred) => {
    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_BACKENDURL}/api/user/login`,
        {
          credential: cred,
        }
      );
      localStorage.setItem("UserJwtToken", resp.data.jwtToken);
      if (resp.data.isNewUser) {
        navigate("/signup");
      }

      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [loadingUser, setLoadingUser] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userdetails, setuserdetails] = useState({ data: {} });
  const [imageurl, setimageurl] = useState();
  const getprofiledata = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKENDURL}/api/user`;
      const data = await axios.get(url);
      setLoadingUser((prev) => false);
      const usrDATA = data.data.user;
      setuserdetails((userdetails) => ({
        ...userdetails,
        ...usrDATA,
      }));
      setimageurl(usrDATA.image);
      if (usrDATA.email) {
        setIsAuthenticated((prev) => true);
      }
    } catch (err) {
      setIsAuthenticated((prev) => false);
      console.log(err);
    }
  };
  useEffect(() => {
    getprofiledata();
  }, []);
  useEffect(() => {
    (async function () {
      try {
        const url = `${process.env.REACT_APP_BACKENDURL}/api/eventTeam/all`;
        const res = await axios.get(url);

        setAllEventTeams((t) => [...res.data.data.teams]);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const MESSAGE =
    !loadingUser && !isAuthenticated ? (
      <h3 className={styles["sign-in-message"]}>
        Please Sign In to register for the Event.
        <br />
        <button onClick={handleOpen} className={styles["create-team-register"]}>
          Sign In
        </button>
      </h3>
    ) : null;

  const eventRegister =
    !loadingUser && isAuthenticated ? (
      !isEventDataLoading && eventdata.teamMaxSize != 1 ? (
        !isRegisteredForEventLoading ? (
          isRegisteredForEvent ? (
            "Already Registered for Event"
          ) : (
            <button
              className={styles["create-team-register"]}
              onClick={handleEventTeamOpen}
            >
              Register for the Event
            </button>
          )
        ) : null
      ) : null
    ) : null;

  // FOR HANDLING TEAM CREATION

  const splitAndJoin = (inp) =>
    inp
      .trim()
      .toLowerCase()
      .split(/\s{1,}/g)
      .join("-");

  const validateTeamName = (val) => {
    if (val.trim() == "" || val.trim() == null || val.trim() == undefined) {
      return false;
    }
    console.log(allEventTeams);
    for (let t = 0; t < allEventTeams.length; t++) {
      console.log(val, allEventTeams[t].teamName);
      if (splitAndJoin(allEventTeams[t].teamName) == splitAndJoin(val))
        return false;
    }
    return true;
  };

  const teamNameReducer = (state, action) => {
    switch (action.type) {
      case "USER_INPUT":
        return {
          value: action.payload.value,
          isValid: validateTeamName(action.payload.value),
        };

      case "INPUT_BLUR":
        return {
          value: state.value,
          isValid: validateTeamName(state.value),
        };

      case "RESET":
        return { value: "", isValid: undefined };

      default:
        return {
          value: state.value,
          isValid: state.isValid,
        };
    }
  };
  const [eventTeamNameState, eventTeamNameDispatch] = useReducer(
    teamNameReducer,
    { value: "", isValid: undefined }
  );

  const teamNameChangeHandler = (e) => {
    const val = e.target.value;
    if (allEventTeams) {
      eventTeamNameDispatch({
        type: "USER_INPUT",
        payload: { value: val },
      });
    }
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    submitRef.current.value = "Please Wait";
    submitRef.current.disabled = true;
    const url = `${process.env.REACT_APP_BACKENDURL}/api/eventTeam`;
    // console.log(eventTeamNameState.isValid);
    if (eventTeamNameState.isValid === true) {
      const res1 = await axios.post(url + "/create", {
        teamName: eventTeamNameState.value,
      });
      //   console.log(res1.data.data);

      const res2 = await axios.post(url + "/add-game", {
        teamName: eventTeamNameState.value,
        gameId: eventdata._id,
      });
      const code = res2.data.data.updatedTeam.code;

      if (code) {
        document.querySelector("#create-team-modal>div").innerHTML = `
        <div class="code-message" style="color:white; font-size:20px">
          Copy This code to add more members to your team
        </div>
        <br>
        <div class="code" style="color:white;">${code}</div>
        `;
      }
      console.log(code);
      submitRef.current.value = "Submit";
      submitRef.current.disabled = false;
    }
  };

  useEffect(() => {
    (async function () {
      try {
        const url = `${process.env.REACT_APP_BACKENDURL}/api/eventTeam`;
        const resp = await axios.get(
          `${url}/teamForCurrentEvent/${eventdata._id}`
        );
        if (resp.data.game) {
          setIsRegisteredForEvent(true);
        }
        setIsRegisteredForEventLoading(false);
      } catch (error) {
        setIsRegisteredForEventLoading(false);
        setIsRegisteredForEvent(false);
        // console.log(error)
      }
    })();
  }, [loadingUser, isEventDataLoading]);

  return (
    <>
      <LayoutPage dataColor="#5dffde">
        {isEventDataLoading ||
        loadingUser ||
        eventdata === undefined ||
        isRegisteredForEventLoading ? (
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
              innerCircleColor="#5dffde"
              middleCircleColor=""
            />
          </div>
        ) : (
          <div>
            <div className={styles["header"]}>
              <h1 className={styles["events-page-heading"]}>
                {eventdata.name}
              </h1>

              <div className={styles["container-flex"]}>
                <div className={styles["event-main-description"]}>
                  <h2 className={styles["events-page-teamsize"]}>
                    {eventdata._id === "63dbf9a5de4b0c5e13d1befb" ? (
                      <>
                        <div>
                          Please Watch the video for frosthack registration on
                          devfolio
                        </div>
                        <a
                          href="https://youtu.be/gVLQ3RyRrgo"
                          target="_blank"
                          className={styles["create-team-register"]}
                        >
                          {/* redirect to external Frosthack registration page */}
                          Video
                        </a>
                        {/* different registration Link for FROSTHACK */}
                        {MESSAGE || (
                          <a
                            href="https://frosthack-2k23.devfolio.co/"
                            target="_blank"
                            className={styles["create-team-register"]}
                          >
                            {/* redirect to external Frosthack registration page */}
                            Register for the Event
                          </a>
                        )}
                      </>
                    ) : (
                      <>
                        {MESSAGE}
                        {eventRegister}
                      </>
                    )}
                    <br />
                    Team Size :{" "}
                    {`${eventdata.teamMinSize} ${
                      eventdata.teamMinSize !== eventdata.teamMaxSize
                        ? ` - ${eventdata.teamMaxSize}`
                        : ""
                    }`}
                  </h2>
                  <h2 className={styles["events-page-teamsize"]}>
                    {eventdata.status}
                  </h2>
                  <div className={styles["events-page-teamsize"]}>
                    {eventdata.info}
                  </div>
                  {eventdata.longsummary !== "" && (
                    <h3 className={styles["event-longsummary"]}>
                      {/* additional updates of the event */}
                      {eventdata.longsummary}
                    </h3>
                  )}
                  {/* main */}
                  <div className={styles["main"]}>
                    <p className={styles["eventdesc"]}>
                      {eventdata.description}
                    </p>
                    <br />
                    {clubsWithLinks[eventdata.club] !== undefined && (
                      <>
                        For more information visit{" "}
                        <a
                          href={eventdata.shortsummary}
                          target="_blank"
                          className={styles["create-team-register"]}
                          style={{ padding: "5px 20px" }}
                        >
                          {clubsWithLinks[eventdata.club]}
                        </a>
                      </>
                    )}
                    <div className={styles["event-btns"]}>
                      {eventdata.rulebook_link ? (
                        <a
                          className={styles["eventbutton"]}
                          href={eventdata.rulebook_link}
                          target="_blank"
                        >
                          Rulebook
                        </a>
                      ) : (
                        ""
                      )}
                      <br />
                      {eventdata.problemset_link ? (
                        <a
                          className={styles["eventbutton"]}
                          href={eventdata.problemset_link}
                          target="_blank"
                        >
                          Problem Statement
                        </a>
                      ) : (
                        ""
                      )}
                      <br />
                      {eventdata.submission_link ? (
                        <a
                          className={styles["eventbutton"]}
                          href={eventdata.submission_link}
                          target="_blank"
                        >
                          Submission Link
                        </a>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles["prizes-container"]}>
                  {(pricesWorth !== 0 || eventdata.prizesWorth) && (
                    <h2 className={styles["eventprize"]}>
                      Prizes Worth <br />
                      Rs{" "}
                      {eventdata.prizesWorth
                        ? eventdata.prizesWorth
                        : pricesWorth}
                    </h2>
                  )}
                  <div className={styles["prizes"]}>
                    {eventdata.prices.first != "" &&
                      eventdata.prices.first &&
                      eventdata.prices.first !== 0 && (
                        <p className={styles["prize"]}>
                          First <br />
                          Rs {eventdata.prices.first}
                        </p>
                      )}
                    {eventdata.prices.second != "" &&
                      eventdata.prices.second &&
                      eventdata.prices.second !== 0 && (
                        <p className={styles["prize"]}>
                          Second <br /> Rs {eventdata.prices.second}
                        </p>
                      )}
                    {eventdata.prices.third != "" &&
                      eventdata.prices.third &&
                      eventdata.prices.third !== 0 && (
                        <p className={styles["prize"]}>
                          Third
                          <br />
                          Rs {eventdata.prices.third}
                        </p>
                      )}
                    {eventdata.prices.fourth &&
                    eventdata.prices.fourth !== 0 ? (
                      <p className={styles["prize"]}>
                        Fourth
                        <br />
                        Rs {eventdata.prices.fourth}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Modal
              sx={{ backdropFilter: "blur(20px)" }}
              open={openEventTeam}
              onClose={handleEventTeamClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  className={styles["create-team-modal"]}
                  id="create-team-modal"
                >
                  <h2 className={styles[""]}>{eventdata.name} </h2>
                  <div>
                    <h3>Create Your Team</h3>
                    <form className="form">
                      <div className="team-name">
                        <label htmlFor="teamName">Enter Team Name</label>
                        <br />
                        <input
                          value={eventTeamNameState.value}
                          type="text"
                          name="teamName"
                          id="teamName"
                          placeholder="Enter Name"
                          onChange={teamNameChangeHandler}
                        />
                        {eventTeamNameState.isValid === false ? (
                          <p className={styles["name-taken-message"]}>
                            Name Already Taken
                          </p>
                        ) : null}
                      </div>
                      <div className={styles["submit-grp"]}>
                        <input
                          ref={submitRef}
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

            <Modal
              sx={{ backdropFilter: "blur(25px)" }}
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <GoogleLogin
                  size="large"
                  width="300"
                  useOneTap
                  onSuccess={(credentialResponse) => {
                    loginSuccessHandler(credentialResponse.credential);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </Box>
            </Modal>
          </div>
        )}
      </LayoutPage>
    </>
  );
}
