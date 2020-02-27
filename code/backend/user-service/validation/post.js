const Validator = require("validator");
const isEmpty = require("./is-empty");
//const isEmpty = require("lodash.isempty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 380 })) {
    errors.text = "Text must be at least 10 characters.";
  }
  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
