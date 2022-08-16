import MaterialTable from "@material-table/core";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  addNewTheatre,
  getAllTheatre,
  updateTheatreDetails,
} from "../../api/theatre";
import { ExportPdf, ExportCsv } from "@material-table/exporters";
import { Modal, ModalFooter, ModalTitle } from "react-bootstrap";

function TheatreLists() {
  const [theatreList, setTheatreList] = useState([]);
  const [showTheatreTable, setShowTheatreTable] = useState(false);
  const [selectedTheatre, setSelectedTheatre] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [addTheatreModal, setAddTheatreModal] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [counterInfo, setCounterInfo] = useState({});
  const [tempTheatreDetail, setTempTheatreDetail] = useState({});

  useEffect(() => {
    fetchTheatre();
    refreshTheatres();
  }, []);

  //fetch data from theatre api

  const fetchTheatre = () => {
    getAllTheatre()
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          // console.log(data);
          setTheatreList(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //edit theatre logic
  const editTheatre = (rowData) => {
    const edit = { ...rowData };
    //console.log(edit);
    setSelectedTheatre(edit);
    setShowEditModal(true);
    seterrorMessage("");
  };

  //delete theatre logic
  const deleteTheatre = (rowData) => {
    //console.log(id);

    const theatreId = rowData._id;
    //console.log(theatreId);
    const theatreItem = theatreList.filter((theatre) => {
      const { _id } = theatre;
      return _id !== theatreId;
    });
    setTheatreList(theatreItem);
  };

  //edit theatre details
  const handleTicketsChange = (e) => {
    const tempTheatre = { ...selectedTheatre };
    //console.log(tempTheatre);
    if (e.target.name === "name") {
      tempTheatre.name = e.target.value;
    } else if (e.target.name === "description") {
      tempTheatre.description = e.target.value;
    } else if (e.target.name === "city") {
      tempTheatre.city = e.target.value;
    } else if (e.target.name === "pinCode") {
      tempTheatre.pinCode = e.target.value;
    }
    setSelectedTheatre(tempTheatre);
  };

  const handleTicketTheatre = (e) => {
    const id = selectedTheatre._id;
    // console.log(id);
    //api call to save theatre data
    //send id and theatre data
    //success  of save it close the modal
    //and it must fetch the theatre list again
    //empty the selected theatre
    //on error ,i will show the error.
    try {
      updateTheatreDetails(id, selectedTheatre)
        .then((res) => {
          const { status, messgae } = res;
          if (status === 200) {
            setSelectedTheatre({});
            seterrorMessage("");
            setShowEditModal(false);
            fetchTheatre();
          } else if (messgae) {
            seterrorMessage(messgae);
          }
        })
        .catch((err) => {
          console.log(err);
          seterrorMessage(err.message);
        });
    } catch (err) {
      seterrorMessage(err.message);
    }
    e.preventDefault();
  };

  const addTheatre = () => {
    setAddTheatreModal(true);
  };

  const refreshTheatres = async () => {
    const result = await getAllTheatre();
    //console.log(result);
    setTheatreList(result.data);
    counterInfo.theatre = result.data.length;
    setCounterInfo(counterInfo);
    //console.log(counterInfo);
  };

  const clearState = () => {
    setShowEditModal(false);
    setAddTheatreModal(false);
    setTempTheatreDetail({});
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
    <div style={{ margin: "80px", maxWidth: "100%" }}>
      <MaterialTable
        data={theatreList}
        title="TheatreList"
        columns={[
          {
            title: "TheatreID",
            field: "_id",
          },
          {
            title: "TheatreName",
            field: "name",
          },
          {
            title: "Description",
            field: "description",
          },
          {
            title: "Pincode",
            field: "pinCode",
          },
          {
            title: "City",
            field: "city",
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
          exportMenu: [
            {
              label: "Export Pdf",
              exportFunc: (cols, data) =>
                ExportPdf(cols, data, "Theatre Records"),
            },
            {
              label: "Export Csv",
              exportFunc: (cols, data) =>
                ExportCsv(cols, data, "Theatre Records"),
            },
          ],
        }}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit theatre",
            onClick: (event, rowData) => editTheatre(rowData),
          },
          {
            icon: "delete",
            tooltip: "Delete theatre",
            onClick: (event, rowData) => deleteTheatre(rowData),
          },
        ]}
      />

      <div className="text-center">
        <button className="btn btn-danger m-3" onClick={addTheatre}>
          Add Theatre
        </button>
      </div>

      <Modal
        show={showEditModal || addTheatreModal}
        onHide={clearState}
        backdrop="static"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <ModalTitle>
            {showEditModal ? "Edit Theatre" : "Add Theatre"}
          </ModalTitle>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h2> ID:{selectedTheatre._id}</h2>
            <hr />
            <form onSubmit={showEditModal ? handleTicketTheatre : newTheatre}>
              <div className="input-group m-2 ">
                <label>
                  <strong>Name:</strong>
                  <input
                    type="text"
                    value={selectedTheatre.name}
                    name="name"
                    onChange={handleTicketsChange}
                    className="form-control"
                    size="30"
                  />
                </label>
              </div>
              <div className="input-group m-2">
                <label>
                  <strong>Description:</strong>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedTheatre.description}
                    name="description"
                    onChange={handleTicketsChange}
                    size="30"
                  />
                </label>
              </div>
              <div className="input-group m-2">
                <label>
                  <strong>PinCode:</strong>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedTheatre.pinCode}
                    name="pinCode"
                    onChange={handleTicketsChange}
                    size="30"
                  />
                </label>
              </div>
              <div className="input-group m-2">
                <label>
                  <strong> City:</strong>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedTheatre.city}
                    name="city"
                    onChange={handleTicketsChange}
                    size="30"
                  />
                </label>
              </div>

              <Modal.Footer>
                <div>
                  <button className="btn btn-primary" type="submit">
                    {showEditModal ? "Edit Theatre" : "Add Theatre"}
                  </button>
                  <button
                    className="btn btn-secondary m-2"
                    onClick={clearState}
                  >
                    Close
                  </button>
                </div>
              </Modal.Footer>
              <div>
                <span className="text-danger text-center">{errorMessage}</span>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default TheatreLists;
