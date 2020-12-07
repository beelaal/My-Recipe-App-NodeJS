/*
-- Author: M Bilal
-- Created on 4 December, 2020
*/
'use strict'; 
const { v4: uuidv4 } = require('uuid'); 
module.exports = {
  up: async (queryInterface, Sequelize) => { 
return queryInterface.bulkInsert('recipe', [{ 
      recipe_id: uuidv4(),
      name: "Chorizo & mozzarella gnocchi bake",
      image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/gnocchi-1d16725.jpg?quality=90&resize=440,400",
      preprationSteps:"STEP 1: Heat the oil in a medium pan over a medium heat. Fry the onion and garlic for 8-10 mins until soft. Add the chorizo and fry for 5 mins more.  STEP 2: Stir of the mozzarella and most of the basil through the gnocchi. Divide the mixture between six ovenproof ramekins, or put in one baking dish.",
      ingredients:"1 tbsp olive oil + 1 onion , finely chopped + 2 garlic cloves , crushed + 120g chorizo , diced",
      numberOfServings: "3",
      cookingTime:"10",
      Updated_By:"Admin",
      Last_Updated_Date:"2020-12-06 00:52:24"
    }]);
  },
down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('test', { email: 'test' }, {});
  }
};