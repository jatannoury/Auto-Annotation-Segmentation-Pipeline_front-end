import AWS from "aws-sdk";

class DynamoDBController {
  constructor() {
    AWS.config.update({
      accessKeyId: "",
      secretAccessKey: "",
      region: "eu-central-1",
    });
    this.dynamo_db = new AWS.DynamoDB();
    this.bucketName = "segmentation-projects";
  }
  async get_predicted_project_info(project_id, user_id) {
    const params = {
      TableName: "running_projects",
      KeyConditionExpression: "project_id = :pid AND userId = :uid",
      ExpressionAttributeValues: {
        ":pid": { S: project_id },
        ":uid": { S: user_id },
      },
    };

    let response = await this.dynamo_db.query(params).promise();
    return response.Items
  }
}
const dynamoDB_controller = new DynamoDBController();

export default dynamoDB_controller;
