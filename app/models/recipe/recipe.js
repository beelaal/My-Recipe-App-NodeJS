/*
-- Author: M Bilal
-- Created on 4 December, 2020
-- Model Schema File
*/
module.exports = (sequelize, type) => {
    let recipe = sequelize.define('recipe', { 
    recipe_id: {
        type: type.STRING,
        primaryKey: true, 
    },
    name: {
        type: type.STRING,
        allowNull: false
    },
    image: type.STRING,
    preprationSteps: type.STRING,
    ingredients: type.STRING,
    numberOfServings: type.STRING,
    cookingTime: type.STRING,
    Updated_By: type.STRING,
    IsActive: type.STRING,
    Last_Updated_Date: {
        type: type.DATE,
         
    },
    createdAt: {
        type: type.DATE,
        
    }
}, {
    freezeTableName: true,
    timestamps: false
});
 return recipe;
};
