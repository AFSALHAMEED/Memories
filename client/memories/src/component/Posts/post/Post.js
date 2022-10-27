import React from "react";
import useStyle from "./style";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcons from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../action/posts";

function Post({ post,setCurrentId }) {
  const classes = useStyle();
const dispatch = useDispatch()
const user = JSON.parse(localStorage.getItem("token"))
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      ></CardMedia>
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {(user?.result?.googleId ===post?.creator || user?.result?._id === post.creator  ) && 
        
        (
          <div className={classes.overlay2}>
          <button style={{ color: "white" }} size="small" onClick={() => {setCurrentId(post._id)}}>
            <MoreHorizIcon fontSize="default" />
          </button>
        </div>
        )
        }
    
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
          {post.title}
        </Typography>
      <CardContent>
        <Typography  variant="body2" color="textSecondary" component="p" >
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => {dispatch(likePost(post._id))}}>
          <ThumbUpAltIcon fontSize="small"/>
          &nbsp;  like &nbsp;
          {post.likedCounts}
        </Button>

        {(user?.result?.googleId ===post?.creator || user?.result?._id === post.creator  ) && 
        
        (
          <Button size="small" color="primary" onClick={() => {dispatch(deletePost(post._id))}}>
          <DeleteIcons fontSize="small"/>
         Delete
          
        </Button>
        )
        }
        
      </CardActions>
    </Card>
  );
}

export default Post;
