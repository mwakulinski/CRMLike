import { IFileToUpload } from "../interfaces/file.interface";
import path from "path";

class FilesUploaderService {
  async uploadFile({ uploadTo, filePath }: IFileToUpload) {
    const fileName = path.basename(filePath);
    return `${fileName} has been successfully uploaded to ${uploadTo}`;
  }
}

export default FilesUploaderService;
