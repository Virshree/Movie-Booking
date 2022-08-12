import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { getMovieDetail } from "../../api/movie";
import { getTheatreById } from "../../api/theatre";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import SeatGuide from "../../components/seatguide/SeatGuide";
import "./selectseats.css";
function SelectSeats() {
  const [movieDetail, setMovieDetail] = useState({});
  const [theatreDetail, setTheatreDetail] = useState({});
  const param = useParams();
  const { movieId, theatreId } = param;
  console.log(param);
  useEffect(() => {
    fetchMoviesDetails(movieId);
    fetchTheatreDetails(theatreId);
  }, []);
  const fetchMoviesDetails = (movieId) => {
    getMovieDetail(movieId)
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

  const fetchTheatreDetails = (theatreId) => {
    getTheatreById(theatreId)
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          console.log(data);
          setTheatreDetail(data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const { name = "" } = movieDetail;
  const { name: theatreName = "" } = theatreDetail;

  return (
    <div>
      <Header hideSearch={true} />
      <div className="seat-main vh-100 p-4">
        <h2>{name}</h2>
        <h3>{theatreName}</h3>
        <SeatGuide />
      </div>
      <Footer />
    </div>
  );
}

export default SelectSeats;
