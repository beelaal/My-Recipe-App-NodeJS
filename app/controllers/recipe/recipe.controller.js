/*
-- Author: M Bilal
-- Created on 4 December, 2020
-- Recipe Controller for all recipe API's
*/
const utils_response = require('../../utils/utils_response');
const { Op } = require('../../../config/db');
const { v4: uuidv4 } = require('uuid');
const uploadImgOnAWS = require('../../helper/uploadAws');
// Add Recipe API
let addrecipe = async (req, res) => {
    let {name, preprationSteps, image,ingredients,numberOfServings,cookingTime} =req.body;
    name= name.toLowerCase();
    let recipeObj = {};
    recipeObj.recipe_id = uuidv4();
    recipeObj.name = name;
    recipeObj.preprationSteps = preprationSteps;
    recipeObj.image = image;
    recipeObj.ingredients = ingredients;
    recipeObj.numberOfServings = numberOfServings;
    recipeObj.cookingTime = cookingTime;
    recipeObj.IsActive = true;
    recipeObj.Last_Updated_Date = new Date();
    recipeObj.createdAt = new Date();
    recipeObj.Updated_By = 'admin';
    let recipeModel = req.getInstance('recipe');
    recipeModel.create(recipeObj).then((recipe) => {
            if (recipe) { 
                return utils_response.makeResponse(res, true, 200, 'success', 'recipe Type', 'recipe has been successful created.', recipe);
            }
            else {
                return utils_response.makeResponse(res, false, 200, 'error', 'Insertion not successful', 'recipe cannot be inserted.');
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
// Get List of All Recipes API
let listAllRecipes = async(req, res)=>{
    let recipeModel = req.getInstance('recipe');
        recipeModel.findAll().then((recipe) => {
            if (recipe.length > 0) {  
                return utils_response.makeResponse(res, true, 200, 'success', 'Recipe Type', 'Recipes list fetched successful.', recipe);
            }
            else {
                return utils_response.makeResponse(res, false, 200, 'error', 'recipe Type', 'No recipe Type found in database.');
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
// Get Recipe Details API
let getRecipe = async(req, res)=>{
    let recipeModel = req.getInstance('recipe');
        recipeModel.findOne({where: {recipe_id: req.query.id}}).then((recipe) => {
            if (recipe) {  
                return utils_response.makeResponse(res, true, 200, 'success', 'Recipe Type', 'Recipes list fetched successful.', recipe);
            }
            else {
                return utils_response.makeResponse(res, false, 200, 'error', 'recipe Type', 'No recipe Type found in database.');
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
// Remove Recipe API
let removeRecipe = async(req, res)=>{
    let recipeModel = req.getInstance('recipe');
        recipeModel.destroy({where: {recipe_id: req.body.recipe_id}}).then((recipe) => {
            if (recipe) {  
                return utils_response.makeResponse(res, true, 200, 'success', 'Recipe', 'Recipes removed successful.', recipe);
            }
            else {
                return utils_response.makeResponse(res, false, 200, 'error', 'recipe Type', 'No recipe Type found in database.');
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
// Update Recipe API
let updateRecipe = async(req, res)=>{
    let {name,recipe_id, preprationSteps, image,ingredients,numberOfServings,cookingTime} =req.body;
    name= name.toLowerCase();
    let recipeObj = {};
    recipeObj.recipe_id = uuidv4();
    recipeObj.name = name;
    recipeObj.preprationSteps = preprationSteps;
    recipeObj.image = image;
    recipeObj.ingredients = ingredients;
    recipeObj.numberOfServings = numberOfServings;
    recipeObj.cookingTime = cookingTime;
    recipeObj.IsActive = true;
    recipeObj.Last_Updated_Date = new Date();
    recipeObj.createdAt = new Date();
    recipeObj.Updated_By = 'admin';
    let recipeModel = req.getInstance('recipe');
    recipeModel.update(recipeObj,{where: {recipe_id:  recipe_id}}).then((recipe) => {
            if (recipe) { 
                return utils_response.makeResponse(res, true, 200, 'success', 'recipe Type Updated', 'recipe has been successful updated.', recipe);
            }
            else {
                return utils_response.makeResponse(res, false, 200, 'error', 'Insertion not successful', 'recipe cannot be updated.');
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
// Upload Image 
 let  imageFileUpload = (req, res, next)=>{
    try {
        console.log("files..................", req.files);
        multer.resizeAndUpload(req.files[0].location, req.files[0].key.split('1000X1000/')[1], 2);
          console.log("req.files..................", req.files);
        let  url= {url: req.files[0].location}
                   return utils_response.makeResponse(res, true, 200, 'success', 'Uploaded', 'Image has been successfully uploaded.', url);

    }
    catch (err) {
        console.log("errr..................", err);
        return next(err);
    }
}
module.exports = { 
    addrecipe,
    listAllRecipes,
    getRecipe,
    removeRecipe,
    updateRecipe,
    imageFileUpload
    
} 