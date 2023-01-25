import React, { useEffect, useState } from "react";
import style from "./Event.module.css";
import axios from "axios";
import Oneevent from "./Oneevent";
import AddEvent from "./Eventadd";
const Event = () => {
        const [allevents,setAllevents]=useState([]);
//         useEffect(()=>{
//           const fetch=async()=>{

//             const url=`${process.env.REACT_APP_BACKENDURL}/api/events/`;
//            const res=await axios.get(url);
//            console.log(res.data.data)
//            setAllevents(res.data.data)
//            console.log(allevents,"mckdklm")
//           }
//           fetch();
//         },[])
useEffect(() => {
  const fun = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKENDURL}/api/events/`
      );
      const data = await response.json();
      setAllevents(data.data);
      // console.log(data.data)
      // console.log(allevents,"mckdklm")
    } catch (err) {
      console.log(err);
    }

  };
  fun();
}, []);
    return <> 
    <h1 className={style.header}>Events</h1>
  <AddEvent/>
  <h1 className={style.header}>All Events</h1>
  {/* {allevents} */}
  {allevents.map((event)=>{
     return(
      <Oneevent eventdetail={event} key={event._id}/>
  )})}
        </>
};

export default Event;
