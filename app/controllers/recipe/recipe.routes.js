/*
-- Author: M Bilal
-- Created on 4 December, 2020
-- All recipe routes
*/
const recipeController = require('./recipe.controller');
const  middleware = require('./recipe.middleware');
const authenticate = require('../../authMiddleware/authenticate');
multer = require('../../utils/multer');
const config = require("../../../config/configJs")
let imageUpload = multer.upload(config.aws.s3.bucket);
module.exports = function (app, base) {
      // add new recipe 
     app.post(`${base}/add-recipe`, middleware.recipeValidations, middleware.isRecipeExist, recipeController.addrecipe);
     // list all recipes
     app.get(`${base}/list-all-recipes`,   recipeController.listAllRecipes);
     // list details of recipe
     app.get(`${base}/get-recipe`,   recipeController.getRecipe);
     // Remove recipe
     app.post(`${base}/remove-recipe`,   recipeController.removeRecipe);
     // update recipe
     app.post(`${base}/update-recipe`,   middleware.recipeUpdateValidations,middleware.checkUpdateRecipeExist, recipeController.updateRecipe); 
     //upload image
     app.post(`${base}/upload-recipe`, imageUpload.array('image', 1), recipeController.imageFileUpload);


}