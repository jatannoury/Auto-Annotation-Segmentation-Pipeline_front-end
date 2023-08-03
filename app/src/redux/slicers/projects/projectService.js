import backend_cnx from "../../../tools/backend_connection";

const create_project = async (formData) => {
  formData["protected"] = formData["protected"] === "Yes" ? true : false;
  const response = await backend_cnx.create_project(formData);
  return response;
};
const get_projects = async (user_id) => {
  const response = await backend_cnx.get_projects(user_id);
  console.log(response);
  return response;
};

const authService = {
  create_project,
  get_projects,
};
export default authService;
