import React from 'react'
import { Button, Container } from '@material-ui/core';
import './Card.css'
import { useEffect } from "react";
import { useState } from "react";
import BasicModal from '../Modal/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const Card = () => {
    const [workshop, setWorkshop] = useState([]);
    function getWS() {

        fetch('http://localhost:9000/api/workshops/')
            .then((response) => { return response.json() })
            .then((data) => {
                let wshop = data.data;

                setWorkshop(wshop);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    useEffect(() => {
        getWS();
    }, []);
    function deleteUser(id) {
        fetch(`${process.env.REACT_APP_BACKENDURL}/api/workshops/${id}`, {
            method: 'DELETE'
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp);
                getWS();
            })
        })
    }
    return (

        <Container style={{ border: "5px solid black" , minHeight: "50vw"}}>
            {workshop.map(data => (<div className="event-card-container" key={data._id}>
                <div className="event-card">
                    <div className="event-name" style={{ color: "aqua" }}>
                        {data.title}
                    </div>
                    <div className="event-description">
                        {data.summary}
                    </div>
                    <hr />
                    <div className="speakers-list-container">

                        <div className="">
                            <h3>Speaker</h3>

                            <div className="speaker-container">
                                <div className="speaker-name-img">
                                    <img src={data.speakers[0].photo} alt="" />
                                    <h5>
                                        1. {data.speakers[0].name}
                                    </h5>
                                </div>
                                <div className="speaker-dur-qual">
                                    <p>
                                        {data.description}
                                    </p>
                                    <hr />
                                    <br />
                                    <h4>About {data.speakers[0].name}
                                    </h4>
                                    <p>
                                        {data.speakers[0].about}
                                    </p>
                                </div>
                            </div>
                            <hr />

                        </div>

                    </div>
                    <br />
                </div>
                {/* startIcon={<DeleteIcon />} */}
                <Button variant="outlined" endIcon={<DeleteIcon />} style={{ border: "2px solid black", color: "black", margin: "5px" }} onClick={() => deleteUser(data._id)} >Delete</Button>
                <Button variant="outlined" endIcon={<EditIcon />} style={{ border: "2px solid black", color: "black", margin: "5px" }}  ><BasicModal btn={"update"} title={"Update"} data={data} get={getWS()} /></Button>
            </div>))}

        </Container>
    )
}

export default Card
