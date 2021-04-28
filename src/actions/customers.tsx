import { Dispatch } from "redux";
import {
  CREATE_CUSTOMER,
  RETRIEVE_CUSTOMERS,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMER,
} from "./type";

import CustomerService from "../services/CustomerService";

export const createCustomer = (
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  address: string,
  description: string
) => async (dispatch: Dispatch) => {
  try {
    const res = await CustomerService.create({
      first_name,
      last_name,
      email,
      phone,
      address,
      description,
    });

    dispatch({
      type: CREATE_CUSTOMER,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveCustomers = () => async (dispatch: Dispatch) => {
  try {
    const res = await CustomerService.getAll();

    dispatch({
      type: RETRIEVE_CUSTOMERS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateCustomer = (id: number, data: any) => async (
  dispatch: Dispatch
) => {
  try {
    const res = await CustomerService.update(id, data);

    dispatch({
      type: UPDATE_CUSTOMER,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteCustomer = (id: number) => async (dispatch: Dispatch) => {
  try {
    await CustomerService.remove(id);

    dispatch({
      type: DELETE_CUSTOMER,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};
