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
import { getAllMovies } from "../../api/movie";
import { Button, Modal } from "react-bootstrap";
import { cities } from "../../utils/Cities";

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

  const [counterInfo, setCounterInfo] = useState({});

  const refreshTheatres = async () => {
    const result = await getAllTheatre();
    console.log(result);
    setTheatreList(result.data);
    counterInfo.theatre = result.data.length;
    //console.log(counterInfo);
    setCounterInfo(counterInfo);
  };
  const refereshMovies = async () => {
    const result = await getAllMovies();
    //console.log(result);
    counterInfo.movies = result.data.length;
    //console.log(counterInfo);
    setCounterInfo(counterInfo);
  };
  useEffect(() => {
    refreshTheatres();
    refereshMovies();
  }, []);

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
              progress={{ color: "success", value: 75 }}
              text="Number of Bookings"
              title="Bookings"
              value="89.9%"
            />
          </div>
          <div className="col">
            <CWidgetStatsC
              className="mb-3"
              icon={<i className="bi bi-people" />}
              progress={{ color: "success", value: 75 }}
              text="Number of users"
              title="Users"
              value="89.9%"
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
        </Modal.Body>
      </Modal>

      {showMovieTable ? (
        <>
          <MaterialTable title="Movies List" />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Admin;
