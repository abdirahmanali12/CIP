const URL = "http://localhost:3456";
export const getAllCustomers = async () => {
  const res = await axios
    .get(URL + "/user/all")
    .catch((er) => console.warn(er));
  return res.data;
};

export const saveCustomerData = async (customer = {}) => {
  const res = await axios
    .post(URL + "/user/save", customer)
    .catch((er) => console.warn(er));
  if (res) return true;
  return false;
};
