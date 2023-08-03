import axios from "axios";
import http_tool from "./http_tool";
class BackendConnection {
  constructor() {
    this.axios_object = axios.create({
      baseURL: "http://localhost:8000",
    });
  }

  async ping() {
    const response = await http_tool.get_request(this.axios_object, "/");
    return response;
  }
  async register(formData) {
    const response = await http_tool.post_request(
      this.axios_object,
      "/users/register",
      formData
    );
    return response;
  }
  async sign_in(formData) {
    const response = await http_tool.post_request(
      this.axios_object,
      "/users/login",
      formData
    );
    return response;
  }
  async create_project(formData) {
    const response = await http_tool.post_request(
      this.axios_object,
      "/project/create",
      formData
    );
    return response;
  }
  async get_projects(user_id) {
    const response = await http_tool.get_request(
      this.axios_object,
      `/project/projects?user_id=${user_id}`
    );
    return response;
  }
  async delete_project(project_id) {
    const response = await http_tool.delete_request(
      this.axios_object,
      `/project?project_id=${project_id}`
    );
    return response;
  }
}
const backend_cnx = new BackendConnection();

export default backend_cnx;
