import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'

function SignUp() {
    const [name , setName] = useState("");
    const [fatherName , setFatherName] = useState("");
    const [rollNumber , setRollNumber] = useState("");
    const [data, setData] = useState([]);
    const [isLoad , setIsLoading] = useState(false);
    const [show , setShow] = useState(true);
    const [currentId , setCurrentId] = useState("");
    
    useEffect(() => {
        ////////// Get All User ///////////
        axios.get("http://localhost:5001/users").then((res) => {
            setData(res.data.users.reverse());
        }).catch((error) => {
            console.log(error)
        })
    }, [isLoad])

    ///////// Modal Close Function ////////////
    const handleClose = () => {
        setShow(false);
        setFatherName("")
        setName("");
        setCurrentId("");
    }

    ////////// Delete Button Function ///////////////
    const deleteUser = (id) => {
        axios.delete(`http://localhost:5001/user/${id}`).then((res) => {
            setIsLoading(!isLoad)
        }).catch((error) => {
            console.log(error)
        })
        console.log("RUN FUNCTION" , id)
    }

    /////////// Edit Button Function ////////////
    const editUser = (id ,name , fatherName) => {
        setName(name);
        setFatherName(fatherName);
        setCurrentId(id);
        setShow(true);
        
    }

    ////////// Modal Form Submit Function ////////////
    const handleEdit = () => {
        axios.put(`http://localhost:5001/user/${currentId}` , {"name" : name, "fatherName" : fatherName, "rollNumber" : rollNumber}).then((res) => {
            handleClose();
            setIsLoading(!isLoad);
        }).catch((error) => {
            console.log("Edituser" , error)
        })
    }

    //////////// Add User Function /////////////
    const handleSubmit = () => {
        axios.post("http://localhost:5001/user" , {"name" : name, "fatherName": fatherName, "rollNumber": rollNumber}).then((response) => {
            // setUserData(response.data)
            setName("");
            setFatherName("");
            setRollNumber("");
            console.log("Response" , response.data);
            setIsLoading(!isLoad);
        }).catch((error) => {
            console.log("Error" , error)
        })
    }
    
    return (
        <section className='py-3'>
            <div className="container mb-4">
                <div className="row">
                    <div className="col-lg-12">
                        <form onSubmit={(e) => {e.preventDefault()}}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                <input type="text" value={name} className="form-control" id="name" onChange={(e) => {
                                    setName(e.target.value);
                                }}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Father Name</label>
                                <input type="text" value={fatherName} className="form-control" id="father_name" onChange={(e) => {
                                    setFatherName(e.target.value);
                                }} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Roll Number</label>
                                <input value={rollNumber} type="text" className="form-control" id="roll_number" onChange={(e) => {
                                    setRollNumber(e.target.value);
                                }} />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            <>
            {data.map((data  , i) => {
                return(
                    <div key={i} className='p-4' style={{border: "1px solid black" , marginBottom: 20}}>
                        <p>{data.father_name}</p>
                        <h6>{data.name}</h6>
                        <h5>{data.roll_number}</h5>
                        <button onClick={() => {
                            deleteUser(data.roll_number)
                        }}>Delete</button>

                        <button onClick={() => {
                            editUser(data.roll_number , data.name , data.father_name);
                        }}>Edit</button>
                    </div>
                )
            })}
        </>
        <Modal show={show} onHide={handleClose} animation={true}>
            <Modal.Header closeButton>
            <Modal.Title>Edit User {currentId}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={(e) => {e.preventDefault()}}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" value={name} className="form-control" id="name" onChange={(e) => {
                            setName(e.target.value);
                        }}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Father Name</label>
                        <input type="text" value={fatherName} className="form-control" id="father_name" onChange={(e) => {
                            setFatherName(e.target.value);
                        }} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleEdit}>Submit</button>
                </form>
            </Modal.Body>
        </Modal>
        </section>
    )
}

export default SignUp