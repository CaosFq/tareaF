const {Router} = require('express');
const{signup, login} = require('../contollers/user.controller');
const { updateUser } = require('../controllers/user.controller');
const{
  validUserByEmail,
  validPassword,
  validUser,
  protectAccountOwner,
}=require('../middlewares/user.middleware');
const{
  signupValidations,
  validateFields,
  loginValidation,
  updateUserValidation,
  
}=require('../middlewares/validations.middleware');
const catchAsync = require('../utils/catchAsync');

const router= Router();

router.post('/signup', signupValidations, validateFields, signup);

router.post(
'/login',
loginValidation,
validateFields,
validUserByEmail,
validPassword,
login
);

router.use(protect);

router.patch(
  '/id:',
  updateUserValidation,
  validateFields, 
  validUser,
  protectAccountOwner, 
  updateUser);

module.exports = {
  user : router,
};
