class HttpTool {
  constructor() {}
  post_request(axios_instance, route, body) {
    return axios_instance
      .post(route, body)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  get_request(axios_instance,route) {
    return axios_instance
      .get(route)
      .then((response) => {
        return response
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
const http_tool = new HttpTool();

export default http_tool;
