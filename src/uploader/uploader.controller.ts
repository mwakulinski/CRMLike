import { Router, Request, Response, NextFunction } from "express";
import { IController } from "../interfaces/controller.interface";
import { IFileToUpload } from "../interfaces/file.interface";
import validationMiddleware from "../middlewares/validation.middleware";
import validate from "./uploader.validation";
import { IServices } from "../services";

class FilesUploaderController implements IController {
  private readonly filesUploaderService;
  constructor(
    { filesUploaderService }: IServices,
    public path: string = "/upload",
    public router: Router = Router()
  ) {
    this.filesUploaderService = filesUploaderService;
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
