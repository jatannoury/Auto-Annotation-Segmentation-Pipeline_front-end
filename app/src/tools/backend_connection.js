import axios from "axios";
import http_tool from "./http_tool";
class BackendConnection {
  constructor() {
    this.axios_object = axios.create({
      baseURL: "http://localhost:8000",
    });
  }

  async ping() {
    const response = http_tool.get_request(this.axios_object, "/");
    return response;
  }
  async register(formData) {
    const response = http_tool.post_request(
      this.axios_object,
      "/users/register",
      formData
    );
    return response;
  }
  async sign_in(formData) {
    const response = http_tool.post_request(
      this.axios_object,
      "/users/login",
      formData
    );
    return response;
  }
}
const backend_cnx = new BackendConnection();

export default backend_cnx;
