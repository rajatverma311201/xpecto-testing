import "./App.css";
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
import OurTeamPage from "./pages/public/OurTeam/OurTeamPage";
import OldSponsor from "./pages/public/Sponsors/Sponsor";
import Profile from "./pages/public/component/profile/Profile";

import EventOpen from "./pages/public/Events/EventOpen";
import ScrollToTop from "./ScrollToTop";
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <ScrollToTop>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/events" element={<EventsHomePage />} />
                        <Route path="/events/:id" element={<EventOpen />} />
                        <Route path="/oldsponsors" element={<OldSponsor />} />
                        <Route path="/oldevents" element={<Event />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/ourteam" element={<OurTeamPage />} />
                        <Route path="*" element={<Home />} />
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
