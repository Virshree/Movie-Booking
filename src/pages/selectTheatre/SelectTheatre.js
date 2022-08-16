import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieById } from "../../api/movie";
import { getAllTheatre } from "../../api/theatre";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { getCurrentFilteredTheatres } from "../../utils/filteredtheatrelist";
import "./selectTheatre.css";
function SelectTheatre() {
  const [movieDetail, setMovieDetail] = useState({});
  const [theatreFilteredList, setTheatreFilteredList] = useState([]);
  const param = useParams();
  const { movieName, movieId } = param;

  useEffect(() => {
    fetchMovies(movieId);
    fetchTheatre();
  }, []);
  const fetchMovies = () => {
    getMovieById(movieId)
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          console.log(data);
          setMovieDetail(data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const fetchTheatre = () => {
    getAllTheatre()
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          console.log(data);
          // call a function which will filter out theatres for current movie
          // out of all theatres
          const filteredList = getCurrentFilteredTheatres(data, movieId);
          console.log(filteredList);
          setTheatreFilteredList(filteredList);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const {
    description = " ",
    language = " ",
    releaseStatus = " ",
    director = "",
    releaseDate = "",
  } = movieDetail;

  return (
    <div>
      <Header hideSearch={true} />

      <div className="select-main">
        <div className="select-theatre">
          <h2 className="p-2">{movieName}</h2>
          <hr />

          <span className="text-center m-2  movie-description">
            {description}
          </span>
          <span className="text-center m-2  movie-language">{language}</span>
          <span className="text-center m-2 movie-status">{releaseStatus}</span>
          <br />
          <br />
          <div>
            <h4>
              <i>Director By :{director}</i>
            </h4>

            <span>Release Date:{releaseDate}</span>
          </div>
        </div>
        <h2 className="text-center m-2" style={{ textTransform: "uppercase" }}>
          Select Theatre
        </h2>
        {theatreFilteredList.map((theatre) => {
          const { name, _id } = theatre;
          return (
            <div className="container movie">
              <Link
                to={`/select-seats/${movieId}/${_id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="row p-2 ">
                  <div className="col-md-4 ">{name}</div>

                  <span className="text-danger col-md-4 ">
                    <i class="bi bi-phone-fill"></i>m-Ticket
                  </span>
                  <span className="text-success col-md-4">
                    <i class="bi bi-cup-straw"></i>
                    Food & Beverages
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default SelectTheatre;
