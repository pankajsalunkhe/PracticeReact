import React, { useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCustomer, deleteCustomer } from "../../actions/customers";
import CustomerService from "../../services/CustomerService";

interface TParams {
  id: string;
}

export interface IValues {
  [key: string]: any;
}
export interface IFormState extends RouteComponentProps<TParams> {
  id: number;
  customer: any;
  values: IValues[];
  submitSuccess: boolean;
  loading: boolean;
}

const EditCustomer: React.FC<IFormState> = ({
  id,
  customer,
  values,
  submitSuccess,
  loading,
  match,
  history,
}) => {
  const initialCustomerState = {
    id: +match.params.id,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    description: "",
  };
  const [cust, setCustomer] = useState(initialCustomerState);
  const [loadings, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getCustomer = (id: number) => {
    CustomerService.get(id)
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCustomer(+match.params.id);
  }, [match.params.id]);

  const processFormSubmission = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    dispatch(updateCustomer(cust.id, cust));
    setLoading(true);
    history.push("/");
  };

  const handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    const updatecust = { ...cust, [e.currentTarget.id]: e.currentTarget.value };

    setCustomer(updatecust);
  };

  return (
    <div className="App">
      {cust && (
        <div>
          <h1> Customer List Management App</h1>
          <p> Built with React.js and TypeScript </p>

          <div>
            <div className={"col-md-12 form-wrapper"}>
              <h2> Edit Customer </h2>
              {loadings && (
                <div className="alert alert-info" role="alert">
                  Customer's details has been edited successfully{" "}
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
                    defaultValue={cust.first_name}
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
                    defaultValue={cust.last_name}
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
                    defaultValue={cust.email}
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
                    defaultValue={cust.phone}
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
                    defaultValue={cust.address}
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
                    defaultValue={cust.description}
                    onChange={(e) => handleInputChanges(e)}
                    name="description"
                    className="form-control"
                    placeholder="Enter Description"
                  />
                </div>
                <div className="form-group col-md-4 pull-right">
                  <button className="btn btn-success" type="submit">
                    Edit Customer{" "}
                  </button>
                  {loadings && (
                    <span className="fa fa-circle-o-notch fa-spin" />
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default EditCustomer;
