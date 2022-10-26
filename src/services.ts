import EmployeeService, { IEmployeeService } from "./employee/employee.service";
import { repositories } from "./repositories";
import FilesUploaderService, {
  IFilesUploaderService,
} from "./uploader/uploader.service";
import SenderService, { ISenderService } from "./sender/sender.service";

export interface IServices {
  employeeService: IEmployeeService;
  filesUploaderService: IFilesUploaderService;
  senderService: ISenderService;
}

export const services: IServices = {
  employeeService: new EmployeeService(repositories),
  filesUploaderService: new FilesUploaderService(),
  senderService: new SenderService(),
};
