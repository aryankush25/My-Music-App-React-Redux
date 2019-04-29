import { EMPTY_NAME } from "../constantKeywords123/errorConstants";

const validateName = name => {
  if (name === "") {
    return {
      errorMessage: EMPTY_NAME,
      isErrorExists: true
    };
  } else {
    return {
      isErrorExists: false
    };
  }
};

export default validateName;
