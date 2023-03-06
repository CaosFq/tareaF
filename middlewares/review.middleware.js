
const Review = require('../models/reviews.model');
const catchAsync = require('../utils/catchAsync');

exports.validaExistReview = catchAsync(async (req, res, next) =>{
    const {id} = req.params;

    const review = await Review.findOne({
        where:{
            id,
            satus: true,
        },
        include: [

            {
            model: User,
    },
],
    
});
    if (!review){
        return next(new AppError('Review Not Found', 404));
    }


    req.review = review;
    req.user = review.user;
    next();
});