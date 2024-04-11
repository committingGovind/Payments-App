const zod = require("zod");

const signupValidation = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const signinValidation = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const updateValidation = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
});

module.exports = {
  signupValidation,
  signinValidation,
  updateValidation,
};
