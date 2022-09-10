import { Router, Request, Response, NextFunction } from "express";
import { IServices } from "..";
import { IController } from "../interfaces/controller.interface";
import { IFileToUpload } from "../interfaces/file.interface";
import validationMiddleware from "../middlewares/validation.middleware";
import FilesUploaderService from "./uploader.service";
import validate from "./uploader.validation";

class FilesUploaderController implements IController {
  private readonly filesUploaderService;
  constructor(
    { filesService: fileService }: IServices,
    public path: string = "/upload",
    public router: Router = Router()
  ) {
    this.filesUploaderService = fileService;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      this.path,
      validationMiddleware(validate.uploadFile),
      this.uploadNewFile
    );
  }

  uploadNewFile = async (req: Request, res: Response, next: NextFunction) => {
    const fileToUploadParams: IFileToUpload = req.body;
    const response = await this.filesUploaderService.uploadFile(
      fileToUploadParams
    );
    return res.status(201).send(response);
  };
}

export default FilesUploaderController;
