import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetail } from "../../api/movie";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import ReactPlayer from "react-player";

import "./movieDetail.css";

function MovieDetail() {
  const [movieDetail, setMovieDetail] = useState({});
  const params = useParams();
  const { movieId } = params;
  console.log(movieId);

  useEffect(() => {
    fetchMovieDetails(movieId);
  }, []);
  const fetchMovieDetails = () => {
    // const { data } = await getMovieDetail(movieId);
    // console.log(data);

    getMovieDetail(movieId)
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          console.log(data);
          setMovieDetail(data);
        }
      })
      .catch((err) => {
        console.log(err.messgae);
      });
  };

  const {
    trailerUrl = " ",
    posterUrl = " ",
    name = " ",
    releaseDate = " ",
    releaseStatus = " ",
    description = " ",
    casts = [],
    director = " ",
    _id = " ",
  } = movieDetail;

  const buttonText =
    releaseStatus === "RELEASED" ? "Book Ticket" : "Coming Soon";
  const buttonUrl =
    releaseStatus === "RELEASED" ? `/buytickets/${name}/${_id}` : "#";
  return (
    <div>
      <Header hideSearch={true} />
      <div className="detail-main">
        <div className=" detail-section d-flex justify-content-center align-items-center">
          <ReactPlayer
            url={trailerUrl}
            controls={true}
            className="video"
            width="800px"
            height="450px"
          />
        </div>
        <div className="container">
          <div className="row ">
            <div className="col m-3 p-2">
              <img
                src={posterUrl}
                alt="poster img"
                width="250px"
                height="250px"
              />
            </div>

            <div className="col m-3 p-2">
              <h3>About the Movie</h3>
              <hr />
              <h4>{name}</h4>
              <hr />
              <h6>{description}</h6>
              <h6>Directed by {director}</h6>
              <h6>{releaseDate}</h6>

              <hr />
              <h6>Casts</h6>
              {casts.map((cast) => (
                <h6>{cast}</h6>
              ))}

              <Link to={buttonUrl} className="btn btn-danger">
                {buttonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MovieDetail;
