import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Image } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import Comments from "../components/Comments";
import CardContent from "@material-ui/core/CardContent";
import FavoriteIcon from "@material-ui/icons/Favorite";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FaceIcon from "@material-ui/icons/Face";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import Typography from "@material-ui/core/Typography";
import { Comment, Form, Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    maxWidth: 1000,
    margin: "auto",
    marginTop: 50,
  },
  cardMedia: {
    paddingTop: "40%", // 16:9
    width: "100%", // Fix IE 11 issue.
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "50%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginLeft: 10,
    marginRight: 15,
  },
  submit: {
    width: "70%",
    margin: "auto",
    marginTop: 20,
  },
  textField: {
    margin: 5,
  },
  comments: {
    margin: 5,
  },
  count: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  notLiked: {
    verticalAlign: "middle",
    opacity: 0.3,
  },
  liked: {
    color: "red",
    verticalAlign: "middle",
  },
  icons: {
    verticalAlign: "middle",
  },
  author: {
    verticalAlign: "middle",
  },
}));

export default function DetailPage() {
  const { state } = useLocation();
  const [postDetail, setPostDetail] = useState([]);
  const [isLiked, setIsLiked] = useState(true);
  const mySlug = state.slug;
  const classes = useStyles();
  // console.log(state.slug);

  const token = localStorage.getItem("token");

  useEffect(() => {
    //console.log("test");
    if (token) {
      getPostDetails(mySlug);
      userInfo(mySlug);
    }
  }, []);

  async function getPostDetails(mySlug) {
    await axios
      .get(
        `https://blog-backend-django.herokuapp.com/api/${mySlug}/`,
        {
          headers: { Authorization: `Token ${token}` },
        },
        {
          key: "value",
        }
      )
      .then((res) => setPostDetail(res.data))
      .then(console.log("P", postDetail));
  }
  // console.log(postDetail.comments);

  async function postComment(comment, mySlug) {
    //console.log(comment);
    //console.log(mySlug);
    await axios
      .post(
        `https://blog-backend-django.herokuapp.com/api/comment/${mySlug}/`,
        { content: comment },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      //.then(console.log("veri gittiiiiiiiiiiii"))
      .then(getPostDetails(mySlug))
      .catch((error) => console.log(error));
  }

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: (values) => {
      postComment(values.comment, mySlug);
      values.comment = "";
    },
  });

  async function handleLike(mySlug) {
    await axios
      .post(
        `https://blog-backend-django.herokuapp.com/api/like/${mySlug}/`,
        { data: "" },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(getPostDetails(mySlug))
      .then(userInfo(mySlug))
      .catch(function (error) {
        console.log(error);
      });
  }

  async function userInfo(mySlug) {
    await axios
      .get(`https://blog-backend-django.herokuapp.com/api/${mySlug}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => setIsLiked(res.data.has_liked))
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={postDetail.image}
        title="Image title"
      />

      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <Header as="h3">
          <CardContent className={classes.count}>
            <div className={classes.author}>
              <AccountCircleIcon className={classes.icons} />
              {postDetail.author}
            </div>
            <Typography>
              <CardActionArea onClick={() => handleLike(mySlug)}>
                <FavoriteIcon
                  className={isLiked ? classes.liked : classes.notLiked}
                />

                <span className={classes.iconCount}>
                  {postDetail.get_like_count}
                </span>
              </CardActionArea>
            </Typography>
            <Typography>
              <VisibilityIcon className={classes.icons} />
              <span className={classes.iconCount}>
                {postDetail.get_view_count}
              </span>
            </Typography>
            <Typography>
              <ChatBubbleOutlineIcon className={classes.icons} />
              <span className={classes.iconCount}>
                {postDetail.get_comment_count}
              </span>
            </Typography>
          </CardContent>
        </Header>

        <Header as="h3" dividing>
          Comments
        </Header>

        {postDetail?.comments?.map((comment) => (
          <Comment.Group item sm={4} xs={12} key={comment?.id.toString()}>
            <Comments
              myUser={comment?.user}
              myDate={comment?.time_stamp}
              myContent={comment?.content}
            />
          </Comment.Group>
        ))}

        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          id="comment"
          label="Comment"
          name="comment"
          value={formik.values.comment}
          onChange={formik.handleChange}
          error={formik.errors.comment}
          helperText={formik.errors.comment}
          className={classes.textField}
        />
        <div className={classes.submit}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Send Comment
          </Button>
        </div>
      </form>
    </Card>
  );
}
