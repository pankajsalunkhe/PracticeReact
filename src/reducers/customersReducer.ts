import {
  CREATE_CUSTOMER,
  RETRIEVE_CUSTOMERS,
  UPDATE_CUSTOMER,
  GET_CUSTOMER,
  DELETE_CUSTOMER,
} from "../actions/type";
import initialState from "./initialState";
import {ICustomer} from "../components/Home"

function customersReducer(customers: ICustomer[] = initialState.customers, action: any) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_CUSTOMER:
      return [...customers, payload];

    case RETRIEVE_CUSTOMERS:{
      return payload;
    }

    case GET_CUSTOMER:{
      return customers.filter((customer: any) => customer.id === payload.id)
    }
      

    case UPDATE_CUSTOMER:
      return customers.map((customer: any) => {
        if (customer.id === payload.id) {
          return {
            ...customer,
            ...payload,
          };
        } else {
          return customer;
        }
      });

    case DELETE_CUSTOMER:
      return customers.filter((customer: any) => customer.id !== payload.id);

    default:
      return customers;
  }
}

export default customersReducer;
