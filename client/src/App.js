import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/public/Home/Home";
// import Dashboard from "./pages/admin/Dashboard/Dashboard";
// import Eventadmin from "./pages/admin/Event/Event";
import EventsHomePage from "./pages/public/Events/EventsHomePage";
// import Keytalk from "./pages/admin/Keytalk/Keytalk";
// import Sponsor from "./pages/admin/Sponsor/Sponsor";
// import Faq from "./pages/admin/Faq/Faq";
// import TeamMember from "./pages/admin/TeamMember/TeamMember";
// import Webinar from "./pages/admin/Webinar/Webinar";
// import Workshop from "./pages/admin/Workshop/Workshop";
import Signup from "./pages/public/component/User/Signup";
// import Contacts from "./pages/admin/Contacts/Contacts";
import Event from "./pages/public/Events/Event";
import OurTeamPage from "./pages/public/OurTeam/OurTeamPage";
import OldSponsor from "./pages/public/Sponsors/Sponsor";
import Profile from "./pages/public/component/profile/Profile";
import AmbassadorPage from "./pages/public/Ambassador/AmbassadorPage";

import EventOpen from "./pages/public/Events/EventOpen";
import ScrollToTop from "./ScrollToTop";
import CreatedTeamPage from "./pages/public/component/profile/CreatedTeamPage";
import FaqPage from "./pages/public/Faq/FaqPage";
import Sidebar from "./components/Sidebar/Sidebar";
import FixedLogo from "./pages/public/component/FixedLogo/FixedLogo";
import Payment from "./pages/public/Payment/Payment";
import DementiaPage from "./pages/public/Events/DementiaPage";
function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <FixedLogo />
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<EventsHomePage />} />
            <Route
              path="/events/63dbf7f8de4b0c5e13d1bef3"
              element={<DementiaPage />}
            />
            <Route path="/events/:id" element={<EventOpen />} />
            <Route path="/oldsponsors" element={<OldSponsor />} />
            <Route path="/oldevents" element={<Event />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route
              path="/profile/created-teams/:id"
              element={<CreatedTeamPage />}
            />
            <Route path="/campusambassadors" element={<AmbassadorPage />} />
            <Route path="/ourteam" element={<OurTeamPage />} />
            <Route path="/payment-info" element={<Payment />} />
            <Route path="*" element={<Navigate to="/" />} />
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
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
