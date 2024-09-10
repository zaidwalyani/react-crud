import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Users = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5001/users").then((res) => {
            setData(res.data.users)
        }).catch((error) => {
            console.log(error)
        })
    }, [])
  return (
    <>
        {data.map((data  , i) => {
            return(
                <div>
                    <p>{data.father_name}</p>
                    <h6>{data.name}</h6>
                    <h5>{data.roll_number}</h5>
                </div>
            )
        })}
    </>
  )
}

export default Users