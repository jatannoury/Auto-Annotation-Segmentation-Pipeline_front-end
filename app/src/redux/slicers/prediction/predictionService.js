import backend_cnx from "../../../tools/backend_connection";

const instant_prediction = async (image) => {
  const response = await backend_cnx.instant_prediction(image);
  return response;
};
const predictionService = {
  instant_prediction,
};
export default predictionService;
