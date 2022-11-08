import Joi from "joi";
import { IFileToUpload } from "../interfaces/file.interface";

const uploadFile: Joi.ObjectSchema<IFileToUpload> = Joi.object({
  filePath: Joi.string().required(),
  uploadTo: Joi.string().required(),
});

export default { uploadFile };
