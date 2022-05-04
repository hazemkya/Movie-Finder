import MoviesDAO from "../dao/movies.dao.js"

export default class MoviesController{
    static async apiGetMovies(req, res, next) {
        const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage, 10) : 10
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.title){
            filters.title = req.query.title
        }
        
        const { moviesList, totalNumMovies} = await MoviesDAO.getMovies({
            filters,
            page,
            moviesPerPage
        })
        let response = {
            movies: moviesList,
            page: page,
            filters: filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies,
          }
          res.json(response)

    }




}
