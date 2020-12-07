/*
-- Author: M Bilal
-- Created on 4 December, 2020
-- All recipe migrations
*/
module.exports = {
    up: (queryInterface, type) => {
        return queryInterface.createTable('recipe', {
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
            get() {
                return moment(this.getDataValue('created')).format('DD/MM/YYYY h:mm:ss');
            }
        },
        createdAt: {
            type: type.DATE,
            get() {
                return moment(this.getDataValue('created')).format('DD/MM/YYYY h:mm:ss');
            }
        }
            });
        },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('test_table');
    }
};