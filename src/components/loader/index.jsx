// Loader.js
import React from "react";
import { connect } from "react-redux";
import "./loader.scss"; // Add styles for loader spinner

const Loader = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div className="loader-overlay">
      <div className="loader"></div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.dataset.loading,
});

export default connect(mapStateToProps)(Loader);
