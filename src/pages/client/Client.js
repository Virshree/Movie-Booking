import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { getAllMovies } from "../../api/movie";
import {
  getAllTheatre,
  getTheatreById,
  updateTheatreDetails,
} from "../../api/theatre";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { cities } from "../../utils/Cities";
//import MovieList from "../../components/movielist/MovieList";
//import TheatreLists from "../../components/theatrelist/TheatreLists";
import "./client.css";
function Client() {
  const [theatreList, setTheatreList] = useState([]);
  const [tempTheatreDetail, setTempTheatreDetail] = useState({});

  const [editTheatreModal, setEditTheatreModal] = useState(false);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    fetchTheatreDetails();
    fetchMoviesDetails();
  }, []);
  const fetchTheatreDetails = async () => {
    const { data } = await getAllTheatre();
    console.log(data);
    setTheatreList(data);
  };
  const editTheatres = async (theatreId) => {
    const result = await getTheatreById(theatreId._id);
    console.log(result);
    setEditTheatreModal(true);

    setTempTheatreDetail(result.data);
  };
  const updateTempTheatreDetails = (e) => {
    if (e.target.name === "name") {
      tempTheatreDetail.name = e.target.value;
    } else if (e.target.name === "description") {
      tempTheatreDetail.description = e.target.value;
    } else if (e.target.name === "pinCode") {
      tempTheatreDetail.pinCode = e.target.value;
    } else if (e.target.name === "city") {
      tempTheatreDetail.city = e.target.value;
    }
    setTempTheatreDetail(Object.assign({}, tempTheatreDetail));
  };
  const handleEditTheatre = async (e) => {
    e.preventDefault();
    await updateTheatreDetails(tempTheatreDetail);
    setEditTheatreModal(false);
    fetchTheatreDetails();
  };

  const fetchMoviesDetails = async () => {
    const { data } = await getAllMovies();
    console.log(data);
    setMovieList(data);
  };
  return (
    <div>
      <Header hideSearch={true} />
      <div className="client-main bg-light text-dark vh-120 ">
        <h2>Welcome ,{localStorage.getItem("name")} </h2>

        <p>Please check the products below</p>

        <div style={{ margin: "50px" }}>
          <MaterialTable
            data={theatreList}
            columns={[
              {
                title: "Theatre Id",
                field: "_id",
              },
              {
                title: "Theatre Name",
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
                title: "PinCode",
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
                tooltip: "Edit theatre",
                onClick: (event, rowData) => editTheatres(rowData),
              },
            ]}
            title="Theatre Records"
          />
          {editTheatreModal ? (
            <>
              <Modal
                show={editTheatreModal}
                onHide={() => setEditTheatreModal(false)}
                centered
                // // backdrop="static"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Edit theatre</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h2>Id:{tempTheatreDetail._id}</h2>
                  <form onSubmit={handleEditTheatre}>
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
                        Edit
                      </Button>
                      <Button
                        className="btn btn-danger m-2"
                        onClick={() => setEditTheatreModal(false)}
                      >
                        Close
                      </Button>
                    </Modal.Footer>
                  </form>
                </Modal.Body>
              </Modal>
            </>
          ) : (
            <></>
          )}
        </div>

        {/**Movies */}
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
        />
      </div>

      <Footer />
    </div>
  );
}

export default Client;
