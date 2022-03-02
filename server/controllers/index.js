const checkUser = require('./checkUser');
const addUser = require('./addUser');
const clientError = require('./clientError');
const serverError = require('./serverError');
const addPost=require('./addPost')
const getPosts=require('./getPost')

module.exports = {
  checkUser,
  addUser,
  clientError,
  serverError,
  addPost,
  getPosts
};
