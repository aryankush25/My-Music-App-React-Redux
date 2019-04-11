import React from "react";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Aryan"
    };
  }

  render() {
    return <h1>Profile</h1>;
  }
}
export default Profile;
