import { IFileToUpload } from "../interfaces/file.interface";
import path from "path";

export interface IFilesUploaderService {
  uploadFile: ({ uploadTo, filePath }: IFileToUpload) => Promise<string>;
}

class FilesUploaderService implements IFilesUploaderService {
  async uploadFile({ uploadTo, filePath }: IFileToUpload) {
    const fileName = path.basename(filePath);
    return `${fileName} has been successfully uploaded to ${uploadTo}`;
  }
}

export default FilesUploaderService;
