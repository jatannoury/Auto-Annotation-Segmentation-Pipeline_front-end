import AWS from "aws-sdk";
class S3Controller {
  constructor() {
    AWS.config.update({
      accessKeyId: "AKIAZGKEV76KYXGDBZOT",
      secretAccessKey: "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",
      region: "eu-central-1",
    });
    this.s3 = new AWS.S3();
    this.bucketName = "segmentation-projects";
  }
  async get_objects_with_key(key) {
    return await this.s3
      .listObjects({ Bucket: this.bucketName, Prefix: key })
      .promise();
  }
  async get_all_objects() {
    return await this.s3.listObjects(
      { Bucket: this.bucketName },
      (err, data) => {
        if (err) {
          console.error("Error listing objects:", err);
        } else {
          console.log("Objects in the bucket:", data);
        }
      }
    );
  }

  post_object(file, extra_key) {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      // Convert the result to a Buffer to upload to S3
      const imageFile = fileReader.result;

      const params = {
        Bucket: this.bucketName,
        Key: extra_key,
        Body: imageFile,
      };

      this.s3.upload(params, (err, data) => {
        if (err) {
          console.error("Error uploading image:", err);
        } else {
          console.log("Image uploaded successfully:", data.Location);
        }
      });
    };

    // Read the image file as an ArrayBuffer using the FileReader
    fileReader.readAsArrayBuffer(file);
  }
  async get_object_content(key) {
    const params = {
      Bucket: this.bucketName,
      Key: key,
    };

    return await this.s3.getObject(params).promise();
  }
}
const s3_controller = new S3Controller();

export default s3_controller;
