import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { retrieveCustomers, deleteCustomer } from "../actions/customersAction";

export interface ICustomer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
}

interface IState extends RouteComponentProps {
  customers: ICustomer[];
  retrieveCustomers: () => void;
  deleteCustomer: (id: number) => void;
}

const Home: React.FC<IState> = ({
  customers,
  retrieveCustomers,
  deleteCustomer,
  history,
}) => {
  useEffect(() => {
    retrieveCustomers();
  }, []);

  return (
    <div>
      {customers && customers.length === 0 && (
        <div className="text-center">
          <h2>No customer found at the moment</h2>
        </div>
      )}
      <div className="container">
        <div className="row">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Firstname</th>
                <th scope="col">Lastname</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Address</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers &&
                customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.first_name}</td>
                    <td>{customer.last_name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.address}</td>
                    <td>{customer.description}</td>
                    <td>
                      <div className="d-flex justify-content-between align-items-center">
                        <div
                          className="btn-group"
                          style={{ marginBottom: "20px" }}
                        >
                          <Link
                            to={`edit/${customer.id}`}
                            className="btn btn-sm btn-outline-secondary"
                          >
                            Edit Customer{" "}
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => deleteCustomer(customer.id)}
                          >
                            Delete Customer
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return { customers: state.customersReducer };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    retrieveCustomers: () => {
      dispatch(retrieveCustomers());
    },
    deleteCustomer: (id: number) => {
      dispatch(deleteCustomer(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
