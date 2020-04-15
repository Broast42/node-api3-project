import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'; 
import axios from 'axios'

const Users = () => {
    const [ usersList, setUsersList ] = useState([])

    useEffect(() =>{
        axios
            .get(`http://localhost:4000/users/`)
            .then(res => {
                setUsersList(res.data);
            })
            .catch(err =>{
                console.log(err);
            })
    },[])
    //console.log(usersList);
    return(
        <div className="list-window">
            {usersList.map((x,i) => (
                <div key={i}>
                    <Link to={`/user/${x.id}`}>
                        {x.name}
                    </Link>                
                </div>
            ))}
        </div>
    );
};

export default Users;