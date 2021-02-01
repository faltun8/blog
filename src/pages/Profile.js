import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Footer from "../components/Footer";
import axios from "axios";
import MediaCard from "../components/MediaCard";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

export default function Profile() {
  const classes = useStyles();
  const [profilePage, setProfilePage] = useState();
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    const response = await axios.get(
      "https://blog-backend-django.herokuapp.com/api/postlist/",
      {
        headers: { Authorization: `Token ${token}` },
      }
    );
    return response;
  };

  useEffect(() => {
    fetchData().then((res) => setProfilePage(res.data.results));
  }, []);

  return (
    <React.Fragment>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={3}>
            {profilePage?.map((post) => (
              <Grid item sm={4} xs={12} key={post.slug}>
                <MediaCard
                  postImg={post.image}
                  title={post.title}
                  content={post.content}
                  publishDate={post.published_date}
                  author={post.author}
                  likeCount={post.get_like_count}
                  viewCount={post.get_view_count}
                  commentCount={post.get_comment_count}
                  slug={post.slug}
                  status={post.status}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

      <Tooltip title="Add" aria-label="add" href="/post-create">
        <Fab color="primary" className={classes.absolute}>
          <AddIcon />
        </Fab>
      </Tooltip>
      {/* Footer */}
      <Footer />
      {/* End footer */}
    </React.Fragment>
  );
}
