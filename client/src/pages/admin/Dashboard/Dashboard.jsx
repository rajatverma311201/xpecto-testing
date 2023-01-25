import React from "react";
import styles from "./Dashboard.module.css";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import Eventadmin from '../Event/Event'
const Dashboard = () => {
    const navigate = useNavigate();
    const eventpage=()=>{
        navigate("/admin/event")
    }
    return <div className={styles["page"]}>
        <div className={styles["dcontainer"]} >
        <div className="grid-container" style={{marginTop:"100px"}}>
        <div className="grid-item"><Button variant="outlined" onClick={eventpage}>Events</Button></div>
        </div>
        </div>
        </div>;
};

export default Dashboard;
