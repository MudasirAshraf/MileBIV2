import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Modal, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { updateDashboard } from "../../actions/dashboardActions";
import "./table-relations.scss";

const TableRelations = ({ datasets, dashboard, updateDashboard }) => {
  const [showModal, setShowModal] = useState(false);
  const [relationships, setRelationships] = useState([]);
  const [selectedMainTable, setSelectedMainTable] = useState(null);
  const [selectedMainTableId, setSelectedMainTableId] = useState(null);
  const [selectedForeignKey, setSelectedForeignKey] = useState(null);
  const [selectedRelatedTable, setSelectedRelatedTable] = useState(null);
  const [selectedRelatedTableId, setSelectedRelatedTableId] = useState(null);
  const [selectedPrimaryKey, setSelectedPrimaryKey] = useState(null);
  const [selectedFields, setSelectedFields] = useState([]);

  const tables = datasets.reduce((acc, dataset) => {
    acc[dataset.datasetTitle] = {
      data: dataset.dataSourceData,
      id: dataset.datasetId,
    };
    return acc;
  }, {});

  useEffect(() => {
    const savedRelations = dashboard?.tableRelationships;
    if (savedRelations) {
      setRelationships(savedRelations);
    }
  }, []);

  const handleAddRelationship = async () => {
    if (
      !selectedMainTable ||
      !selectedMainTableId ||
      !selectedForeignKey ||
      !selectedRelatedTable ||
      !selectedRelatedTableId ||
      !selectedPrimaryKey
    ) {
      alert("Please fill in all required fields before adding a relationship.");
      return;
    }

    const newRelationships = [
      ...relationships,
      {
        mainTable: selectedMainTable,
        mainTableId: selectedMainTableId,
        foreignKey: selectedForeignKey,
        relatedTable: selectedRelatedTable,
        relatedTableId: selectedRelatedTableId,
        primaryKey: selectedPrimaryKey,
        fields: selectedFields || [],
      },
    ];

    setRelationships(newRelationships);
    // setSelectedMainTable(null);
    // setSelectedMainTableId(null);
    // setSelectedForeignKey(null);
    // setSelectedRelatedTable(null);
    // setSelectedMainTableId(null);
    // setSelectedPrimaryKey(null);
    const updatedDashboard = {
      ...dashboard,
      tableRelationships: newRelationships,
    };
    await updateDashboard(updatedDashboard);
  };

  const handleDeleteRelationship = async (index) => {
    const updatedRelationships = relationships.filter((_, i) => i !== index);
    setRelationships(updatedRelationships);
    const updatedDashboard = {
      ...dashboard,
      tableRelationships: updatedRelationships,
    };
    await updateDashboard(updatedDashboard);
  };

  const optionsFromTable = (table) =>
    table
      ? Object.keys(tables[table].data[0] || {}).map((col) => ({
          label: col,
          value: col,
        }))
      : [];

  return (
    <div className="table-relations-main-container">
      <Button
        onClick={() => setShowModal(true)}
        className="define-relationships-btn"
      >
        Define Relationships
      </Button>

      <Modal
        show={showModal}
        size="xl"
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Define Relationships</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Main Table</label>
            <Select
              className="select-container-reactbox-table"
              classNamePrefix="react-select-box-table"
              options={Object.keys(tables).map((table) => ({
                label: table,
                value: table,
                id: tables[table].id,
              }))}
              onChange={(option) => {
                setSelectedMainTable(option.value);
                setSelectedMainTableId(option.id);
              }}
              placeholder="Select Table"
            />
          </div>
          <div className="form-group mt-3">
            <label>Foreign Key</label>
            <Select
              className="select-container-reactbox-table"
              classNamePrefix="react-select-box-table"
              options={optionsFromTable(selectedMainTable)}
              onChange={(option) => setSelectedForeignKey(option.value)}
              placeholder="Select Foreign Key"
            />
          </div>
          <div className="form-group mt-3">
            <label>Related Table</label>
            <Select
              className="select-container-reactbox-table"
              classNamePrefix="react-select-box-table"
              options={Object.keys(tables).map((table) => ({
                label: table,
                value: table,
                id: tables[table].id,
              }))}
              onChange={(option) => {
                setSelectedRelatedTable(option.value);
                setSelectedRelatedTableId(option.id);
              }}
              placeholder="Select Table"
            />
          </div>
          <div className="form-group mt-3">
            <label>Primary Key</label>
            <Select
              className="select-container-reactbox-table"
              classNamePrefix="react-select-box-table"
              options={optionsFromTable(selectedRelatedTable)}
              onChange={(option) => setSelectedPrimaryKey(option.value)}
              placeholder="Select Primary Key"
            />
          </div>

          <div className="mt-4">
            {relationships.map((rel, index) => (
              <Card key={index} className="p-3 mb-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <strong>
                      {rel.mainTable} (ID: {rel.mainTableId})
                    </strong>{" "}
                    ({rel.foreignKey})
                    <FontAwesomeIcon icon={faArrowRight} className="mx-2" />
                    <strong>
                      {rel.relatedTable} (ID: {rel.relatedTableId})
                    </strong>{" "}
                    ({rel.primaryKey})
                    {/* <div className="small text-muted">Fields: {rel.fields.join(", ")}</div> */}
                  </div>
                  <div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteRelationship(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddRelationship}>
            Save Relationship
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboard.current,
});
export default connect(mapStateToProps, {
  updateDashboard,
})(TableRelations);
