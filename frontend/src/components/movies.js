import React, {useState, useEffect} from "react";
import MovieDataService from "../services/movie";
import { Link } from "react-router-dom";

const Movie = props => {
  const initialMovieState = {
    id: null,
    name: "",
    reviews: []
  };
  const [movie, setMovie] = useState(initialMovieState);

  const getMovie = id => {
    MovieDataService.get(id)
      .then(response => {
        setMovie(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getMovie(props.match.params.id);
  }, [props.match.params.id]);

  const deleteReview = (reviewId, index) => {
    MovieDataService.deleteReview(reviewId, props.user.id)
      .then(response => {
        setMovie((prevState) => {
          prevState.reviews.splice(index, 1)
          return({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {movie ? (
        <div>
          <h5>{movie.title}</h5>
          <strong>Popularity : </strong>{parseFloat(movie.popularity).toFixed(2)}<br/>
          <strong>release_date : </strong>{movie.release_date}<br/>
          <strong>Rating : </strong>{movie.vote_average}<br/>
          <Link to={"/movies/" + props.match.params.id + "/review"} className="btn btn-primary">
            Add Review
          </Link>
          <h4> Reviews </h4>
          <div className="row">
            {movie.reviews.length > 0 ? (
             movie.reviews.map((review, index) => {
               return (
                 <div className="col-lg-4 pb-1" key={index}>
                   <div className="card">
                     <div className="card-body">
                       <p className="card-text">
                         <strong>User: </strong>{review.name}<br/>
                         <strong>Date: </strong>{review.date}<br/><hr/>
                         {review.text}
                       </p>
                       {props.user && props.user.id === review.user_id &&
                          <div className="row">
                            <a onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                            <Link to={{
                              pathname: "/movies/" + props.match.params.id + "/review",
                              state: {
                                currentReview: review
                              }
                            }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                          </div>                   
                       }
                     </div>
                   </div>
                 </div>
               );
             })
            ) : (
            <div className="col-sm-4">
              <p>No reviews yet.</p>
            </div>
            )}

          </div>

        </div>
      ) : (
        <div>
          <br />
          <p>No movie selected.</p>
        </div>
      )}
    </div>
  );
};

export default Movie;