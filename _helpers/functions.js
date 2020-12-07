module.exports = {
    validateApi: function (rulesObject) {
        return function (req, res, next) {
            // Validating Input
            var validation = new Validator(req.body, rulesObject, {
                "confirmed.password":"Confirm password not match to password."
            });
            if (validation.fails()) {
                //Validating fails
                var errorObj = validation.errors.all();
                return res.status(203).send({
                    type: 'error',
                    msg: errorObj[Object.keys(errorObj)[0]][0]
                });
            } else {
                return next();
            }
        }
    },
}