import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { getMovieDetail } from "../../api/movie";
import { getTheatreById } from "../../api/theatre";
import Cinema from "../../components/cinema/Cinema";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Screen from "../../components/screen/Screen";
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
      <div className="seat-main vh-140 p-4">
        <h2>
          {name}-{theatreName}
        </h2>
        <SeatGuide />
        <Screen />
        <Cinema />
        <span>You have selected </span>
        <br />
        <button>Payment</button>
      </div>
      <Footer />
    </div>
  );
}

export default SelectSeats;
