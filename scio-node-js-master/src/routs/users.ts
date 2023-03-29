import express, { Request, Response } from 'express';
import controllers from '../controllers/users';

const router = express.Router();



router
  .post('/login', controllers.login)
   .post('/register', controllers.register)
  // .get('/users', controllers.getAll)
  // .get('/users/:id', controllers.get)
  // .patch('/users/:id', controllers.update)
  // .delete('/users/:id', controllers.remove)
  

export = router; 