import express from "express"
import MoviesCrtl from './movies.controller.js';

const router = express.Router()

router.route("/").get(MoviesCrtl.apiGetMovies)

export default router