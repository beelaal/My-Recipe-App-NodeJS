/*
-- Author: M Bilal
-- Created on 4 December, 2020
-- All User Routes
*/
const userController = require('./user.controller');
const userMiddleware = require('./user.middleware');
const authenticate = require('../../authMiddleware/authenticate');
module.exports = function (app, base) {
     app.post(`${base}/sign-in`, userMiddleware.userValidations, userController.signIn);
     app.post(`${base}/get-user-details`,userController.getUserDetails);
     app.post(`${base}/create-account`, userMiddleware.isUserExist, userController.createNewAccount); 
     app.post(`${base}/update-account`, userController.updateUser); 
     
}