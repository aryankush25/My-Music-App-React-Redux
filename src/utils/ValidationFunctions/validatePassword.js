import { EMPTY_PASS } from "../ConstantKeywords/errorConstants";

const validatePassword = password => {
  if (password === "") {
    return {
      errorMessage: EMPTY_PASS,
      isErrorExists: true
    };
  } else {
    return {
      isErrorExists: false
    };
  }
};

export default validatePassword;
