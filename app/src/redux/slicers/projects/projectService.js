import backend_cnx from "../../../tools/backend_connection";

const create_project = async (formData) => {
  const response = await backend_cnx.create_project(formData);
  return response;
};
const get_projects = async (user_id) => {
  const response = await backend_cnx.get_projects(user_id);
  return response;
};

const delete_project = async (project_id) => {
  const response = await backend_cnx.delete_project(project_id);
  return response;
};
const start_project = async (project_info) => {
  const response = await backend_cnx.start_project(project_info);
  return response;
};

const projectService = {
  create_project,
  get_projects,
  delete_project,
  start_project,
};
export default projectService;
