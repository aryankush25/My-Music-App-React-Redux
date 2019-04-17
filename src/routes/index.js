import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./LoginRegisterRoutes/Login";
import Register from "./LoginRegisterRoutes/Register";
import Home from "./HomeDashboard";
import Landing from "./Landing";
import Profile from "../components/Profile";
import { PAGE_NOT_FOUND } from "../utils/ConstantKeywords/errorConstants";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const musicAppSignedInStatus = window.localStorage.getItem(
        "musicAppSignedIn"
      );
      if (
        musicAppSignedInStatus === "true" ||
        musicAppSignedInStatus === true
      ) {
        return <Component {...props} />;
      }
      return <Redirect to="/login" />;
    }}
  />
);

// class PrivateRoute1 extends React.Component {
//   constructor({ component: Component, ...rest }) {
//     super({ component: Component, ...rest });
//     console.log("A", rest);
//   }
//   render() {
//     return (
//       <Route
//         {...this.rest}
//         render={props => {
//           const musicAppSignedInStatus = window.localStorage.getItem(
//             "musicAppSignedIn"
//           );
//           if (
//             musicAppSignedInStatus === "true" ||
//             musicAppSignedInStatus === true
//           ) {
//             return <this.Component {...props} />;
//           }
//           return <Redirect to="/login" />;
//         }}
//       />
//     );
//   }
// }

const NonPrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const musicAppSignedInStatus = window.localStorage.getItem(
        "musicAppSignedIn"
      );
      if (
        !musicAppSignedInStatus ||
        musicAppSignedInStatus === false ||
        musicAppSignedInStatus === "false"
      ) {
        return <Component {...props} />;
      }
      return <Redirect to="/home" />;
    }}
  />
);

const Routes = () => {
  return (
    <div>
      {/* <PrivateRoute1 path="/home" exact component={Home} /> */}
      <Switch>
        <Route path="/" exact component={Landing} />
        <NonPrivateRoute path="/login" exact component={Login} />
        <NonPrivateRoute path="/register" exact component={Register} />
        <PrivateRoute path="/home" exact component={Home} />
        <PrivateRoute path="/profile" exact component={Profile} />
        <Route
          path="*"
          render={() => {
            return <h1>{PAGE_NOT_FOUND}</h1>;
          }}
        />
      </Switch>
    </div>
  );
};

export default Routes;
