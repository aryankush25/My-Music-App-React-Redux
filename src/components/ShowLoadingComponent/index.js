import React from "react";

const ShowLoadingComponent = props => {
  if (props.isLoading) {
    return (
      <div className="d-flex justify-content-center loader-songs ">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return props.children;
};

export default ShowLoadingComponent;
