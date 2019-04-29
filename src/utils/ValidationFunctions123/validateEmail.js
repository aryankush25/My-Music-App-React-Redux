import {
  EMPTY_EMAIL,
  INVALID_EMAIL
} from "../constantKeywords123/errorConstants";

const validateEmail = email => {
  if (email === "") {
    return {
      isErrorExists: true,
      errorMessage: EMPTY_EMAIL
    };
  } else {
    let lastAtPos = email.lastIndexOf("@");
    let lastDotPos = email.lastIndexOf(".");

    if (
      !(
        lastAtPos < lastDotPos &&
        lastAtPos > 0 &&
        email.indexOf("@@") === -1 &&
        lastDotPos > 2 &&
        email.length - lastDotPos > 2
      )
    ) {
      return {
        errorMessage: INVALID_EMAIL,
        isErrorExists: true
      };
    } else {
      return {
        isErrorExists: false
      };
    }
  }
};

export default validateEmail;
