import { diskStorage } from "multer";
import { randomBytes } from "crypto";
import { resolve } from "path";

const tmpFolder = resolve(__dirname, "..", "..", "tmp");

export default {
  tmpFolder,
  storage: diskStorage({
    destination: tmpFolder,
    filename: (req, file, callback) => {
      const fileHash = randomBytes(16).toString("hex");
      console.log(fileHash);
      const fileName = `${fileHash}-${file.originalname}`
      console.log(fileName);

      return callback(null, fileName);
    }
  })
}