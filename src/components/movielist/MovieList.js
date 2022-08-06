import MaterialTable from "@material-table/core";
import React from "react";
import { useState, useEffect } from "react";
import { Modal, ModalTitle } from "react-bootstrap";
import { getAllMovies, updateMovie } from "../../api/movie";

function MovieList() {
  const [movieList, setMovieList] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [selectedMovie, setSelectedMovie] = useState({});

  useEffect(() => {
    fetchMoviesList();
  }, []);
  const fetchMoviesList = async () => {
    const { data } = await getAllMovies();
    console.log(data);
    setMovieList(data);
  };
  const editMovie = (rowData) => {
    const edit = { ...rowData };
    //console.log(edit);
    setSelectedMovie(edit);
    setShowEditModal(true);
  };

  const handleMovieChanges = (e) => {
    const tempMovie = { ...selectedMovie };
    if (e.target.name === "name") {
      tempMovie.name = e.target.value;
    } else if (e.target.name === "description") {
      tempMovie.description = e.target.value;
    } else if (e.target.name === "releaseStatus") {
      tempMovie.releaseStatus = e.target.value;
    } else if (e.target.name === "releaseDate") {
      tempMovie.releaseDate = e.target.value;
    } else if (e.target.name === "director") {
      tempMovie.director = e.target.value;
    }
    setSelectedMovie(tempMovie);
  };

  const handleMovieEditSubmit = (e) => {
    const id = selectedMovie._id;
    //console.log(id);
    setSelectedMovie(id);

    try {
      updateMovie(selectedMovie._id, selectedMovie).then((res) => {
        const { status, message, data } = res;
        if (status === 200) {
          console.log(data);
          setSelectedMovie({});
          setShowEditModal(false);
          seterrorMessage("");
          fetchMoviesList();
        } else {
          seterrorMessage(message);
        }
      });
    } catch (error) {
      console.log(error);
      seterrorMessage(error.message);
    }
    e.preventDefault();
  };

  return (
    <div style={{ margin: "80px", maxWidth: "100%" }}>
      <MaterialTable
        data={movieList}
        title="MovieList"
        columns={[
          {
            title: "ID",
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
            title: "ReleaseDate",
            field: "releaseDate",
          },
          {
            title: "ReleaseStatus",
            field: "releaseStatus",
          },
          {
            title: "Director",
            field: "director",
          },
        ]}
        options={{
          headerStyle: {
            backgroundColor: "black",
            color: "white",
          },
          rowStyle: {
            backgroundColor: "lightgray",
          },

          sorting: true,
          filtering: true,
          actionsColumnIndex: -1,
        }}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Movie",
            onClick: (event, rowData) => editMovie(rowData),
          },
          {
            icon: "delete",
            tooltip: "Delete Movie",
            // onClick: (event, rowData) => deleteTheatre(rowData),
          },
        ]}
      />

      {showEditModal && (
        <Modal
          show={showEditModal}
          onHide={() => {
            seterrorMessage("");
            setShowEditModal(false);
          }}
          backdrop="static"
          centered
          keyboard={false}
        >
          <Modal.Header closeButton>
            <ModalTitle>Edit Movie</ModalTitle>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h2> ID:{selectedMovie._id}</h2>
              <hr />
              <form onSubmit={handleMovieEditSubmit}>
                <div className="input-group m-2 ">
                  <label>
                    <strong>Name:</strong>
                    <input
                      type="text"
                      value={selectedMovie.name}
                      name="name"
                      onChange={handleMovieChanges}
                      className="form-control"
                      size="30"
                    />
                  </label>
                </div>
                <div className="input-group m-2 ">
                  <label>
                    <strong>Description:</strong>
                    <input
                      type="text"
                      value={selectedMovie.description}
                      name="description"
                      onChange={handleMovieChanges}
                      className="form-control"
                      size="30"
                    />
                  </label>
                </div>
                <div className="input-group m-2 ">
                  <label>
                    <strong>ReleaseDate:</strong>
                    <input
                      type="text"
                      value={selectedMovie.releaseDate}
                      name="releaseDate"
                      onChange={handleMovieChanges}
                      className="form-control"
                      size="30"
                    />
                  </label>
                </div>
                <div className="input-group m-2 ">
                  <label>
                    <strong>ReleaseStatus:</strong>
                    <input
                      type="text"
                      value={selectedMovie.releaseStatus}
                      name="releaseStatus"
                      onChange={handleMovieChanges}
                      className="form-control"
                      size="30"
                    />
                  </label>
                </div>
                <div className="input-group m-2 ">
                  <label>
                    <strong>Director:</strong>
                    <input
                      type="text"
                      value={selectedMovie.director}
                      name="director"
                      onChange={handleMovieChanges}
                      className="form-control"
                      size="30"
                    />
                  </label>
                </div>

                <Modal.Footer>
                  <div>
                    <button className="btn btn-primary" type="submit">
                      Update
                    </button>
                    <button
                      className="btn btn-secondary m-2"
                      onClick={() => setShowEditModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </Modal.Footer>
                <div>
                  <span className="text-danger text-center">
                    {errorMessage}
                  </span>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default MovieList;
