import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/admin/Layout/Layout";
import Dashboard from "./pages/admin/Dashboard/Dashboard";
import Event from "./pages/admin/Event/Event";
import Keytalk from "./pages/admin/Keytalk/Keytalk";
import Sponsor from "./pages/admin/Sponsor/Sponsor";
import Faq from "./pages/admin/Faq/Faq";
import TeamMember from "./pages/admin/TeamMember/TeamMember";
import Webinar from "./pages/admin/Webinar/Webinar";
import Workshop from "./pages/admin/Workshop/Workshop";
import Contacts from "./pages/admin/Contacts/Contacts";
const AdminRoutes = () => {
    return (
        // <BrowserRouter>
            // <Routes>
            <>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/event" element={<Event />} />
                <Route path="/admin/faq" element={<Faq />} />
                <Route path="/admin/webinar" element={<Webinar />} />
                <Route path="/admin/workshop" element={<Workshop />} />
                <Route path="/admin/sponsor" element={<Sponsor />} />
                <Route path="/admin/teamMember" element={<TeamMember />} />
                <Route path="/admin/keytalk" element={<Keytalk />} />
                <Route path="/admin/contacts" element={<Contacts/>} />
                {/* <Route path="*" element={<NoPage />} /> */}
            {/* // </Routes> */}
        </>
        // </BrowserRouter>
        );
};

export default AdminRoutes;
