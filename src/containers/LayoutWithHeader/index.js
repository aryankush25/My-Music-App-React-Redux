import React from "react";
import Header from "../../components/Header";

const WithHeader = props => {
  console.log(props.children);
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
};

export default WithHeader;
