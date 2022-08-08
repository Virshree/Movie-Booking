import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "../../api/movie";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./selectTheatre.css";
function SelectTheatre() {
  const [selectTheatre, setSelectTheate] = useState({});

  const param = useParams();
  const { movieName, movieId } = param;

  useEffect(() => {
    fetchMovies(movieId);
  }, []);
  const fetchMovies = () => {
    getMovieDetail(movieId)
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          console.log(data);
          setSelectTheate(data);
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
  } = selectTheatre;

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

            <span>Date:{releaseDate}</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SelectTheatre;
