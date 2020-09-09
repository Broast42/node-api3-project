import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Posts from './Posts';

const UsersPosts = (props) => {
    const id = props.match.params.id
    const [user, setUser] = useState({})

    useEffect(()=>{
        axios
            .get(`http://localhost:4000/users/${id}`)
            .then(res =>{
                setUser(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    },[])

    //console.log(user)
    return (
        <div>
            <div className="up-link">
                <Link to="/" >
                    <button>
                       Back to Users List 
                    </button>   
                </Link>
            </div>
            <div className="user-window">
                <h2>{user.name}</h2>
            
                <Posts id={id}/>
            </div>
            

        </div>
    )
}

export default UsersPosts;