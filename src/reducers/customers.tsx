import {
  CREATE_CUSTOMER,
  RETRIEVE_CUSTOMERS,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMER,
} from "../actions/type";

const initialState: any = [];

function customers(customers = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_CUSTOMER:
      return [...customers, payload];

    case RETRIEVE_CUSTOMERS:
      return payload;

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

export default customers;
