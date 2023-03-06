const express = require('express');
const cors = require('cors');


const { db } = require('../database/db');
const { userRouter } = require('../routes/user.routes');
const { restaurantRouter } = require('../routes/restaurant.routes');
const { orderRouter } = require('../routes/order.routes');
const { mealRouter } = require('../routes/meal.routes');
const initModel = require('./init.model');
const globalErrorHandler = require('../controllers/error.controller');
const morgan = require('morgan');

class Server {
  constructor() {
    //********************Propiedades del constrcuctor*********************

    this.app = express();

    this.port = process.env.PORT; //Permiten o denegar el acceso a mi app
    //Importante: ***********Postman salta la seguridad************

    this.paths = {
      //Aqui todas las rutas de mi app
      user: '/api/v1/users',
      restaurant: '/api/v1/restaurants',
      meal: '/api/v1/meals',
      order: '/api/v1/orders',
    };
    //Connect to db
    this.database(); //llamo al metodo para conectarme a la de B.D

    //Middlewares
    this.middlewares();

    //Routes
    this.routes();
  }

  //***********************************************************

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());

    if(process.env.NODE_ENV==='development'){
      this.app.use(morgan('dev'));
    }
  }

  routes() {
  this.app.use(this.paths.user, userRouter);
  this.app.use(this.paths.restaurant, restaurantRouter);
  this.app.use(this.paths.order, orderRouter);
  this.app.use(this.paths.router, mealRouter);

  this.app.all('*',(req, res, next) =>{
return next(
new AppError(`Can't find ${req.originalUrl} on this server!`, 404) 
  );

  });
  this.app.use(globalErrorHandler);
}

  database() {
    //configuracion de la base de datos
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(err => console.log(err));

    initModel();

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(err => console.log(err));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server Running On Por', this.port);
    });
  }
}

module.exports = Server;