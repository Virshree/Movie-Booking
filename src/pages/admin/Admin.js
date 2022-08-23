import MaterialTable from "@material-table/core";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import Header from "../../components/header/Header";
import { CWidgetStatsC, CCol, CRow } from "@coreui/react";
import {
  addNewTheatre,
  deleteTheatreDetails,
  getAllTheatre,
  getTheatreById,
  updateTheatreDetails,
} from "../../api/theatre";
import {
  addNewMovies,
  getAllMovies,
  getMovieById,
  removeMovies,
  updateMovieDetails,
} from "../../api/movie";
import { Button, Modal } from "react-bootstrap";
import { cities } from "../../utils/Cities";
import { getBookings } from "../../api/booking";
import { getAllUsers } from "../../api/user";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

function Admin() {
  const [showUserTable, setShowUserTable] = useState(false);
  const [showTheatreTable, setShowTheatreTable] = useState(false);
  const [showMovieTable, setShowMovieTable] = useState(true);
  const [showBookingTable, setShowBookingTable] = useState(false);

  const [theatreList, setTheatreList] = useState([]);
  const [tempTheatreDetail, setTempTheatreDetail] = useState({});
  const [updateTheatreModal, setUpdateTheatreModal] = useState(false);
  const [addTheaterModal, setAddTheatreModal] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");

  const [movieList, setMovieList] = useState([]);
  const [tempMovieDetail, setTempMovieDetail] = useState({});
  const [updateMovieModal, setUpdateMovieModal] = useState(false);
  const [addMovieModal, setAddMovieModal] = useState(false);

  const [bookinglist, setBookingList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [counterInfo, setCounterInfo] = useState({});

  /**Theatre records logic start */
  const refreshTheatres = async () => {
    const result = await getAllTheatre();
    // console.log(result);
    setTheatreList(result.data);
    counterInfo.theatre = result.data.length;
    //console.log(counterInfo);
    setCounterInfo(counterInfo);
  };

  const editTheatre = async (theatreId) => {
    const result = await getTheatreById(theatreId._id);
    //console.log(result);
    setUpdateTheatreModal(true);
    setTempTheatreDetail(result.data);
    refereshMovies();
  };

  const deleteTheatre = async (theater) => {
    await deleteTheatreDetails(theater);

    refreshTheatres();
  };

  const clearState = () => {
    setAddTheatreModal(false);
    setUpdateTheatreModal(false);
    setAddMovieModal(false);
    setUpdateMovieModal(false);
    setTempMovieDetail({});
    setTempTheatreDetail({});
  };
  const updateTheatre = async (e) => {
    e.preventDefault();

    await updateTheatreDetails(tempTheatreDetail);

    refreshTheatres();
    clearState();
  };
  const addTheatre = () => {
    setAddTheatreModal(true);
  };

  const updateTempTheatreDetails = (e) => {
    if (e.target.name === "name") {
      tempTheatreDetail.name = e.target.value;
    } else if (e.target.name === "description") {
      tempTheatreDetail.description = e.target.value;
    } else if (e.target.name === "city") {
      tempTheatreDetail.city = e.target.value;
    } else if (e.target.name === "pinCode") {
      tempTheatreDetail.pinCode = e.target.value;
    }

    setTempTheatreDetail(Object.assign({}, tempTheatreDetail));
    seterrorMessage("");
  };
  const newTheatre = async (e) => {
    e.preventDefault();
    tempTheatreDetail.userId = "62a38a762f4e41d6b8b8fb48";
    const response = await addNewTheatre(tempTheatreDetail);
    if (response.status === 201) {
      refreshTheatres();
      clearState();
    } else {
      seterrorMessage(response.data.message);
    }
  };
  /**Movies logic start*/
  const refereshMovies = async () => {
    const result = await getAllMovies();
    //console.log(result);
    setMovieList(result.data);
    counterInfo.movies = result.data.length;
    console.log(counterInfo);

    setCounterInfo(counterInfo);
  };
  const editMovies = async (movieId) => {
    const result = await getMovieById(movieId._id);
    console.log(result);
    setUpdateMovieModal(true);
    setTempMovieDetail(result.data);
  };

  const deleteMovies = async (movie) => {
    await removeMovies(movie);
    refereshMovies();
  };

  const updateMovies = async (e) => {
    e.preventDefault();
    await updateMovieDetails(tempMovieDetail);

    refereshMovies();
    clearState();
  };
  const addMovies = () => {
    setAddMovieModal(true);
  };
  const newMovies = async (e) => {
    e.preventDefault();
    if (tempMovieDetail.releaseStatus === "undefined")
      tempMovieDetail.releaseStatus = "RELEASED";

    await addNewMovies(tempMovieDetail);

    refereshMovies();
    clearState();
  };

  const updateTempMovieDetails = (e) => {
    if (e.target.id === "name") {
      tempMovieDetail.name = e.target.value;
    } else if (e.target.id === "director") {
      tempMovieDetail.director = e.target.value;
    } else if (e.target.id === "description") {
      tempMovieDetail.description = e.target.value;
    } else if (e.target.id === "releaseDate") {
      tempMovieDetail.releaseDate = e.target.value;
    } else if (e.target.id === "releaseStatus") {
      tempMovieDetail.releaseStatus = e.target.value;
    } else if (e.target.id === "posterUrl") {
      tempMovieDetail.posterUrl = e.target.value;
    } else if (e.target.id === "trailerUrl") {
      tempMovieDetail.trailerUrl = e.target.value;
    }
    setTempMovieDetail(Object.assign({}, tempMovieDetail));
    seterrorMessage("");
  };

  /**Booking Records logic start */
  // const refreshhBooking = async () => {
  //   const result = await getBookings();
  //   console.log(result);
  //   //setBookingList(result.data);
  //   counterInfo.bookings = result.data.length;
  //   //console.log(counterInfo);
  //   setCounterInfo(counterInfo);
  // };

  /**User Records logic start */

  const refreshUsers = async () => {
    const result = await getAllUsers();
    //console.log(result);
    setUserList(result.data);
    counterInfo.user = result.data.length;
    //console.log(counterInfo);
    setCounterInfo(counterInfo);
  };
  useEffect(() => {
    refreshTheatres();
    refereshMovies();
    // refreshhBooking();
    refreshUsers();
  }, []);
  return (
    <div>
      <Header hideSearch={true} />
      <h2>Welcome ,{localStorage.getItem("name")}</h2>

      <p className="text-center text-secondary">
        Take a quick look at your stats below
      </p>

      <div className="container">
        <div className="row">
          <div className="col">
            <CRow>
              <CCol>
                <CWidgetStatsC
                  className="mb-3"
                  icon={<i className="bi bi-building" />}
                  color={showTheatreTable ? "success" : "dark"}
                  inverse
                  progress={{ value: counterInfo.theatre }}
                  text="Number of Theatres"
                  title="Theatres"
                  value={counterInfo.theatre}
                  onClick={() => setShowTheatreTable(!showTheatreTable)}
                />
              </CCol>
            </CRow>
          </div>
          <div className="col">
            <CWidgetStatsC
              className="mb-3"
              icon={<i className="bi bi-film" />}
              color={showMovieTable ? "success" : "dark"}
              inverse
              progress={{ value: counterInfo.movies }}
              text="Number of Movies"
              title="Movies"
              value={counterInfo.movies}
              onClick={() => setShowMovieTable(!showMovieTable)}
            />
          </div>
          <div className="col">
            <CWidgetStatsC
              className="mb-3"
              icon={<i className="bi bi-card-list" />}
              color={showBookingTable ? "success" : "dark"}
              inverse
              progress={{ value: counterInfo.bookings }}
              text="Number of Bookings"
              title="Bookings"
              value={counterInfo.bookings}
              onClick={() => setShowBookingTable(!showBookingTable)}
            />
          </div>
          <div className="col">
            <CWidgetStatsC
              className="mb-3"
              icon={<i className="bi bi-people" />}
              color={showUserTable ? "success" : "dark"}
              inverse
              progress={{ value: counterInfo.user }}
              text="Number of users"
              title="Users"
              value={counterInfo.user}
              onClick={() => setShowUserTable(!showUserTable)}
            />
          </div>
        </div>
      </div>

      {showTheatreTable ? (
        <>
          <MaterialTable
            style={{ margin: "60px" }}
            title="Theatre List"
            data={theatreList}
            columns={[
              {
                title: "Id",
                field: "_id",
              },
              {
                title: "Name",
                field: "name",
              },
              {
                title: "Description",
                field: "description",
              },
              {
                title: "City",
                field: "city",
              },
              {
                title: "Pincode",
                field: "pinCode",
              },
            ]}
            options={{
              sorting: true,
              filtering: true,
              actionsColumnIndex: -1,
              headerStyle: {
                backgroundColor: "black",
                color: "white",
              },
              exportMenu: [
                {
                  label: "Export PDF",
                  exportFunc: (cols, datas) =>
                    ExportPdf(cols, datas, "TheatreRecords"),
                },
                {
                  label: "Export CSV",
                  exportFunc: (cols, datas) =>
                    ExportCsv(cols, datas, "theatreRecords"),
                },
              ],
            }}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Theatre",
                onClick: (event, rowData) => editTheatre(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Theatre",
                onClick: (event, rowData) => deleteTheatre(rowData),
              },
            ]}
          />

          <span className="text-center ">
            <Button className="btn btn-info" onClick={addTheatre}>
              Add Theatre
            </Button>
          </span>
        </>
      ) : (
        <></>
      )}

      <Modal
        show={updateTheatreModal || addTheaterModal}
        onHide={clearState}
        backdrop="static"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {updateTheatreModal ? "Edit Theatre" : "Add Theatre"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={updateTheatreModal ? updateTheatre : newTheatre}>
            <div className="input-group  mb-3">
              <span className="input-group-text">
                <i className="bi bi-pencil "> </i>
              </span>
              <input
                type="text"
                className="form-control "
                placeholder="Enter Theatre Name"
                name="name"
                value={tempTheatreDetail.name}
                onChange={updateTempTheatreDetails}
              />
            </div>

            <div className="input-group  mb-3">
              <span className="input-group-text">
                <i className="bi bi-pencil "> </i>
              </span>
              <textarea
                type="text"
                className="form-control "
                placeholder="Enter Theatre Description"
                name="description"
                onChange={updateTempTheatreDetails}
                value={tempTheatreDetail.description}
              />
            </div>

            <select
              className="form-select form-select-sm mb-3"
              name="city"
              onChange={updateTempTheatreDetails}
              value={tempTheatreDetail.city}
            >
              <option>Select City</option>
              {cities.map((city, index) => {
                return (
                  <>
                    <option value={city} key={index}>
                      {city}
                    </option>
                  </>
                );
              })}
            </select>

            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="bi bi-pencil"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter PinCode"
                name="pinCode"
                onChange={updateTempTheatreDetails}
                value={tempTheatreDetail.pinCode}
              />
            </div>
            <Modal.Footer>
              <Button className="btn btn-info m-2" type="submit">
                {updateTheatreModal ? "Edit Theatre" : "Add Theatre"}
              </Button>
              <Button className="btn btn-danger m-2" onClick={clearState}>
                Close
              </Button>
            </Modal.Footer>
          </form>
          <div className="text-center text-danger">{errorMessage}</div>
        </Modal.Body>
      </Modal>

      {showMovieTable ? (
        <>
          <MaterialTable
            title="Movies List"
            style={{ margin: "60px" }}
            data={movieList}
            columns={[
              {
                title: "Poster Image",
                field: "img",
                render: (item) => (
                  <img
                    src={item.posterUrl}
                    alt="movie_poster"
                    width="90px"
                    height="90px"
                  />
                ),
              },

              {
                title: "Name",
                field: "name",
              },

              {
                title: "Director",
                field: "director",
              },

              { title: "ReleaseDate", field: "releaseDate" },
              {
                title: "ReleaseStatus",
                field: "releaseStatus",
              },
            ]}
            options={{
              headerStyle: {
                backgroundColor: "black",
                color: "white",
              },
              sorting: true,
              filtering: true,
              actionsColumnIndex: -1,
              exportMenu: [
                {
                  label: "Export PDF",
                  exportFunc: (cols, datas) =>
                    ExportPdf(cols, datas, "MovieRecords"),
                },
                {
                  label: "Export CSV",
                  exportFunc: (cols, datas) =>
                    ExportCsv(cols, datas, "movieRecords"),
                },
              ],
            }}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Movies",
                onClick: (event, rowData) => editMovies(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Movies",
                onClick: (event, rowData) => deleteMovies(rowData),
              },
            ]}
          />
          <div className="text-center">
            <Button className="btn btn-info" onClick={addMovies}>
              Add Movies
            </Button>
          </div>
        </>
      ) : (
        <></>
      )}

      <Modal
        show={updateMovieModal || addMovieModal}
        onHide={clearState}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {updateMovieModal ? "Edit Movies" : "Add Movies"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={updateMovieModal ? updateMovies : newMovies}>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="bi bi-pencil"> </i>
              </span>
              <input
                type="text"
                placeholder="Enter Movie Name"
                className="form-control"
                id="name"
                onChange={updateTempMovieDetails}
                value={tempMovieDetail.name}
                required
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="bi bi-pencil"> </i>
              </span>
              <input
                type="text"
                placeholder="Enter Movie Description"
                className="form-control"
                id="description"
                onChange={updateTempMovieDetails}
                value={tempMovieDetail.description}
                required
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="bi bi-pencil"> </i>
              </span>
              <input
                type="text"
                placeholder="Enter Movie Director"
                className="form-control"
                id="director"
                onChange={updateTempMovieDetails}
                value={tempMovieDetail.director}
                required
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="bi bi-pencil"> </i>
              </span>
              <input
                type="text"
                placeholder="Enter Movie Poster Url"
                className="form-control"
                id="posterUrl"
                onChange={updateTempMovieDetails}
                value={tempMovieDetail.posterUrl}
                required
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="bi bi-pencil"> </i>
              </span>
              <input
                type="text"
                placeholder="Enter Trailer Url"
                className="form-control"
                id="trailerUrl"
                onChange={updateTempMovieDetails}
                value={tempMovieDetail.trailerUrl}
                required
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="bi bi-pencil"> </i>
              </span>
              <input
                type="text"
                placeholder="Enter ReleaseDates"
                className="form-control"
                id="releaseDate"
                onChange={updateTempMovieDetails}
                value={tempMovieDetail.releaseDate}
                required
              />
            </div>
            <select
              className="form-select"
              id="releaseStatus"
              onChange={updateTempMovieDetails}
              required
              value={tempMovieDetail.releaseStatus}
            >
              <option>Select Status</option>
              <option value="RELEASED">RELEASED</option>
              <option value="UNRELEASED">UNRELEASED</option>
              <option value="BLOCKED">BLOCKED</option>
            </select>

            <Modal.Footer>
              <Button className="btn btn-info m-2" type="submit">
                {updateMovieModal ? "Edit Movies" : "Add Movies"}
              </Button>
              <Button className="btn btn-secondary m-2" onClick={clearState}>
                Close
              </Button>
            </Modal.Footer>
          </form>
          <div className="text-center text-danger">{errorMessage}</div>
        </Modal.Body>
      </Modal>

      {showBookingTable ? (
        <MaterialTable
          title="Booking Records"
          style={{ margin: "60px" }}
          data={bookinglist}
          columns={[
            {
              title: "UserId",
              field: "userId",
            },
            {
              title: "Created At",
              field: "createdAt",
            },
            {
              title: "No. of Seats",
              field: "noOfSeats",
            },
            {
              title: "Timing",
              field: "timing",
            },
            {
              title: "TotalCost",
              field: "totalCost",
            },
            {
              title: "Status",
              field: "status",
            },
          ]}
          options={{
            headerStyle: {
              backgroundColor: "black",
              color: "white",
            },
            exportMenu: [
              {
                label: "Export PDF",
                exportFunc: (cols, datas) =>
                  ExportPdf(cols, datas, "BookingRecords"),
              },
              {
                label: "Export CSV",
                exportFunc: (cols, datas) =>
                  ExportCsv(cols, datas, "bookingRecords"),
              },
            ],
          }}
        />
      ) : (
        <></>
      )}

      {showUserTable ? (
        <MaterialTable
          title="User Records"
          style={{ margin: "60px" }}
          data={userList}
          columns={[
            {
              title: "UserId",
              field: "userId",
            },
            {
              title: "Name",
              field: "name",
            },
            {
              title: "Email",
              field: "email",
            },
            {
              title: "UserTypes",
              field: "userType",
            },
            {
              title: "UserStatus",
              field: "userStatus",
            },
          ]}
          options={{
            headerStyle: {
              backgroundColor: "black",
              color: "white",
            },
            exportMenu: [
              {
                label: "Export PDF",
                exportFunc: (cols, datas) =>
                  ExportPdf(cols, datas, "UserRecords"),
              },
              {
                label: "Export CSV",
                exportFunc: (cols, datas) =>
                  ExportCsv(cols, datas, "userRecords"),
              },
            ],
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Admin;
