import "./App.css";
// import AdminRoutes from "./AdminRoutes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/public/Home/Home";
import Dashboard from "./pages/admin/Dashboard/Dashboard";
import Eventadmin from "./pages/admin/Event/Event";
import EventsHomePage from "./pages/public/Events/EventsHomePage";
import Keytalk from "./pages/admin/Keytalk/Keytalk";
import Sponsor from "./pages/admin/Sponsor/Sponsor";
import Faq from "./pages/admin/Faq/Faq";
import TeamMember from "./pages/admin/TeamMember/TeamMember";
import Webinar from "./pages/admin/Webinar/Webinar";
import Workshop from "./pages/admin/Workshop/Workshop";
import Signup from "./pages/public/component/User/Signup";
import Contacts from "./pages/admin/Contacts/Contacts";
import Event from "./pages/public/Events/Event";
import OldSponsor from "./pages/public/Sponsors/Sponsor";
import Profile from "./pages/public/component/profile/Profile";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import * as action from "./actions/index"
// import { useSelector } from "react-redux";
// import { useState } from "react";
// import axios from "axios";
import EventOpen from "./pages/public/Events/EventOpen";
// import Navbar from "./components/admin/Navbar/Navbar";
function App() {
  // const user = useSelector((state) => state.userinfo);
  // const dispatch = useDispatch();
  // const [newuser, setnewuser] = useState(user);
  // const [isuser, setisuser] = useState(false);
  // const getUser = async (props) => {
  //   try {
  //     const url = `${process.env.REACT_APP_BACKENDURL}/auth/login`;
  //     const { data } = await axios.get(url, { withCredentials: true });
  //     setnewuser((newuser) => ({
  //       ...newuser,
  //       email: data.data.email,
  //       displayname: data.data.displayName,
  //       image: data.data.image,
  //       firstname: data.data.firstName,
  //     }));
  //     const d = (newuser) => {
  //       dispatch(action.changeuserinfo(newuser));
  //     };
  //     d(newuser);
  //     setisuser(true);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(()=>{
  // getUser();
  // },[isuser,user])
  return (
    <div className="App">
      {/* <Navbar /> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsHomePage />} />
          <Route path="/events/:id" element={<EventOpen />} />
          <Route path="/oldsponsors" element={<OldSponsor />} />
          <Route path="/oldevents" element={<Event />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Home />}/>
          {/* <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/event" element={<Eventadmin />} />
          <Route path="/admin/faq" element={<Faq />} />
          <Route path="/admin/webinar" element={<Webinar />} />
          <Route path="/admin/workshop" element={<Workshop />} />
          <Route path="/admin/sponsor" element={<Sponsor />} />
          <Route path="/admin/teamMember" element={<TeamMember />} />
          <Route path="/admin/keytalk" element={<Keytalk />} />
          <Route path="/admin/contacts" element={<Contacts />} /> */}
        </Routes>
      </BrowserRouter>
      {/* <Layout> */}
      {/* </Layout> */}
    </div>
  );
}

export default App;
