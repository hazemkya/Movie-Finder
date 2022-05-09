import React, {useState, useEffect} from "react";
import MovieDataService from "../services/movie";
import { Link } from "react-router-dom";

const MoviesList = props => {
    const [movies, setMovies] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [page, setPage] = useState(0);
    const [prevAct, setPrevAct] = useState("disabled");
    const [nextAct, setNextAct] = useState("");
    const [maxPage, setMaxPage] = useState(2);

    useEffect(() =>{
        console.log(`Page: ${page + 1}, Max page: ${maxPage+1}`);
        if(searchName)
            find();
        else
            retrieveMovies();

        if(page >= maxPage){
            console.log(`Max page exeded ${maxPage}`);
            setNextAct(curr=> curr = "disabled");
        }
        else if(page <= 0){
            setPrevAct(curr=> curr = "disabled");
        }

    },[page])


    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
      };
      

    const retrieveMovies = () => {
         MovieDataService.getAll(page)
          .then(response => {
            console.log(response.data);
            setMovies(response.data.movies);
            setMaxPage(parseInt((parseInt(response.data.total_results) / parseInt(response.data.entries_per_page)).toFixed(0)))
          })
          .catch(e => {
            console.log(e);
          });
      };

      const refreshList = () => {
        setSearchName("")
        retrieveMovies();
        resetPage();
      };

      const find = (query=searchName , by= "title", pageid=page) => {
        MovieDataService.find(query, by, pageid)
          .then(response => {
            console.log(response.data);
            setMovies(response.data.movies);
            setMaxPage(parseInt((parseInt(response.data.total_results) / parseInt(response.data.entries_per_page)).toFixed(0)))
          })
          .catch(e => {
            console.log(e);
          });
      };

      const findByName = () => {
        resetPage()
        find(searchName, "title", 0)
      };   


      const nextPage = () => {
        if(nextAct === "disabled") return;
        if(page > maxPage){
            setNextAct(curr=> curr = "disabled");
            return;
        }

        setPrevAct("")
        setPage(curr => curr + 1);
    }

    const prevPage = () => {
        if(prevAct === "disabled")return;
        if(page > 0){
            setPrevAct("")
            setNextAct("")
            setPage(curr => curr - 1)
        }
        else{
            setPrevAct("disabled")
        }
        
    }

    const resetPage =()=>{
        setPrevAct("disabled")
        setNextAct("")
        setPage(0)
    }

      return (
        <div>
          <div className="row pb-1">
            <div className="input-group col-lg-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name"
                value={searchName}
                onChange={onChangeSearchName}/>
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={findByName}>
                  Search
                </button>
              </div>
            </div>
            </div><br/>
            <div aria-label="pagination">
            <nav aria-label="Page navigation">
                <ul class="pagination justify-content-center" >
                    <li onClick={prevPage} class={`page-item ${prevAct}` }><a class="page-link" href="#">Previous</a></li>
                    <li class="page-item active"><a class="page-link" href="#">{page + 1}</a></li>
                    <li onClick={nextPage} class={`page-item ${nextAct}` }><a class="page-link" href="#">Next</a></li>
                </ul>
            </nav>
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
                      <a target="_blank" rel="noreferrer" href={"https://www.imdb.com/title/" + imdb_link} className="btn btn-primary col-lg-5 mx-1 mb-1">View On IMDB</a>
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
