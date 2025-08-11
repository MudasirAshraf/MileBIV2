import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DashboardWrapper from "../../components/dashboard-wrapper";
import Book from "../../assets/svg/book.svg";
import * as Yup from "yup";
import axiosInstance from "../../components/axios";
import urlswithoutgateway from "../../actions/urlswithoutgateway";
import { useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import "./user-save.scss";
const SaveUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login.user);
  const [initialValues, setInitialValues] = useState({
    id: 0,
    userName: "",
    isActive: true,
    isDeleted: false,
    firstName: "",
    lastName: "",
    email: "",
    productId: "",
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axiosInstance.defaults.baseURL = urlswithoutgateway("admin");
    if (id) {
      fetchUserById(id).then((user) => setInitialValues(user?.data || {}));
    }
    fetchMasterData(user).then((data) => setProducts(data?.data || []));
  }, [id]);

  const save = async (user) => {
    try {
      setLoading(true);
      let response;
      if (user.id) {
        response = await axiosInstance.put(`/user/updateuser`, user);
      } else {
        response = await axiosInstance.post("/user/adduser", user);
      }
      setLoading(false);
      if (response.data.messageType === 1) {
        toast.success(response.data.message);
        navigate("/list-user");
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      toast.warn(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const fetchUserById = async (id) => {
    const response = await axiosInstance.get(`/user/getbyid/${id}`);
    return response.data;
  };

  const fetchMasterData = async (user) => {
    if (user) {
      const response = await axiosInstance.get(
        "/product/getactiveproducts/" + user.organizationId
      );
      return response.data;
    }
  };

  return (
    <div className="main-container-workspaces">
      <div className="container-workspaces">
        <DashboardWrapper>
          <div className="published-header">
            <img src={Book} alt="" />
            <p>{id ? "Edit User" : "Save User"}</p>
          </div>
          <div className="main-container-save-user">
            <div className="save-user-container">
              <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={Yup.object({
                  id: Yup.number(),
                  userName: Yup.string().required("User Name is required"),
                  // password: Yup.string().required("Password is required"),
                  firstName: Yup.string().required("First Name is required"),
                  lastName: Yup.string().required("Last Name is required"),
                  email: Yup.string()
                    .email("Invalid email")
                    .required("Email is required"),
                  productId: Yup.string().required("Please select a product"),
                  isActive: Yup.boolean(),
                })}
                onSubmit={(values, { resetForm }) => {
                  save(values).then(() => {});
                }}
              >
                {({ values, setFieldValue }) => (
                  <Form>
                    {!id && (
                      <div className="row mb-3">
                        <div className="col-md-12">
                          <label className="block mb-1">UserName</label>
                          <Field
                            name="userName"
                            placeholder="Enter username"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="userName"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    )}
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="block mb-1">First Name</label>
                        <Field
                          name="firstName"
                          placeholder="Enter firstname"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="block mb-1">Last Name</label>
                        <Field
                          name="lastName"
                          placeholder="Enter lastname"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-12">
                        <label className="block mb-1">Email</label>
                        <Field
                          name="email"
                          type="email"
                          placeholder="Enter email"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-12">
                        <label className="block mb-1">Select Product</label>
                        <Select
                          options={products?.map((product) => ({
                            value: product.productId,
                            label: product.title,
                          }))}
                          className="form-control"
                          placeholder="Select a product"
                          value={
                            products
                              ?.map((product) => ({
                                value: product.productId,
                                label: product.title,
                              }))
                              .find(
                                (option) => option.value === values.productId
                              ) || null
                          }
                          onChange={(selectedOption) =>
                            setFieldValue(
                              "productId",
                              selectedOption ? selectedOption.value : ""
                            )
                          }
                        />
                        <ErrorMessage
                          name="productId"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-12 d-flex justify-content-end">
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
                            "Update User"
                          ) : (
                            "Save User"
                          )}
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </DashboardWrapper>
      </div>
    </div>
  );
};

export default SaveUser;
