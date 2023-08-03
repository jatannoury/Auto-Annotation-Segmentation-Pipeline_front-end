import backend_cnx from "../../../tools/backend_connection";

const create_project = async (formData) => {
  formData["protected"] = formData["protected"]==="Yes" ? true : false
  const response = await backend_cnx.create_project(formData);
  return response;
};

const authService = {
  create_project
};
export default authService;
