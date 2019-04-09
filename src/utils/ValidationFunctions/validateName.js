import { EMPTY_NAME } from "../ConstantKeywords/errorConstants";

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
