import http from "../http-common";

const getAll = () => {
  return http.get("/customers");
};

const get = (id: number) => {
  return http.get(`/customers/${id}`);
};

const create = (data: any) => {
  return http.post("/customers", data);
};

const update = (id: number, data: any) => {
  return http.patch(`/customers/${id}`, data);
};

const remove = (id: number) => {
  return http.delete(`/customers/${id}`);
};

const CustomerService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default CustomerService;
