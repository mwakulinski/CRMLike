import "dotenv/config";
import App from "./app";
import EmployeeController from "./employee/employee.controller";
import EmployeeService, { IEmployeeService } from "./employee/employee.service";
import InvoicesController from "./invoices/invoices.controller";
import InvoiceService, { IInvoicesService } from "./invoices/invoices.service";
import SenderService, { ISenderService } from "./sender/sender.service";
import FilesUploaderController from "./uploader/uploader.controller";
import FilesUploaderService, {
  IFilesUploaderService,
} from "./uploader/uploader.service";

const port = Number(process.env.PORT);

export interface IServices {
  employeesService: IEmployeeService;
  filesUploaderService: IFilesUploaderService;
  invoicesService: IInvoicesService;
  senderService: ISenderService;
}
const services: IServices = {
  employeesService: new EmployeeService(),
  filesUploaderService: new FilesUploaderService(),
  invoicesService: new InvoiceService(),
  senderService: new SenderService(),
};

const app = new App(
  [
    new EmployeeController(services),
    new FilesUploaderController(services),
    new InvoicesController(services),
  ],
  port
);

app.start();
