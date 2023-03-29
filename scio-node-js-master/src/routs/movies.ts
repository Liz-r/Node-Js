import express from 'express';
import controllers from '../controllers/movies';
const router = express.Router();



router
  .get('/movies', controllers.getAll)
  .get('/movies/:id', controllers.get)
  .post('/movies', controllers.create)
  .patch('/movies/:id', controllers.update)
  .delete('/movies/:id', controllers.remove); 

export = router;