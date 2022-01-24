import { FSx, S3 } from "aws-sdk";
import mime from "mime";
import { resolve } from "path";
import fs from "fs";
import upload from "../../../../../config/upload";
import { IStorageProvider } from "../IStorageProvider";

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_DEFAULT_REGION
    });
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalName);

    const ContentType = mime.getType(originalName);

    await this.client.putObject({
      Bucket: `${process.env.AWS_BUCKET_NAME}/${folder}`,
      Key: file,
      ACL: "public-read",
      Body: fileContent,
      ContentType
    }).promise();

    const avatar_url = `https://${process.env.AWS_BUCKET_NAME}.s3-${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${folder}/${file}`;

    console.log("deleted",originalName);
    await fs.promises.unlink(originalName);

    return avatar_url;
  }
  
  async delete(file: string, folder: string): Promise<void> {
    await this.client.deleteObject({
      Bucket: `${process.env.AWS_BUCKET_NAME}/${folder}`,
      Key: file,
    }).promise();
  }
}

export { S3StorageProvider };