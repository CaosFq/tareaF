const { validationResult, check } = require('express-validator');

exports.validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
};

exports.signupValidations = [
    check('name', 'the name is required').not().isEmpty(),
    check('email', 'the email is required').not().isEmpty(),
    check('email', 'the email must have a correct format').isEmail(),
    check('password', 'the password is required').not().isEmpty(),
];



exports.loginValidation = [
    check('email', 'the email is required').not().isEmpty(),
    check('email', 'the email must have a correct format').isEmail(),
    check('password', 'the password is required').not().isEmpty(),
];
exports.updateUserValidation = [
    check('name', 'the name is required').not().isEmpty(),
    check('email', 'the email must have a correct format').isEmail(),
    check('email', 'the email is required').not().isEmpty(),

];

exports.createRestaurantValidation = [
    check('name', 'the name is required').not().isEmpty(),
    check('address', 'the address is required').not().isEmpty(),
    check('rating', 'the rating is required').not().isEmpty(),
    check('rating', 'the rating must be numeric').isNumeric(),
],

exports.createReviewValidation = [
    check('comment', 'the comment is required').not().isEmpty(),
    check('rating', 'the rating is required').not().isEmpty(),
    
    check('rating', 'the rating must be numeric').isNumeric(),
];
    validateFields;

