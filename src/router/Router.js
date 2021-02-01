import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import ForgetPassword from "../pages/ForgetPassword";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Profile from "../pages/Profile";
import PostCreate from "../pages/PostCreate";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/forget-password" component={ForgetPassword} />
        <Route exact path="/detail-page" component={DetailPage} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/post-create" component={PostCreate} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
