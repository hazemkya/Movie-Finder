import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let movies 

export default class MoviesDAO {
    static async injectDB(conn){
        if (movies){
            return
        }
        try{
            movies = await conn.db(process.env.TMDB_NS).collection("movies")
        } catch (e){
            console.error(`Unable to connect to collection: ${e}`)
        }
    }
    static async getMovies({filters = null,
                            page = 0,
                            moviesPerPage = 10,} = {}){
        let query
        if (filters) {
          if ("title" in filters) {
            query = { $text: { $search: filters["title"] } }
          } 
        }
        let cursor
    
        try {
        cursor = await movies.find(query)
        } catch (e) {
        console.error(`Unable to issue find command, ${e}`)
        return { moviessList: [], totalNumMovies: 0 }
        }
        const displayCursor = cursor.limit(moviesPerPage).skip(moviesPerPage * page)

        try {
        const moviesList = await displayCursor.toArray()
        const totalNumMovies = await movies.countDocuments(query)

        return { moviesList, totalNumMovies }
        } catch (e) {
        console.error(
            `Unable to convert cursor to array or problem counting documents, ${e}`,
        )
        return { moviesList: [], totalNumMovies: 0 }
        }
    }
    static async getMovieByID(id) {
        try {
          const pipeline = [
            {
                $match: {
                    _id: new ObjectId(id),
                },
            },
                  {
                      $lookup: {
                          from: "reviews",
                          let: {
                              id: "$_id",
                          },
                          pipeline: [
                              {
                                  $match: {
                                      $expr: {
                                          $eq: ["$movie_id", "$$id"],
                                      },
                                  },
                              },
                              {
                                  $sort: {
                                      date: -1,
                                  },
                              },
                          ],
                          as: "reviews",
                      },
                  },
                  {
                      $addFields: {
                          reviews: "$reviews",
                      },
                  },
              ]
          return await movies.aggregate(pipeline).next()
        } catch (e) {
          console.error(`Something went wrong in getMovieByID: ${e}`)
          throw e
        }
      }

}