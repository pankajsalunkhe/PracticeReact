import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCustomer, updateCustomer } from "../../actions/customersAction";

interface TParams {
  id: string;
}

export interface IValues {
  [key: string]: any;
}
export interface ICustomer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
}
export interface IFormState extends RouteComponentProps<TParams> {
  id: number;
  values: IValues[];
  submitSuccess: boolean;
  loading: boolean;
  getCustomer: (id: number) => void;
  updateCustomer: (id: number, customer: ICustomer) => void;
  customers: ICustomer[];
}

const Edit: React.FC<IFormState> = ({
  id,
  customers,
  values,
  submitSuccess,
  loading,
  getCustomer,
  updateCustomer,
  match,
  history,
}) => {
  useEffect(() => {
    getCustomer(+match.params.id);
  }, [match.params.id]);

  // const [cust, setCustomer] = useState<ICustomer>(customer);
  const [loadings, setLoading] = useState(false);

  const processFormSubmission = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    updateCustomer(+match.params.id, customers[0]);
    setLoading(true);
    history.push("/");
  };

  const handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    customers[0] = {
      ...customers[0],
      [e.currentTarget.id]: e.currentTarget.value,
    };
  };

  return (
    <div className="App">
      {customers &&
        customers.length === 1 &&
        customers.map((customer) => (
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
                      defaultValue={customer.first_name}
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
                      defaultValue={customer.last_name}
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
                      defaultValue={customer.email}
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
                      defaultValue={customer.phone}
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
                      defaultValue={customer.address}
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
                      defaultValue={customer.description}
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
        ))}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return { customers: state.customersReducer };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getCustomer: (id: number) => {
      dispatch(getCustomer(id));
    },
    updateCustomer: (id: number, customer: ICustomer) => {
      dispatch(updateCustomer(id, customer));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
