import React from "react";
import Header from "../../components/Header";

const WithHeader = props => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
};

export default WithHeader;
