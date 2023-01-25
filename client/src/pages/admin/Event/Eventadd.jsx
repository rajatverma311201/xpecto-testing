import React from "react";
import style from "./Event.module.css";
import { Button,TextField,Grid,TextareaAutosize} from "@mui/material";
import { useState } from "react";
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Popup from 'reactjs-popup';

const AddEvent = () => {
    const data={
        club:"",info:"",name:"",shortsummary:"",longsummary:"",
        event_image:"",rulebook_link:"",description:"",
        problemset_link:"",createdAt:"",
        start_time: {
            day:"",
            time:""
        },end_time: {
            day:"",
            time: ""
        },prices: {first:"",second:"",third:""
        },
        coordinators: [ {name:"",contact:""}
        ],
        teamMaxSize:"",
        teamMinSize:""
    } 
    const [newdata,setnewdata]=useState(data)
    
    const handlechange=({currentTarget:input})=>{
      if(input.name ==="1price" || input.name==="2price" || input.name==="3price"){
        const price=newdata.prices;
        if(input.name==="1price"){price.first=input.value}
        else if(input.name==="2price"){price.second=input.value}
        else if(input.name==="3price"){price.third=input.value}
        setnewdata({...newdata,prices:price})

      }else if(input.name==="sday" || input.name==="stime"){
        const st=newdata.start_time;
        if(input.name==="sday"){st.day=input.value}
        else if(input.name==="stime"){st.time=input.value}
        setnewdata({...newdata,start_time:st})

      }else if(input.name==="eday" || input.name==="etime"){
        const st=newdata.end_time;
        if(input.name==="eday"){st.day=input.value}
        else if(input.name==="etime"){st.time=input.value}
        setnewdata({...newdata,end_time:st})

      }else{
        setnewdata({...newdata,[input.name]:input.value});

      }
    }
    const [coorlist,setCoorlist]=useState([{name:"",contact:""}])
      const handleSubmit=async(e)=>{
        e.preventDefault();
        const data=newdata;
        data.coordinators=coorlist;
        try {
          const url=`${process.env.REACT_APP_BACKENDURL}/api/events/`;
          const res=await axios.post(url,data);
        } catch (error) {
          console.log("ref eroor")
        }
      }
      const handleinputchange=(e,index)=>{
        const{name,value}= e.target;
        const list =[...coorlist];
        list[index][name]=value;
        setCoorlist(list);
      }
      const handleaddclick=()=>{
        setCoorlist([...coorlist,{name:"",contact:""}])
      }
      const handleremove=(i)=>{
           const list=[...coorlist];
           list.splice(i,1);
           setCoorlist(list)
      }
    return <>
    <div className={style.header} style={{marginTop:"20px"}}>
    
    <Popup trigger={<Button variant="outlined" style={{marginLeft:"20px"}} modal nested >Add Events</Button>
} position="bottom center">
  {close=> (
    <Stack component="form"  style={{marginLeft:"15px"}} onSubmit={handleSubmit} className={style.form} marginTop={5}>     
        <div >
  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} rowSpacing={2}  padding={5}justifyContent="center" display="flex">
    <Grid  item xs={4}sm={4} md={4}display="flex" justifyContent="center" alignItems="center">  <TextField id="outlined-basic" size="small" label="ClubName" value={newdata.club} onChange={handlechange}name="club"variant="outlined" className={style.textfield}/>
</Grid>
    <Grid  item xs={4}sm={4} md={4} display="flex" justifyContent="center" alignItems="center">  <TextField id="outlined-basic" size="small" label="Info" value={newdata.info} name="info"onChange={handlechange}variant="outlined" className={style.textfield}/>
</Grid>
    <Grid item  xs={4}sm={4} md={4} display="flex" justifyContent="center" alignItems="center">  <TextField id="outlined-basic" size="small" label="Event name" value={newdata.name} name="name"onChange={handlechange}variant="outlined" className={style.textfield}/>
</Grid>
    <Grid  item xs={8}sm={8} md={8}display="flex" justifyContent="center" alignItems="center">  <TextField id="outlined-basic" size="small" label="shortsummary" value={newdata.shortsummary} name="shortsummary"onChange={handlechange}variant="outlined" className={style.textfield}/>
</Grid>
    
    <Grid  item xs={4}sm={4} md={4}display="flex" justifyContent="center" alignItems="center">  <TextField id="outlined-basic" size="small" label="rulebook_link" value={newdata.rulebook_link} name="rulebook_link"onChange={handlechange}variant="outlined" className={style.textfield}/>
</Grid>
    <Grid  item xs={8}sm={8} md={8}display="flex" justifyContent="center" alignItems="center">  <TextField id="outlined-basic" size="small" label="longsummary" value={newdata.longsummary} name="longsummary"onChange={handlechange}variant="outlined" className={style.textfield}/>
</Grid>
    <Grid  item xs={4}sm={4} md={4}display="flex" justifyContent="center" alignItems="center">  <TextField id="outlined-basic" size="small" label="Problemset_link" value={newdata.problemset_link} name="problemset_link"onChange={handlechange}variant="outlined" className={style.textfield}/>
</Grid>
    <Grid item  xs={12}sm={12} md={12}display="flex" justifyContent="center" alignItems="center">  <TextareaAutosize minRows={3} id="outlined-basic" placeholder="Description" value={newdata.description} name="description"onChange={handlechange}variant="outlined" className={style.textfield}/>
</Grid>
    <Grid  item xs={4}sm={4} md={4}display="flex" justifyContent="center" alignItems="center">  <TextField id="date" size="small" label="Created At" type="date" value={newdata.createdAt} InputLabelProps={{shrink: true}} name="createdAt"onChange={handlechange}variant="outlined" className={style.textfield}/>
</Grid>
<Grid  item xs={4}sm={4} md={4}display="flex" justifyContent="center" alignItems="center">  <TextField id="date" size="small" label="Start_day" type="date" defaultValue={newdata.start_time.day} InputLabelProps={{shrink: true}} name="sday"onChange={handlechange}variant="outlined" className={style.textfield}/>
</Grid>
    <Grid  item xs={4}sm={4} md={4}display="flex" justifyContent="center" alignItems="center">  <TextField id="time" size="small" label="Start_time" type="time"  defaultValue={newdata.start_time.time} InputLabelProps={{shrink: true}} name="stime"onChange={handlechange}variant="outlined" className={style.textfield}/>
</Grid>
    <Grid  item xs={4}sm={4} md={4}display="flex" justifyContent="center" alignItems="center">  <TextField id="date" size="small" label="End_day"type="date"  defaultValue={newdata.end_time.day}InputLabelProps={{shrink: true}} name="eday"onChange={handlechange}variant="outlined" className={style.textfield}/>
</Grid>
    <Grid item  xs={4}sm={4} md={4}display="flex" justifyContent="center" alignItems="center">  <TextField id="time" size="small" label="End_time" type="time"  defaultValue={newdata.end_time.time}InputLabelProps={{shrink: true}}name="etime"onChange={handlechange}variant="outlined" className={style.textfield}/>
</Grid>
    <Grid item  xs={4}sm={4} md={4}display="flex" justifyContent="center" alignItems="center">  <TextField id="outlined-basic" size="small" label="firstPrice" value={newdata.prices.first} name="1price"onChange={handlechange}variant="outlined" className={style.textfield}/>
</Grid>
    <Grid item  xs={4}sm={4} md={4}display="flex" justifyContent="center" alignItems="center">  <TextField id="outlined-basic" size="small" label="secondPrice" value={newdata.prices.second} name="2price"onChange={handlechange}variant="outlined" className={style.textfield}/>
</Grid>
    <Grid  item xs={4}sm={4} md={4}display="flex" justifyContent="center" alignItems="center">  <TextField id="outlined-basic" size="small" label="ThirdPrice" value={newdata.prices.third} name="3price" onChange={handlechange}variant="outlined" className={style.textfield}/>
</Grid>
    
    
    <Grid  item xs={4}sm={4} md={4}display="flex" justifyContent="center" alignItems="center">  <TextField id="outlined-basic" size="small" label="teamMaxSize" value={newdata.teamMaxSize} name="teamMaxSize" onChange={handlechange}variant="outlined" className={style.textfield}/>
</Grid>
    <Grid  item xs={4}sm={4} md={4}display="flex" justifyContent="center" alignItems="center">  <TextField id="outlined-basic" size="small" label="teamMinSize" value={newdata.teamMinSize} name="teamMinSize"onChange={handlechange}variant="outlined" className={style.textfield}/>
</Grid>

<Grid  item xs={4}sm={4} md={4}display="flex" justifyContent="center" alignItems="center">  <TextField id="outlined-basic" size="small" label="Event_Image_link" value={newdata.event_image} name="event_image"onChange={handlechange}variant="outlined" className={style.textfield}/>
</Grid>
<Grid item xs={8}sm={12} md={12}display="flex" justifyContent="center" alignItems="center"></Grid>
 {
  coorlist.map((x,i)=>{
    return(
<Grid item xs={12}sm={12} md={12}display="flex" justifyContent="center" alignItems="center" key={i}>
  <Grid  item xs={4}sm={4} md={4}display="flex"  justifyContent="center" alignItems="center">  <TextField id="outlined-basic" size="small" label="Coordinator_Name"  name="name" onChange={e=>handleinputchange(e,i)}variant="outlined" className={style.textfield}/></Grid> 
  <Grid  item xs={4}sm={4} md={4}display="flex" marginLeft={5} justifyContent="center" alignItems="center">  <TextField id="outlined-basic" size="small" label="Coordinator_contact" name="contact" onChange={e=>handleinputchange(e,i)}variant="outlined" className={style.textfield}/></Grid>
<Grid item xs={4}sm={4} md={4}display="flex" justifyContent="center" alignItems="center"><Button variant="outlined" onClick={()=>handleremove(i)} >Remove</Button></Grid>
</Grid>
  )})}
<Grid item xs={4}sm={4} md={4}display="flex" justifyContent="center" alignItems="center"><Button variant="outlined" onClick={handleaddclick} >Add Coordinators</Button></Grid>
<Grid  item display="flex" justifyContent="flex-end" alignItems="center" xs={12} sm={12} md={12}>  <Button variant="outlined" 
onClick={handleSubmit}style={{marginTop:"20px",marginBottom:"30px",width:"300px",display:"flex",flexDirection:"column",justifyContent:"flex-end"}} >Submit</Button>
<Grid  item display="flex" justifyContent="center" alignItems="center" xs={12} sm={12} md={12}>  <Button variant="outlined" 
onClick={()=>{close()}}style={{marginTop:"20px",marginBottom:"30px",width:"300px",display:"flex",flexDirection:"column",justifyContent:"center"}} >Close</Button></Grid>
</Grid>
  </Grid>
  </div>

</Stack>
  )}
  </Popup>
  </div> 
        </>
};

export default AddEvent;
