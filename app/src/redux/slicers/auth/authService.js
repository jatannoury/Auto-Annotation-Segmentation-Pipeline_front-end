import backend_cnx from "../../../tools/backend_connection";

const register = async (formData) => {
  const response = await backend_cnx.register(formData);
  return response;
};
const login = async (formData) => {
  const response = await backend_cnx.sign_in(formData);
  return response;
};
const authService = {
  register,
  login,
};
export default authService;
