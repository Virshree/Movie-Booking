import MaterialTable from "@material-table/core";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getAllTheatre, updateTheatre } from "../../api/theatre";
import { ExportPdf, ExportCsv } from "@material-table/exporters";
import { Modal, ModalFooter, ModalTitle } from "react-bootstrap";

function TheatreLists() {
  const [theatreList, setTheatreList] = useState([]);
  const [selectedTheatre, setSelectedTheatre] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");

  useEffect(() => {
    fetchTheatre();
  }, []);

  //fetch data from theatre api

  function fetchTheatre() {
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
  }
  //edit theatre logic
  function editTheatre(rowData) {
    const edit = { ...rowData };
    //console.log(edit);
    setSelectedTheatre(edit);
    setShowEditModal(true);
    seterrorMessage("");
  }

  //delete theatre logic
  function deleteTheatre(rowData) {
    //console.log(id);

    const theatreId = rowData._id;
    console.log(theatreId);
    const theatreItem = theatreList.filter((theatre) => {
      const { _id } = theatre;
      return _id !== theatreId;
    });
    setTheatreList(theatreItem);
  }

  // function deleteTheatre(e) {
  //   const id = selectedTheatre._id;

  //   console.log(id);
  //   e.preventDefault();
  // }
  //edit theatre details
  function handleTicketsChange(e) {
    const tempTheatre = { ...selectedTheatre };
    console.log(tempTheatre);
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
  }

  function handleTicketTheatre(e) {
    const id = selectedTheatre._id;
    // console.log(id);
    //api call to save theatre data
    //send id and theatre data
    //success  of save it close the modal
    //and it must fetch the theatre list again
    //empty the selected theatre
    //on error ,i will show the error.
    try {
      updateTheatre(id, selectedTheatre)
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
  }

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
            <ModalTitle>Edit Theatre</ModalTitle>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h2> ID:{selectedTheatre._id}</h2>
              <hr />
              <form onSubmit={handleTicketTheatre}>
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

export default TheatreLists;
