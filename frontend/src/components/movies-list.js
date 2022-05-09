import React, {useState, useEffect} from "react";
import MovieDataService from "../services/movie";
import { Link } from "react-router-dom";

const MoviesList = props => {
    const [movies, setMovies] = useState([]);
    const [searchName, setSearchName] = useState("");

    useEffect(() =>{
        retrieveMovies();
    },[])

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
      };
    

    const retrieveMovies = () => {
        MovieDataService.getAll()
          .then(response => {
            console.log(response.data);
            setMovies(response.data.movies);
            
          })
          .catch(e => {
            console.log(e);
          });
      };

      const refreshList = () => {
        retrieveMovies();
      };

      const find = (query, by) => {
        MovieDataService.find(query, by)
          .then(response => {
            console.log(response.data);
            setMovies(response.data.movies);
          })
          .catch(e => {
            console.log(e);
          });
      };

      const findByName = () => {
        find(searchName, "title")
      };   

      return (
        <div>
          <div className="row pb-1">
            <div className="input-group col-lg-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name"
                value={searchName}
                onChange={onChangeSearchName}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={findByName}>
                  Search
                </button>
              </div>
            </div>
            </div>
          <div className="row">
            {movies.map((movie) => {
              const imdb_link = `${movie.imdb_id}`;
              return (
                <div className="col-lg-4 pb-1">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                      <p className="card-text">
                        <strong>Popularity : </strong>{parseFloat(movie.popularity).toFixed(2)}<br/>
                        <strong>release_date : </strong>{movie.release_date}<br/>
                        <strong>Rating : </strong>{movie.vote_average}<br/>
                      </p>
                      <div className="row">
                      <Link to={"/movies/"+movie._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                        View Reviews
                      </Link>
                      <a target="_blank" href={"https://www.imdb.com/title/" + imdb_link} className="btn btn-primary col-lg-5 mx-1 mb-1">View On IMDB</a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
}

export default MoviesList;
