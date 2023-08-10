import { v4 as uuidv4 } from "uuid";
import s3_controller from "../../tools/s3_controller";

const handleRequestInfo = (selectedDir, projectInfo, user) => {
  let data = {
    ...selectedDir,
    ...projectInfo,
  };
  data["total_size_GB"] = data["total_size(GB)"];
  data["total_size_MB"] = data["total_size(MB)"];
  data["s3_trainig_path"] = document.querySelector(
    ".s3_route_placeholder"
  ).value;
  data["project_name"] =
    data["s3_trainig_path"].length > 0
      ? data["s3_trainig_path"]
      : uuidv4().toString();
  Object.keys(data.data).forEach((file, index) => {
    file = data.data[file];

    s3_controller.post_object(
      file,
      `${user.userId}/${data["project_name"]}/${file.webkitRelativePath}`
    );
  });
  delete data["total_size(GB)"];
  delete data["total_size(MB)"];
  delete data["data"];
  delete data["password"];

  return data;
};

export default handleRequestInfo;
