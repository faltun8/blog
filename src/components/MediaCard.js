import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import FavoriteIcon from "@material-ui/icons/Favorite";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FaceIcon from "@material-ui/icons/Face";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { formatDateFunc } from "../helper/FormatDate";
import { useHistory } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardDraft: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    opacity: 0.4,
  },
  share: {
    display: "none",
  },
  shareDraft: {},
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  count: {
    display: "flex",
    justifyContent: "space-between",
  },
  like: {
    color: "red",
    verticalAlign: "middle",
  },
  icons: {
    verticalAlign: "middle",
  },
  iconCount: {
    verticalAlign: "middle",
    marginLeft: 5,
  },
  date: {
    opacity: 0.4,
    fontSize: 13,
  },
  buttons: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: "10px",
  },
}));
export default function MediaCard({
  postImg,
  title,
  content,
  publishDate,
  author,
  likeCount,
  viewCount,
  commentCount,
  slug,
  status,
}) {
  const classes = useStyles();
  const history = useHistory();
  const token = localStorage.getItem("token");

  function handleSubmit() {
    history.push({ pathname: "/detail-page", state: { slug } });
  }
  async function handleDraftToPost() {
    await axios
      .put(
        `https://blog-backend-django.herokuapp.com/api/update/${slug}/`,
        {
          title: title,
          content: content,
          image: postImg,
          status: "p",
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then(() => {
        window.location = "/profile";
      })
      .catch((error) => console.log(error));
  }

  return (
    <Grid item>
      <Card>
        <div className={status === "p" ? classes.card : classes.cardDraft}>
          <CardActionArea onClick={handleSubmit}>
            <CardMedia
              className={classes.cardMedia}
              image={postImg}
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>

              <Typography>{content}</Typography>

              <Typography>
                <FaceIcon className={classes.icons} />
                <span className={classes.iconCount}>{author}</span>
              </Typography>
              <Typography className={classes.date}>
                {formatDateFunc(publishDate)}
              </Typography>
              <CardContent className={classes.count}>
                <Typography>
                  <FavoriteIcon className={classes.like} />
                  <span className={classes.iconCount}>{likeCount}</span>
                </Typography>
                <Typography>
                  <VisibilityIcon className={classes.icons} />
                  <span className={classes.iconCount}>{viewCount}</span>
                </Typography>
                <Typography>
                  <ChatBubbleOutlineIcon className={classes.icons} />
                  <span className={classes.iconCount}>{commentCount}</span>
                </Typography>
              </CardContent>
            </CardContent>
          </CardActionArea>
          {/* <CardActions>
          <Button size="small" color="primary" fullWidth>
            View
          </Button>
          <Button size="small" color="primary" fullWidth>
            Edit
          </Button>
        </CardActions> */}
        </div>
        <div className={classes.buttons}>
          <Tooltip
            title="Add"
            aria-label="add"
            className={status === "p" ? classes.share : classes.shareDraft}
            onClick={() => {
              handleDraftToPost();
            }}
          >
            <Fab color="primary" className={classes.absolute}>
              <AddIcon />
            </Fab>
          </Tooltip>
          <Tooltip
            title="Add"
            aria-label="add"
            href="/post-create"
            className={status === "p" ? classes.share : classes.shareDraft}
          >
            <Fab color="primary" className={classes.absolute}>
              <EditIcon />
            </Fab>
          </Tooltip>
        </div>
      </Card>
    </Grid>
  );
}
