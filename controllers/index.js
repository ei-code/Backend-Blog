const register = require("./register");
const login = require("./login");
const getUserById = require("./getUserById");
const passwordRecovery = require("./forgot-password");
const newpassword = require("./new-password");
const newPost = require("./new-post");
const publicaciones = require("./publicaciones");
const getBlogItem = require("./blog-detail");

module.exports = {
  register,
  login,
  getUserById,
  passwordRecovery,
  newpassword,
  newPost,
  publicaciones,
  getBlogItem,
};
