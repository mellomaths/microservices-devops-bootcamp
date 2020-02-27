const Validator = require("validator");
const isEmpty = require("./is-empty");
//const isEmpty = require("lodash.isempty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  // Job Title Validations
  if (Validator.isEmpty(data.title)) {
    errors.title = "Job Title is required";
  }
  if (Validator.isEmpty(data.company)) {
    errors.company = "Company field is required";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "From field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
