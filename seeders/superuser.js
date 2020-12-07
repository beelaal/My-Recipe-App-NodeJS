/*
-- Author: M Bilal
-- Created on 4 December, 2020
*/
'use strict';
const utils_response = require('../app/utils/utils_response');
const config = require('../config/configJs');
const { v4: uuidv4 } = require('uuid');

const passHash = utils_response.HashPassword('recipe@123', config.api.pwdHashSalt);
module.exports = {
  up: async (queryInterface, Sequelize) => { 
return queryInterface.bulkInsert('users', [{ 
      users_id: uuidv4(),
      salute: "Mr",
      first_name: "admin",
      last_name:"admin_",
      sex:"male",
      password: passHash,
      mobile:"00000000",
      email:"developer.bilal2015@gmail.com",
      username:"admin",
      address_1:"dubai",
      address_2:"",
      country_id:0,
      profile_image:"",
      is_active:"1"
    }]);
  },
down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('superuser', { email: 'admin@recipe.com' }, {});
  }
};