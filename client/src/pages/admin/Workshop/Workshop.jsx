import React from "react";
import "./Workshop.css";
import Card from '../../../components/admin/Card/Card.jsx'
import BasicModal from "../../../components/admin/Modal/Modal";



const Workshop = () => {

    return (


        <div className="page">

            <h5 style={{ margin: "0", padding: "20px" }}>Workshop</h5>
            <Card />
            
            <BasicModal  btn={"ADD Workshop"} title={"Create New"} data={{
                title: '', summary: '', description: '', speakers: [{
                    name: '',
                    about: '',
                    photo: ''
                }]
            }} />
        </div>


    )

};

export default Workshop;
