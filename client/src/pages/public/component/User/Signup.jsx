import { Button, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { useRef, useState } from "react";
import React from "react";
import { TextField } from "@mui/material";
import style from "./signup.module.css";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { ReactComponent as FixedLogo } from "../../../../svg/xpecto-logo.svg";

export default function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  useEffect(() => {
    const fun = async () => {
      try {
        const userResponse = await axios.get(
          `${process.env.REACT_APP_BACKENDURL}/api/user`
        );
        setUser((prev) => userResponse.data.user);
      } catch (err) {
        navigate("/");
      }
    };
    fun();
  }, []);
  const [newdata, setnewdata] = useState(user);
  const nav = () => [navigate("/")];

  const savecurrentuser = async () => {
    try {
      const url_ = `${process.env.REACT_APP_BACKENDURL}/api/user`;
      // console.log(url_);
      const resp = await axios.patch(url_, {
        ...newdata,
      });
      // console.log(resp);
      nav();
    } catch {}
  };

  const signupchange = ({ currentTarget: input }) => {
    setnewdata({ ...newdata, [input.name]: input.value });
  };

  useEffect(() => {
    document.body.style.setProperty("--current-page-color", "#92ceff");
  });
  return (
    <>
      <Sidebar />
      <div className={`${style["fixed-logo"]} ${style["fixed-logo-visible"]}`}>
        <FixedLogo />
      </div>
      <div className={style.container}>
        <div className={style.signform}>
          <div className={style.formstyle}>
            <h1>
              Register <br />
              {user.displayName}
            </h1>
            <Stack component="form">
              <Grid container onSubmit={savecurrentuser}>
                {/* <Grid  item xs={12}sm={6} md={6}display="flex" justifyContent="center" alignItems="center" padding={2} color="yellow">  <TextField   id="outlined-basic" size="small" label="Firstname" value={user.firstname} onChange={signupchange}name="firstname"variant="outlined" disabled/>
</Grid>
       <Grid  item xs={12}sm={6} md={6}display="flex" justifyContent="center" alignItems="center" padding={2}>  <TextField id="outlined-basic" required size="small" label="Lastname" value={newdata.lastname} onChange={signupchange}name="lastname"variant="outlined" />
</Grid> */}
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  padding={2}
                >
                  {" "}
                  <TextField
                    id="outlined-disabled"
                    size="small"
                    value={user.email}
                    onChange={signupchange}
                    name="email"
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  padding={2}
                >
                  {" "}
                  <TextField
                    id="outlined-basic"
                    required
                    size="small"
                    label="Phonenumber"
                    value={newdata.phoneNumber}
                    onChange={signupchange}
                    name="phoneNumber"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  padding={2}
                >
                  {" "}
                  <TextField
                    id="outlined-basic"
                    required
                    size="small"
                    label="Collegename"
                    value={newdata.collegeName}
                    onChange={signupchange}
                    name="collegeName"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  padding={2}
                >
                  {" "}
                  <TextField
                    id="outlined-basic"
                    required
                    size="small"
                    label="Degree"
                    value={newdata.degree}
                    onChange={signupchange}
                    name="degree"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  padding={2}
                >
                  {" "}
                  <TextField
                    id="outlined-basic"
                    required
                    size="small"
                    label="Branch"
                    value={newdata.branch}
                    onChange={signupchange}
                    name="branch"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  padding={2}
                >
                  {" "}
                  <TextField
                    id="outlined-basic"
                    size="small"
                    label="Referral-code"
                    value={newdata.referralCode}
                    onChange={signupchange}
                    name="referralCode"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  padding={2}
                >
                  {" "}
                  <Button onClick={savecurrentuser} variant="outlined">
                    Register
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
}
