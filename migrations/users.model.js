/*
-- Author: M Bilal
-- Created on 4 December, 2020
-- All user migrations
*/
module.exports = {
    up: (queryInterface, type) => {
        return queryInterface.createTable('users', {
            users_id: {
                type: type.STRING,
                primaryKey: true,
                 allowNull: false,
            },
            email: type.STRING,
            password: type.STRING,
            username: type.STRING,
            profile_image: type.STRING,
            locale: {
                type: type.STRING,
                defaultValue: 'en'
            },
            first_name: type.STRING,
            last_name: type.STRING,
            // Admin: type.STRING, //The flag to identify whether the user is an administrator. 
            // Vendor: type.STRING, //The flag to identify whether the user can host a product in the shop.
            // Intro: type.STRING, //	The brief introduction of the Vendor User to be displayed on the Product Page.
            // Profile: type.STRING, //The vendor details to be displayed on the Product Page.
            // LastLogin: type.STRING,
            sex: type.STRING,
            mobile: type.STRING,
            country_id: type.INTEGER,
            status: type.BOOLEAN,
            address_1: type.STRING,
            address_2: type.STRING,
            is_active: type.INTEGER,
            salute: {
                type: type.ENUM,
                values: ['Mr','Master','Mrs.','Miss','Ms.','Dr.']
            },
            role_id: type.STRING,
        createdAt: type.DATE,
    });
},
down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('test_table');
}
};