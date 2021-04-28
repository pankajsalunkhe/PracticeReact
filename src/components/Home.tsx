import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { retrieveCustomers, deleteCustomer } from "../actions/customers";
import CustomerService from "../services/CustomerService";

interface ICustomer {
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
}

const Home: React.FC<IState> = ({ customers, history }) => {
  const [custs, setCustomers] = useState<ICustomer[]>();

  const getCustomers = () => {
    CustomerService.getAll()
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeCustomer = (id: number) => {
    CustomerService.remove(id)
      .then((response) => {})
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getCustomers();
  }, []);

  const deleteCustomer = (id: number) => {
    removeCustomer(id);
    if (custs) {
      const index = custs.findIndex((customer) => customer.id === id);
      custs.splice(index, 1);
      history.push("/");
    }
  };
  return (
    <div>
      {custs && custs.length === 0 && (
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
              {custs &&
                custs.map((customer) => (
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

export default Home;
