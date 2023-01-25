import React from 'react'
import { Grid,Typography,Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import style from "./Event.module.css";
import Popup from 'reactjs-popup';
import Updateevent from './Updateevent';
import axios from 'axios';
export default function Oneevent(props) {
    const handledelete=async(e,id)=>{
        // e.preventDefault();
        // console.log(id,"Delete")
        try {
          const url=`${process.env.REACT_APP_BACKENDURL}/api/events/${id}`;
          const res=await axios.delete(url);
        } catch (error) {
        //   console.log("ref eroor")
        }        

    }
  return (
    <>
    <Stack component="form"  style={{marginLeft:"15px",backgroundColor:"#939496"}}  className={style.form} marginTop={5}>     
        <div >
  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} rowSpacing={2}  padding={5}justifyContent="flex-start" display="flex">
    <Grid  item xs={4}sm={4} md={4}display="flex" justifyContent="flex-start" alignItems="center">  <Typography color="secondry" variant="p" ><a className={style.boldname}>Club Name:</a> {props.eventdetail.club}</Typography>
</Grid>
    <Grid  item xs={4}sm={4} md={4} display="flex" justifyContent="flex-start" alignItems="center">  <Typography color="secondry" variant="p"><a className={style.boldname}>Event Info:</a> {props.eventdetail.info}</Typography>
</Grid>
    <Grid item  xs={4}sm={4} md={4} display="flex" justifyContent="flex-start" alignItems="center">  <Typography color="secondry" variant="p" ><a className={style.boldname}>Events Name:</a> {props.eventdetail.name}</Typography>
</Grid>
    <Grid  item xs={8}sm={8} md={8}display="flex" justifyContent="flex-start" alignItems="center">  <Typography color="secondry" variant="p" ><a className={style.boldname}>Shortsummary:</a> {props.eventdetail.shortsummary}</Typography>
</Grid>
    
    <Grid  item xs={4}sm={4} md={4}display="flex" justifyContent="flex-start" alignItems="center">  <Typography color="secondry" variant="p" ><a className={style.boldname}>Rulebook link :</a> <a href={props.eventdetail.rulebook_link} target={'_blank'}>link</a> {props.eventdetail.rulebook_link}</Typography>
</Grid>
    <Grid  item xs={8}sm={8} md={8}display="flex" justifyContent="flex-start" alignItems="center">  <Typography color="secondry" variant="p"><a className={style.boldname}>Longsummary:</a> {props.eventdetail.longsummary}</Typography>
</Grid>
    <Grid  item xs={4}sm={4} md={4}display="flex" justifyContent="flex-start" alignItems="center">  <Typography color="secondry" variant="p" ><a className={style.boldname}>Problemstatement :</a> <a href={props.eventdetail.problemstatement_link} target={'_blank'}>link</a> {props.eventdetail.problemstatement_link}</Typography>
</Grid>
    <Grid item  xs={12}sm={12} md={12}display="flex" justifyContent="flex-start" alignItems="center">  <Typography color="secondry" variant="p"><a className={style.boldname}>Description  :</a> {props.eventdetail.description}</Typography>
</Grid>
    <Grid  item xs={4}sm={4} md={4}display="flex" justifyContent="flex-start" alignItems="center">  <Typography color="secondry" variant="p" ><a className={style.boldname}>Event Created  At:</a> {props.eventdetail.createdAt}</Typography>
</Grid>
    <Grid  item xs={4}sm={4} md={4}display="flex" justifyContent="flex-start" alignItems="center">  <Typography color="secondry" variant="p" ><a className={style.boldname}>Start Day:</a>{props.eventdetail.start_time.day}</Typography>
</Grid>
    <Grid  item xs={4}sm={4} md={4}display="flex" justifyContent="flex-start" alignItems="center">  <Typography color="secondry" variant="p" ><a className={style.boldname}>Start Time:</a>{props.eventdetail.start_time.time}</Typography>
</Grid>
    <Grid  item xs={4}sm={4} md={4}display="flex" justifyContent="flex-start" alignItems="center">  <Typography color="secondry" variant="p"><a className={style.boldname}>End Day:</a>{props.eventdetail.end_time.day}</Typography>
</Grid>
    <Grid item  xs={4}sm={4} md={4}display="flex" justifyContent="flex-start" alignItems="center">  <Typography color="secondry" variant="p" ><a className={style.boldname}>End Time:</a>{props.eventdetail.end_time.time}</Typography>
</Grid>
    <Grid item  xs={4}sm={4} md={4}display="flex" justifyContent="flex-start" alignItems="center">  <Typography color="secondry" variant="p" ><a className={style.boldname}>First prices :</a> {props.eventdetail.prices.first}</Typography>
</Grid>
    <Grid item  xs={4}sm={4} md={4}display="flex" justifyContent="flex-start" alignItems="center">  <Typography color="secondry" variant="p"><a className={style.boldname}>Second prices :</a> {props.eventdetail.prices.second}</Typography>
</Grid>
    <Grid  item xs={4}sm={4} md={4}display="flex" justifyContent="flex-start" alignItems="center">  <Typography color="secondry" variant="p" ><a className={style.boldname}>Third prices :</a> {props.eventdetail.prices.third}</Typography>
</Grid>
    
    
    <Grid  item xs={4}sm={4} md={4}display="flex" justifyContent="flex-start" alignItems="center">  <Typography color="secondry" variant="p" ><a className={style.boldname}>Maxteamsize :</a> {props.eventdetail.teamMaxSize}</Typography>
</Grid>
    <Grid  item xs={4}sm={4} md={4}display="flex" justifyContent="flex-start" alignItems="center">  <Typography color="secondry" variant="p" ><a className={style.boldname}>Minteamsize :</a> {props.eventdetail.teamMinSize}</Typography>
</Grid>

<Grid  item xs={4}sm={4} md={4}display="flex" justifyContent="flex-start" alignItems="center">  <Typography color="secondry" variant="p" ><a className={style.boldname}>Event Image link:</a> <a href={props.eventdetail.event_img}>link</a>{props.eventdetail.event_img}</Typography>
</Grid>
<Grid item xs={8}sm={12} md={12}display="flex" justifyContent="flex-start" alignItems="center"></Grid>
<a className={style.boldname} style={{marginLeft:"23px"}}>coordinators Name:</a>
 {
  (props.eventdetail.coordinators).map((x,i)=>{
    return(
<Grid item xs={12}sm={12} md={12}display="flex" justifyContent="flex-start" alignItems="center" key={i}>
  <Grid  item xs={4}sm={4} md={4}display="flex"  justifyContent="flex-start" alignItems="center">  <Typography color="secondry" variant="p" >{x.name}</Typography></Grid> 
  <Grid  item xs={4}sm={4} md={4}display="flex" marginLeft={5} justifyContent="flex-start" alignItems="center">  <Typography color="secondry" variant="p" >{x.contact}</Typography></Grid>
</Grid>
  )})}
  </Grid>
  </div>
  <Grid item xs={12}sm={12} md={12}display="flex" justifyContent="flex-end" alignItems="center">
<Grid item xs={4}sm={4} md={4}display="flex" justifyContent="flex-end" alignItems="center" >
<Popup Close nested trigger={<Button variant="outlined" style={{marginLeft:"30px"}} >Delete event</Button>}>
{ Close=>(
<Grid container xs={12}sm={12} md={12}display="flex" justifyContent="center" alignItems="center" style={{backgroundColor:"#a6082a",margin:"5"}}>
    <Grid item xs={6}sm={6} md={6}display="flex" justifyContent="center" alignItems="center" >
    <Button variant="outlined" style={{marginLeft:"30px"}} onClick={()=>{Close();}}>Cancel</Button>
    </Grid>
    <Grid item xs={6}sm={6} md={6}display="flex" justifyContent="center" alignItems="center" >
    <Button variant="outlined" style={{marginLeft:"30px"}} onClick={(e)=>handledelete(e,props.eventdetail._id)}>Ok</Button>
    </Grid>
</Grid>)}
</Popup >
</Grid>
<Grid item xs={4}sm={4} md={4}display="flex" justifyContent="flex-end" alignItems="center" >
    <Popup trigger={<Button variant="outlined" Close nested style={{marginLeft:"20px"}} position="bottom left">Update Event</Button>}>

<Updateevent eventdetail={props.eventdetail} />
    </Popup>

</Grid>
</Grid>
</Stack>
    </>
  )
};

