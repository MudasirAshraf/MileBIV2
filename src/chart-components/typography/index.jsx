import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./typography.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { updateDashboard } from "../../actions/dashboardActions";

const Typography = ({
  dashboard,
  updateDashboard,
  chartOptions,
  gridHeight,
  overflow,
  index,
}) => {
  const quillRef = useRef(null);
  const [editorContent, setEditorContent] = useState("");
  const [savedContent, setSavedContent] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (dashboard && dashboard.datasetsTree && dashboard.datasetsTree[index]) {
      const initialContent =
        dashboard.datasetsTree[index].options?.options?.data || "";
      setEditorContent(initialContent);
      setSavedContent(initialContent);
    }
  }, [dashboard, index]);

  const saveContent = async () => {
    setSavedContent(editorContent);
    setIsEditMode(false);

    const updatedDashboard = {
      ...dashboard,
      datasetsTree: dashboard.datasetsTree.map((item, i) =>
        i === index
          ? {
              ...item,
              options: {
                ...item.options,
                options: { ...item.options.options, data: editorContent },
              },
            }
          : item
      ),
    };

    await updateDashboard(updatedDashboard);
  };

  const toggleMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <div
      className="typography-wrapper container"
      style={{
        maxWidth: "1200px",
        padding: "20px",
        background: "#fff",
      }}
    >
      {isEditMode ? (
        <>
          <div className="editor-container" style={{ marginBottom: "20px" }}>
            <ReactQuill
              ref={quillRef}
              value={editorContent}
              onChange={setEditorContent}
              theme="snow"
              style={{ height: 200, width: "100%" }}
            />
          </div>
          <div style={{ textAlign: "right" }}>
            <button onClick={saveContent} className="save-btn mt-5">
              <FontAwesomeIcon icon={faSave} style={{ marginRight: 8 }} />
              Save
            </button>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "10px",
            }}
          >
            <button onClick={toggleMode} className="edit-btn">
              <FontAwesomeIcon icon={faEdit} style={{ marginRight: 6 }} />
            </button>
          </div>
          {savedContent ? (
            <div
              className="content-preview"
              style={{
                position: "relative",
                marginBottom: "20px",
                color: "#000",
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: savedContent }} />
            </div>
          ) : (
            <p>No content saved yet.</p>
          )}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboard.current,
});

export default connect(mapStateToProps, { updateDashboard })(Typography);
