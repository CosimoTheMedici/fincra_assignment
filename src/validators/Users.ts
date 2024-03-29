import { body } from "express-validator";

export const loginValidator = [
  body("email", "User email")
    .isLength({
      min: 4,
      max: 100,
    })
    .exists()
    .isEmail()
    .trim()
    .escape(),
  body("password", "User password")
    .isLength({
      min: 7,
      max: 100,
    })
    .exists()
    .trim()
    .escape(),
];

export const signupValidator = [
  body("name", "User name")
    .isLength({
      min: 4,
      max: 100,
    })
    .exists()
    .trim()
    .escape(),
  body("email", "User email")
    .isLength({
      min: 4,
      max: 100,
    })
    .exists()
    .isEmail()
    .trim()
    .escape(),
  body("password", "User password")
    .isLength({
      min: 7,
      max: 100,
    })
    .exists()
    .trim()
    .escape(),
];
