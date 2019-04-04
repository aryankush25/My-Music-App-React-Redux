import React from "react";
import Header from "../../components/Header";

const NavBar = props => {
  console.log(props);
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
};

export default NavBar;
