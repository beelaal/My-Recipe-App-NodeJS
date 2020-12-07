/*
-- Author: M Bilal
-- Created on 4 December, 2020
-- Midleware to validate the request
*/
const Joi = require('@hapi/joi');
const { makeResponse } = require('../../utils/utils_response');
const { Op } = require('../../../config/db');

const UserSchema = Joi.object({

    username: Joi.string().required(),
    password: Joi.string().required(),
});
let userValidations = (req, res, next) => {
    let formObj = req.body;
    const { error } = UserSchema.validate(req.body);
    if (error) {
        return makeResponse(res, false, 400, 'danger', 'Validation Error!', (error.details[0].message).replace(/[|&;$%@"<>()+,]/g, ""));
    } else {

        return next();
        // }
    }
}
let isUserExist = async (req, res, next)=>{
    let {username, email} = req.body;
    let usersModel = req.getInstance("users")
    const usernameExists = await usersModel.findOne({
        where: {
            [Op.or]:[{username},{email}]
        },
        raw: true,
      });
      if (usernameExists) {
        return res.json({
          type: 'error',
          status: 400,
          msg: 'Username/Email already exisits.',
        });
      }
      else{
          next();
      }
}
let isRoleExist = async(req,res,next)=>{
 let permission = req.body.permissions;
      if (permission[0]['addProducts'] == false &&  permission[1]['addrecipe'] == false && permission[2]['addSubrecipe'] == false
      && permission[3]['updateProduct'] == false && permission[4]['updaterecipe'] == false && permission[5]['updateSubrecipe'] == false && permission[6]['listProduct'] == false && permission[7]['listrecipe'] == false && permission[8]['listSubrecipe'] == false && permission[9]['listOrder'] == false){ 
      return utils_response.makeResponse(res, true, 200, 'error', 'Roles', 'Add minimum one role or more.  Please select these values and proceed');
      }else{
          next();
      }
  
    
}
module.exports = {
    userValidations,
    isUserExist,
    isRoleExist
}