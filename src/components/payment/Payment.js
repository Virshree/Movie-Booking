import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import successgif from "../../assest/success.gif";
function Payment(props) {
  const {
    confirmationModal,
    setconfirmationModal,
    movieName,
    theatreName,
    selectSeats,
    TICKET_PRICE,
    handleConfirmPayment,
    paymentSuccessfull,
    setPaymentSuccessfull,
    handlePostPayment,
  } = props;

  const clearState = () => {
    setPaymentSuccessfull(false);
    setconfirmationModal(false);
  };
  return (
    <div>
      {confirmationModal && (
        <Modal
          show={confirmationModal}
          onHide={clearState}
          centered
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {" "}
              {paymentSuccessfull
                ? "Congrats !! Booking Confirmed "
                : "Please Confirm your Bookings"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {paymentSuccessfull && (
              <div className="d-flex justify-content-center">
                <img
                  src={successgif}
                  alt="success_gif"
                  width="150"
                  height="150"
                />
              </div>
            )}
            <div className="row my-3 ">
              <span className="col-sm-4">Movie name :</span>
              <span className="col-sm-8">{movieName}</span>
            </div>

            <div className="row my-3">
              <span className="col-sm-4">Theatre name:</span>
              <span className="col-sm-8">{theatreName}</span>
            </div>

            <div className="row my-3">
              <span className="col-sm-4">Selected Seats:</span>
              <span className="col-sm-8">
                {selectSeats.join(",")} ({selectSeats.length} seats)
              </span>
            </div>

            <div className="row my-3">
              <span className="col-sm-4">Total Price:</span>
              <span className="col-sm-8">
                {TICKET_PRICE * selectSeats.length}
              </span>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {!paymentSuccessfull ? (
              <>
                <Button
                  className="btn btn-danger m-2"
                  onClick={() => handleConfirmPayment()}
                >
                  Confirm
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="btn btn-secondary m-2"
                  onClick={() =>
                    // setconfirmationModal(false);
                    handlePostPayment()
                  }
                >
                  Close
                </Button>
              </>
            )}
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Payment;
