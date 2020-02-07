import React, { Component } from "react";

class FormError extends Component {
  render() {
    const { theMessage } = this.props;

    return <div className="col-12 px-3 pt-2 pb-3 text-danger">{theMessage}</div>;
  }
}

export default FormError;
