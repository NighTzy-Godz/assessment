import Joi from "joi";

export const registerUserSchema = Joi.object({
  first_name: Joi.string().required().messages({
    "any.required": "First Name is a required field",
    "string.base": "First Name should be a type of string",
    "string.empty": "First Name cannot be empty",
  }),

  last_name: Joi.string().required().messages({
    "any.required": "Last Name is a required field",
    "string.base": "Last Name should be a type of string",
    "string.empty": "Last Name cannot be empty",
  }),

  phone_number: Joi.string().required().messages({
    "any.required": "Phone Number is a required field",
    "string.base": "Phone Number should be a type of string",
    "string.empty": "Phone Number cannot be empty",
  }),

  email: Joi.string()
    .email({ tlds: { allow: true }, minDomainSegments: 2 })

    .trim()
    .required()
    .messages({
      "string.base": "Email should be a type of string",
      "any.required": "Email is a required field ",
      "string.empty": "Email cannot be empty",
      "string.email": "Please enter a valid email",
      "string.email.minDomainSegments": "Please enter a valid email",
      "string.email.tlds": "Please enter a valid email",
    }),
});
