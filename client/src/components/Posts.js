import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Posts = (props) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios
            .get(`http://localhost:4000/users/${props.id}/posts`)
            .then(res => {
                setPosts(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    console.log(posts);
    return(
        <div>
            
            {posts.length === 0 ?
                <p className="no-post">This user has no posts</p>
            :
                posts.map((x,i) => (
                   <div key={i} className="post">
                       <p>{x.text}</p>
                   </div>  
                ))
           
            }

        </div>
    )
}

export default Posts;