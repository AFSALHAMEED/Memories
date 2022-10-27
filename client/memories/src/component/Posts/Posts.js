import React from 'react'
import useStyle from './post/style';
import Post from "./post/Post"
import {useSelector} from "react-redux";
import {Grid,CircularProgress} from "@material-ui/core"


function Posts({setCurrentId}) {
  const classes = useStyle()

  const posts = useSelector((state)=>state.posts)

  console.log("posst",posts);

  return (
   
    !posts.length ? <CircularProgress/>: (
<Grid className={classes.container} container alignItems='stretch' spacing={3} >
  {
    posts.map((post)=>(
      <Grid key={post.id} item xs={12} sm={6} >

        <Post post={post} setCurrentId={setCurrentId} />  

      </Grid>
    ))
  }
</Grid>
    )
   
  )
}

export default Posts