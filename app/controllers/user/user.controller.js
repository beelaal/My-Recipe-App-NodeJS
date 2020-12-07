/*
-- Author: M Bilal
-- Created on 4 December, 2020
-- User Controller for ALL User API's
*/
const utils_response = require('../../utils/utils_response');
const { Op } = require('../../../config/db');
const jwt = require('jsonwebtoken');
const config = require('../../../config/configJs');
const NodeCache = require('node-cache');
const { v4: uuidv4 } = require('uuid');
const cache = new NodeCache({
  stdTTL: 0,
  checkperiod: 0
});

const setTokenList = async (tokenData = null) => {
  if (tokenData) {
    const data = {
      ...(await getTokenList()),
      ...tokenData
    };
    cache.set('tokenList', data);
  }
};
const getTokenList = async () => {
  try {
    return await cache.get('tokenList') || {};
  }
  catch (err) {
    // console.log('AuthGetTokenList', err)
  }
}
let signIn = async (req, res, next) => {
  let { username, email, password } = req.body;
  let usersModel = req.getInstance('users');
  usersModel.findOne({
    where: { username }
  }).then((user) => {
    if (user) {
      const passHash = utils_response.HashPassword(password, config.api.pwdHashSalt);
      if (passHash !== user.password) {
        return utils_response.makeResponse(res, false, 200, 'error', 'Login not successful', 'Incorrect login details');
      }
      res.cookie('rememberme', '0', { expires: false, httpOnly: false });
      if (req.body.rememberMe) {
        const token = jwt.sign({ user: user }, config.api.apiSecretKey, { expiresIn: config.api.tokenExpiry });
        res.cookie('rememberme', '1', { expires: new Date(Date.now() + 3.154e+10), httpOnly: false }); // expire in one year
        res.cookie('remembermeToken', token, { expires: new Date(Date.now() + 3.154e+10), httpOnly: false }); // expire in one year
      }
      const token = jwt.sign({ user: user }, config.api.apiSecretKey, { expiresIn: config.api.tokenExpiry });
      const refreshToken = jwt.sign({ user: user }, config.api.apiSecretKeyRefreshToken, { expiresIn: config.api.refreshTokenExpiry });
      setTokenList({ [refreshToken]: { token, refreshToken } });
      let result = {
        token,
        user
      }
      return utils_response.makeResponse(res, true, 200, 'success', 'Login Successful', 'Successfully Authenticated.', result);

    }
    else {
      return utils_response.makeResponse(res, false, 200, 'error', 'Login not successful', 'Username / Email not found');
    }

  }).catch((error) => {
    console.log(error);
    res.json({
      type: 'error',
      status: 400,
      msg: 'Oops! Something went wrong while processing your request.',
    });
  });
}
let createNewAccount = async (req, res) => {
  const {
    salute,
    first_name,
    last_name,
    sex,
    password,
    mobile,
    email,
    username,
    address_1,
    address_2,
    country_id,
    profile_image,
    is_active,
    role_id
  } = req.body;
  const formData = {};
  formData.salute = salute;
  formData.first_name = first_name;
  formData.last_name = last_name;
  formData.sex = sex;
  formData.mobile = mobile;
  formData.email = email;
  formData.username = username;
  formData.address_1 = address_1;
  formData.address_2 = address_2;
  formData.country_id = country_id;
  formData.is_active = is_active;
  formData.profile_image = profile_image;
  formData.role_id = role_id;
  formData.users_id = uuidv4();
  formData.created = new Date();
  formData.status = 1;
  let usersModel = req.getInstance("users");
  const passHash = utils_response.HashPassword(password, config.api.pwdHashSalt);
  formData.password = passHash;
  try {

    let user = await usersModel.create(formData);
    user = user.dataValues;
    user = {
      password,
      ...user,
    };
    return res.json({
      type: 'data',
      status: 200,
      msg: 'User created Successfully.',
      data: {
        id: user.users_id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        username: user.username,
        menu_permission: [],
      },
    });
  } catch (error) {
    console.log('--error', error);
    return res.json({
      type: 'error',
      status: 400,
      msg: 'Oops! Something went wrong while processing your request.',
    });
  }
};
let updateUser = async (req, res) => {
  const {
    salute,
    first_name,
    last_name,
    sex,
    password,
    mobile,
    email,
    username,
    address_1,
    address_2,
    profile_image,
    users_id
  } = req.body;
  const formData = {};
  formData.salute = salute;
  formData.first_name = first_name;
  formData.last_name = last_name;
  formData.sex = sex;
  formData.mobile = mobile;
  formData.email = email;
  formData.username = username;
  formData.address_1 = address_1;
  formData.address_2 = address_2;  
  formData.profile_image = profile_image;
  formData.created = new Date();
  formData.status = 1;
  let usersModel = req.getInstance("users"); 
  try {
console.log(formData)
    let user = await usersModel.update(formData, {where: {users_id: users_id}});
    
    return res.json({
      type: 'data',
      status: 200,
      msg: 'User updated Successfully.',
      data: user
    });
  } catch (error) {
    console.log('--error', error);
    return res.json({
      type: 'error',
      status: 400,
      msg: 'Oops! Something went wrong while processing your request.',
    });
  }
};
let getUserDetails = async (req, res, next) => {
  let { users_id } = req.body;
  let usersModel = req.getInstance("users")
  const usernameExists = await usersModel.findOne({
    where: {
      [Op.or]: [{ users_id }]
    },
    raw: true,
  });
  if (usernameExists) {
    return utils_response.makeResponse(res, true, 200, 'success', 'Fected User', 'User Fetched Successfully.', usernameExists);
  }
  else {
    return utils_response.makeResponse(res, false, 200, 'error', 'Request not successful', 'Username / Email not found');

  }
}

module.exports = {
  signIn,
  getUserDetails,
  createNewAccount,
  updateUser
} 