import backend_cnx from "../../../tools/backend_connection";

const instant_prediction = async (image) => {
  const response = await backend_cnx.instant_prediction(image);
  return response;
};
const instant_batch_prediction = async (images) => {
  const response = await backend_cnx.instant_batch_prediction(images);
  return response;
};
const predictionService = {
  instant_prediction,
  instant_batch_prediction  
};
export default predictionService;
