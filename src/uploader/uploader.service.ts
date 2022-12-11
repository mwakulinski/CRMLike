import { IFileToUpload } from "../interfaces/file.interface";
import path from "path";

export interface IFilesUploaderService {
  upload: ({ uploadTo, filePath }: IFileToUpload) => Promise<string>;
}

class FilesUploaderService implements IFilesUploaderService {
  async upload({ uploadTo, filePath }: IFileToUpload) {
    const fileName = path.basename(filePath);
    return `${fileName} has been successfully uploaded to ${uploadTo}`;
  }
}

export default FilesUploaderService;
