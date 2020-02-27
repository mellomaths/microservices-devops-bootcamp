import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authAction";
import { logoutUser } from "./actions/authAction";
import { clearCurrentProfile } from "./actions/profileActions";

import { Provider } from "react-redux"; // Store
import store from "./store";
import axios from "axios";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile/CreateProfile";
import EditProfile from "./components/profile/EditProfile";
import AddExperience from "./components/profile/AddExperience";
import AddEducation from "./components/profile/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/public/Profile";
import Posts from "./components/posts/Posts";
import PostFullView from "./components/posts/PostFullView";
import NotFound from "./components/common/NotFound";

import env from "./environment";

import "./App.css";

//axios.defaults.baseURL = "http://staging.api.questcode.org";
//axios.defaults.baseURL = process.env.REACT_APP_API_HOST;
axios.defaults.baseURL = env.API_URL;
console.log(`Running at ${env.NAME} with ${env.API_URL}`);

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode Token and get user info and experience
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="default-transp-bg">
              <div className="container pt-4">
                <Route exact path="/" component={Landing} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/profile/:handle" component={Profile} />
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  <PrivateRoute
                    exact
                    path="/create-profile"
                    component={CreateProfile}
                  />
                  <PrivateRoute
                    exact
                    path="/edit-profile"
                    component={EditProfile}
                  />
                  <PrivateRoute
                    exact
                    path="/add-experience"
                    component={AddExperience}
                  />
                  <PrivateRoute
                    exact
                    path="/add-education"
                    component={AddEducation}
                  />
                  <PrivateRoute exact path="/feed" component={Posts} />
                  <PrivateRoute
                    exact
                    path="/post/:id"
                    component={PostFullView}
                  />
                </Switch>
                <Route exact path="/404" component={NotFound} />
              </div>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
