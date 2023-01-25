import { Container } from '@material-ui/core';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

function Form(props) {
    const [formvalue, setFormvalue] = useState({ title: props.data.title, summary: props.data.summary, description: props.data.description, name: props.data.speakers[0].name, photo: props.data.speakers[0].photo, about: props.data.speakers[0].about });



    const handleInput = (e) => {
        const { name, value } = e.target
        setFormvalue({ ...formvalue, [name]: value });
        //console.log(formvalue);
    }
    const handleFormsubmit = async (e) => {
        e.preventDefault();
        if (props.btn === "update") {
            fetch(`${process.env.REACT_APP_BACKENDURL}/api/workshops/${props.data._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formvalue.title,
                    description: formvalue.description,
                    summary: formvalue.summary,
                    speakers: [
                        {
                            name: formvalue.name,
                            photo: formvalue.photo,
                            about: formvalue.about
                        }
                    ],


                })
            });
            props.set(false);
            window.location.reload();
        }
        else {
            fetch(`${process.env.REACT_APP_BACKENDURL}/api/workshops`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formvalue.title,
                    description: formvalue.description,
                    summary: formvalue.summary,
                    speakers: [
                        {
                            name: formvalue.name,
                            photo: formvalue.photo,
                            about: formvalue.about
                        }
                    ],


                })
            });
            props.set(false)
            window.location.reload();
        }
        // console.log("success");

    }

    return (
        <React.Fragment>
            <Container>
                <div className="row">
                    <div className="col-sm-8 text-success">


                        <form className='row' onSubmit={handleFormsubmit}>
                            <div className="col-md-3">
                                <TextField multiline fullWidth id="outlined-basic" margin="normal" label="Title of Workshop" variant="outlined" name='title' value={formvalue.title} onChange={handleInput} />
                            </div>
                            <div className="col-md-3">
                                <TextField fullWidth id="outlined-basic" margin="normal" label="Description of Workshop" variant="outlined" name='description' value={formvalue.description} onChange={handleInput} />
                            </div>
                            <div className="col-md-3">
                                <TextField fullWidth id="outlined-basic" margin="normal" label="Summary of Workshop" variant="outlined" name='summary' value={formvalue.summary} onChange={handleInput} />
                            </div>
                            <div className="col-md-3">
                                <TextField fullWidth id="outlined-basic" margin="normal" label="Name of Speaker" variant="outlined" name='name' value={formvalue.name} onChange={handleInput} />
                            </div>
                            <div className="col-md-3">
                                <TextField fullWidth id="outlined-basic" margin="normal" label="About the Speaker" variant="outlined" name='about' value={formvalue.about} onChange={handleInput} />
                            </div>
                            <div className="col-md-3">
                                <TextField fullWidth id="outlined-basic" margin="normal" label="Speaker's image url" variant="outlined" name='photo' value={formvalue.photo} onChange={handleInput} />
                            </div>
                            <button className='form-control btn btn-success ' >Submit</button>




                        </form>

                    </div>
                </div>
            </Container>
        </React.Fragment>
    );
}

export default Form;