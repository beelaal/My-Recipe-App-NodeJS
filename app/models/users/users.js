module.exports = (sequelize, type) => {
    var userModel = sequelize.define('users', {
       users_id: {
            type: type.STRING,
            primaryKey: true,
        },
        email: type.STRING,
        password: type.STRING,
        username: type.STRING,
        profile_image: type.STRING,
        first_name: type.STRING,
        last_name: type.STRING,
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
        createdAt: type.DATE,
    }, {
        freezeTableName: true,
        timestamps: false
    });
    userModel.removeAttribute('id');
    return userModel;
    
};
