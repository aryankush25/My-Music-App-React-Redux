import React from "react";

const SubmitButton = props => {
  if (props.isLoading === true) {
    return (
      <button className="btn btn-lg btn-info btn-block" type="button" disabled>
        <span
          className="spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </button>
    );
  } else {
    return (
      <button className="btn btn-lg btn-info btn-block" type="submit">
        {props.buttonData}
      </button>
    );
  }
};

export default SubmitButton;
