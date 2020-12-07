/*
-- Author: M Bilal
-- Created on 4 December, 2020
-- Middleware to validate the request
*/
const Joi = require('@hapi/joi');
const { makeResponse } = require('../../utils/utils_response');
const { Op } = require('../../../config/db');

const recipeSchema = Joi.object({ 
    name: Joi.string().required(),
    preprationSteps: Joi.string(),
    image: Joi.string().allow('').optional(), 
    ingredients: Joi.string().allow('').optional(), 
    numberOfServings: Joi.string(),
    cookingTime: Joi.number(),
    IsActive: Joi.bool()
});
const recipeUpdateSchema = Joi.object({ 
    recipe_id: Joi.string().required(),
    name: Joi.string().required(),
    preprationSteps: Joi.string(),
    image: Joi.string().allow('').optional(), 
    ingredients: Joi.string().allow('').optional(), 
    numberOfServings: Joi.string(),
    cookingTime: Joi.number(),
    IsActive: Joi.bool()
});
let recipeUpdateValidations = (req, res, next) => {
      const { error } = recipeUpdateSchema.validate(req.body);
    if (error) {
        return makeResponse(res, false, 400, 'danger', 'Validation Error!', (error.details[0].message).replace(/[|&;$%@"<>()+,]/g, ""));
    } else {
        return next();
        // }
    }
}
let 
recipeValidations = (req, res, next) => {
      const { error } = recipeSchema.validate(req.body);
    if (error) {
        return makeResponse(res, false, 400, 'danger', 'Validation Error!', (error.details[0].message).replace(/[|&;$%@"<>()+,]/g, ""));
    } else {
        return next();
        // }
    }
}
let isRecipeExist = (req, res, next)=>{
    let {name} =req.body;
    name= name.toLowerCase();
    let recipeModel = req.getInstance('recipe');
    recipeModel.findOne({
            where: { name },
            raw: true
        }).then((recipe) => {
            if (recipe) { 
                console.log("ca.", recipe)
                return makeResponse(res, false, 200, 'error', 'Recipe', 'recipe already exist in the database.', recipe);
            }
            else {
                next();
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
let checkUpdateRecipeExist = (req, res, next)=>{
    let {recipe_id} =req.body;
    let recipeModel = req.getInstance('recipe');
    recipeModel.findOne({
            where: { recipe_id },
            raw: true
        }).then((recipe) => {
            if (recipe) { 
              next();
            }
            else {
                return makeResponse(res, false, 200, 'error', 'Recipe', 'recipe does not exist in the database.');
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
module.exports = {
    recipeValidations, 
    isRecipeExist,
    checkUpdateRecipeExist,
    recipeUpdateValidations,
}