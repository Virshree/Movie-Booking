import React from "react";
import "./card.css";
import { CWidgetStatsC, CCol, CRow } from "@coreui/react";

function Card() {
    
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <CRow>
            <CCol>
              <CWidgetStatsC
                className="mb-3"
                icon={<i className="bi bi-building" />}
                progress={{ color: "success", value: 75 }}
                text="Number of Theatres"
                title="Theatres"
                value="89.9%"
              />
            </CCol>
          </CRow>
        </div>
        <div className="col">
          <CWidgetStatsC
            className="mb-3"
            icon={<i className="bi bi-film" />}
            progress={{ color: "success", value: 75 }}
            text="Number of Movies"
            title="Movies"
            value="89.9%"
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
  );
}

export default Card;
