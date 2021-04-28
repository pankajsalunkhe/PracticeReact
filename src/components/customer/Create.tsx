import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { createCustomer } from "../../actions/customers";

export interface IValues {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
}
export interface IFormState extends RouteComponentProps {
  [key: string]: any;
  values: IValues[];
  submitSuccess: boolean;
  loading: boolean;
}

const Create: React.FC<IFormState> = ({
  key,
  values,
  loading,
  submitSuccess,
  history,
}) => {
  const initialCustomerState = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    description: "",
  };
  const [customer, setCustomer] = useState(initialCustomerState);
  const [loadings, setLoading] = useState(false);
  const dispatch = useDispatch();

  const processFormSubmission = () => {
    dispatch(
      createCustomer(
        customer.first_name,
        customer.last_name,
        customer.email,
        customer.phone,
        customer.address,
        customer.description
      )
    );
    setLoading(true);
    history.push("/");
  };

  const handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [e.currentTarget.name]: e.currentTarget.value });
  };

  return (
    <div>
      <div className={"col-md-12 form-wrapper"}>
        <h2> Create Post </h2>
        {!loadings && (
          <div className="alert alert-info" role="alert">
            Fill the form below to create a new post
          </div>
        )}
        {loadings && (
          <div className="alert alert-info" role="alert">
            The form was successfully submitted!
          </div>
        )}
        <form
          id={"create-post-form"}
          onSubmit={processFormSubmission}
          noValidate={true}
        >
          <div className="form-group col-md-12">
            <label htmlFor="first_name"> First Name </label>
            <input
              type="text"
              id="first_name"
              onChange={(e) => handleInputChanges(e)}
              name="first_name"
              className="form-control"
              placeholder="Enter customer's first name"
            />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="last_name"> Last Name </label>
            <input
              type="text"
              id="last_name"
              onChange={(e) => handleInputChanges(e)}
              name="last_name"
              className="form-control"
              placeholder="Enter customer's last name"
            />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="email"> Email </label>
            <input
              type="email"
              id="email"
              onChange={(e) => handleInputChanges(e)}
              name="email"
              className="form-control"
              placeholder="Enter customer's email address"
            />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="phone"> Phone </label>
            <input
              type="text"
              id="phone"
              onChange={(e) => handleInputChanges(e)}
              name="phone"
              className="form-control"
              placeholder="Enter customer's phone number"
            />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="address"> Address </label>
            <input
              type="text"
              id="address"
              onChange={(e) => handleInputChanges(e)}
              name="address"
              className="form-control"
              placeholder="Enter customer's address"
            />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="description"> Description </label>
            <input
              type="text"
              id="description"
              onChange={(e) => handleInputChanges(e)}
              name="description"
              className="form-control"
              placeholder="Enter Description"
            />
          </div>
          <div className="form-group col-md-4 pull-right">
            <button className="btn btn-success" type="submit">
              Create Customer
            </button>
            {loadings && <span className="fa fa-circle-o-notch fa-spin" />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
