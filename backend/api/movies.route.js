import express from "express"
import MoviesCrtl from './movies.controller.js'
import ReviewCtrl from './reviews.controller.js'

const router = express.Router()

router.route("/").get(MoviesCrtl.apiGetMovies)
router.route("/id/:id").get(MoviesCrtl.apiGetMovieById)

router
    .route("/review")
    .post(ReviewCtrl.apiPostReview)
    .put(ReviewCtrl.apiUpdateReview)
    .delete(ReviewCtrl.apiDeleteReview)

export default router