import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createNewBookings } from "../../api/booking";
import { getMovieById } from "../../api/movie";
import { makePaymentForBookings } from "../../api/payment";
import { getTheatreById } from "../../api/theatre";
import Cinema from "../../components/cinema/Cinema";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Payment from "../../components/payment/Payment";
import Screen from "../../components/screen/Screen";
import SeatGuide from "../../components/seatguide/SeatGuide";
import { DEFAULT_OCCUPIED_SEATS, TICKET_PRICE } from "../../constants/seating";
import "./selectseats.css";
function SelectSeats() {
  const [movieDetail, setMovieDetail] = useState({});
  const [theatreDetail, setTheatreDetail] = useState({});

  const [selectSeats, setSelectSeats] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState(DEFAULT_OCCUPIED_SEATS);
  const [confirmationModal, setconfirmationModal] = useState(false);
  const [bookingDetail, setBookingDetail] = useState({});
  const [paymentDetail, setPaymentDetail] = useState({});
  const [paymentSuccessfull, setPaymentSuccessfull] = useState(false);
  const param = useParams();
  const { movieId, theatreId } = param;
  // console.log(param);

  const createBooking = async () => {
    //api call to create new bookings
    //show booking modal
    const bookingData = {
      movieId,
      theatreId,
      noOfSeats: selectSeats.length,
      timing: new Date().toLocaleString(),
    };
    const response = await createNewBookings(bookingData);
    console.log(response);
    const { status, data } = response;
    console.log(data);
    if (status === 201) {
      setBookingDetail(data);
    }
    setconfirmationModal(true);
    setPaymentSuccessfull(false);
  };
  const handleConfirmPayment = async () => {
    const paymentData = {
      bookingId: bookingDetail._id,
      amount: TICKET_PRICE * selectSeats.length,
    };
    const response = await makePaymentForBookings(paymentData);
    console.log(response);
    const { status, data } = response;
    if (status === 201) {
      console.log(data);
      setPaymentDetail(data);
      setPaymentSuccessfull(true);
    }
  };

  const handlePostPayment = () => {
    setconfirmationModal(false);
    const tempOccupiedSeats = [...occupiedSeats];
    selectSeats.forEach((seat) => {
      tempOccupiedSeats.push(seat);
    });
    console.log(tempOccupiedSeats);
    setOccupiedSeats(tempOccupiedSeats);
    setSelectSeats([]);

    setPaymentSuccessfull(false);
  };
  useEffect(() => {
    fetchMoviesDetails(movieId);
    fetchTheatreDetails(theatreId);
  }, []);
  const fetchMoviesDetails = (movieId) => {
    getMovieById(movieId)
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          //console.log(data);
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
          //console.log(data);
          setTheatreDetail(data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const { name: movieName = "" } = movieDetail;
  const { name: theatreName = "" } = theatreDetail;

  return (
    <div>
      <Header hideSearch={true} />
      <div className="seat-main vh-140 p-4">
        <h2>
          {movieName}-{theatreName}
        </h2>
        <SeatGuide />
        <Screen />
        <Cinema
          createBooking={createBooking}
          setconfirmationModal={setconfirmationModal}
          selectSeats={selectSeats}
          occupiedSeats={occupiedSeats}
          setSelectSeats={setSelectSeats}
        />
        <div>
          <Payment
            confirmationModal={confirmationModal}
            setconfirmationModal={setconfirmationModal}
            selectSeats={selectSeats}
            movieName={movieName}
            handleConfirmPayment={handleConfirmPayment}
            theatreName={theatreName}
            TICKET_PRICE={TICKET_PRICE}
            paymentSuccessfull={paymentSuccessfull}
            handlePostPayment={handlePostPayment}
            setPaymentSuccessfull={setPaymentSuccessfull}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SelectSeats;
