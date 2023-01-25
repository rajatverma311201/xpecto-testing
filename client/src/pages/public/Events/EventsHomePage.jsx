import React, { useEffect, useRef, useState } from "react";
import SidebarMenu from "../component/SidebarMenu/SidebarMenu";
import Sidebar from "../../../components/Sidebar/Sidebar";
import styles from "./EventsHomePage.module.css";
// import { oldeventdetails } from "./oldevents";
import axios from "axios";
import EventCardNew from "./EventCardNew";
import { ReactComponent as FixedLogo } from "../../../svg/xpecto-logo.svg";
import { oldeventdetails } from "./oldevents";
import Layout from "../component/Layout/Layout";
const EventsHomePage = () => {
    const [events,setevents]=useState({data:[]})
    
  const getAllevents=async()=>{
    try{   
           const url = `${process.env.REACT_APP_BACKENDURL}/api/events/`;
           const  data  = await axios.get(url);
           setevents((events)=>({
            ...events,
            data:data.data.data
           }))
      }catch{
           console.log("data saved sifnufreb");
     }
  }
  useEffect(()=>{
    // to update scrollbar
    window.scrollTo({top:window.scrollY + 1, behavior:"smooth"});
  },[events])

  useEffect(()=>{
   getAllevents();
  // setevents({data:oldeventdetails})
  },[])

  return (
    <>
      <Sidebar />
      <Layout 
        dataColor="#F8C456"
       >
        <div className={styles["header"]}>
          <h1 className={styles["events-page-heading"]}>EVENTS</h1>
          <div
            className={`${styles["fixed-logo"]} ${styles["fixed-logo-visible"]}`}
          >
            <FixedLogo />
          </div>
        </div>
        <main className={styles["main"]}>
          {(events.data).map((element) => {
            return <EventCardNew data={element} />;
          })}
        </main>
      </Layout>
    </>
  );
};

export default EventsHomePage;
