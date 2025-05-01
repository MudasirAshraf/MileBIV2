import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DashboardWrapper from "../../components/dashboard-wrapper";
import Book from "../../assets/svg/book.svg";
import * as Yup from "yup";
import axiosInstance from "../../components/axios";
import urlswithoutgateway from "../../actions/urlswithoutgateway";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const SaveWorkspace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login.user);

  const [initialValues, setInitialValues] = useState({
    id: 0,
    organizationId: user ? user.organizationId : 0,
    userId: user.id,
    workSpaceName: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axiosInstance.defaults.baseURL = urlswithoutgateway("admin");
    if (id) {
      fetchWorkspaceById(id).then((workspace) =>
        setInitialValues(workspace?.data || {})
      );
    }
  }, [id]);

  const saveWorkspace = async (workspace) => {
    try {
      setLoading(true);
      let response;
      if (workspace.id) {
        response = await axiosInstance.put(`/workspace/update`, workspace);
      } else {
        response = await axiosInstance.post("/workspace/add", workspace);
      }
      setLoading(false);
      if (response.data.messageType === 1) {
        toast.success(response.data.message);
        navigate("/list-workspaces");
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      toast.warn(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const fetchWorkspaceById = async (id) => {
    const response = await axiosInstance.get(`/workspace/get/${id}`);
    return response.data;
  };

  return (
    <div className="main-container-workspaces">
      <div className="container-workspaces">
        <DashboardWrapper>
          <div className="published-header mb-4">
            <img src={Book} alt="workspace icon" />
            <p>{id ? "Edit Workspace" : "Save Workspace"}</p>
          </div>
          <div className="p-4 mx-auto" style={{ maxWidth: "800px" }}>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={Yup.object({
                workSpaceName: Yup.string().required(
                  "Workspace Name is required"
                )
              })}
              onSubmit={(values, { resetForm }) => {
                saveWorkspace(values);
              }}
            >
              {() => (
                <Form>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <label className="block">Workspace Name</label>
                      <Field
                        name="workSpaceName"
                        placeholder="Enter Workspace Name"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="workSpaceName"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                        style={{ width: "fit-content" }}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            {id ? "Updating..." : "Saving..."}
                          </>
                        ) : id ? (
                          "Update Workspace"
                        ) : (
                          "Save Workspace"
                        )}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </DashboardWrapper>
      </div>
    </div>
  );
};

export default SaveWorkspace;
