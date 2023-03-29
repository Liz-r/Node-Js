import { Request, Response } from "express";
import mongoose from "mongoose";
import movie from "../interfaces/movies";

// ----------------------------------------------------GetAll Movies--------------------------
const getAll = async (req: Request, res: Response) => {
  // TODO serach in DB fr all movies
  const movies = await movie.find().exec();
  return res.status(200).json({
    message: "Movies All: ",
    data: movies
  });
}
//-------------------------------------------------Get One Movie------------------------
const get = async (req: Request, res: Response) => {
  const id = req.params.id;
  const movies = await movie.findById(id).exec();
  return res.status(200).json({
    message: "Movie: ",
    data: movies,
  });
}
//-------------------------------------------------Add Movie--------------------------------------------------------
const create = async (req: Request, res: Response) => {
  // TODO storage movie into db
  const { title, year } = req.body;
  if (title === '' || year === '' || !title || !year) {
    res.status(400).json({
      message: "Title & Year! Need To be Added"
    });
    return;
  }
  const movies = new movie({
    _id: new mongoose.Types.ObjectId(),
    title: title,
    year: year,
  });

  const result = await movies.save();
  return res.status(201).json({
    message: "Movie Added",
    data: {
      title,
      year,
      id: result.id,
    }
  });
}
//------------------------------------Edit Movie--------------------------
const update = async (req: Request, res: Response) => {
  // TODO find by id and update in db
  const id = req.params.id;
  const { title, year } = req.body;
  if (title === '' || year === '' || !title || !year) {
    res.status(400).json({
      message: "Title & Year! Need To be Added"
    });
    return;
  }
  const movies = await movie.findById(id).exec();
  if (!movies) {
    res.status(400).json({
      message: "No Movie Found"
    });
    return;
  }
  movies.title = title;
  movies.year = year;
  await movies.save();
  return res.status(200).json({
    message: "Movie Updated!",
    data: movies
  });
}
//-------------------------------DElete Movie----------------------------------------------------
const remove = async (req: Request, res: Response) => {
  const id = req.params.id;
  await movie.findByIdAndRemove(id).exec();
  return res.status(200).json({
    message: "Movie Deleted",
  });
}

export default { getAll, get, create, update, remove };