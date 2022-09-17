import "dotenv/config";
import App from "./app";
import database from "./database/database";
import DateHandlerService, {
  IDateHandlerService,
} from "./date-handler/date-handler.service";
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

export interface IUtilsServices {
  dateHandlerService: IDateHandlerService;
}

const utilsServices = {
  dateHandlerService: new DateHandlerService(),
};

export interface IServices {
  employeesService: IEmployeeService;
  filesUploaderService: IFilesUploaderService;
  invoicesService: IInvoicesService;
  senderService: ISenderService;
}
const services: IServices = {
  employeesService: new EmployeeService(database),
  filesUploaderService: new FilesUploaderService(),
  invoicesService: new InvoiceService(database),
  senderService: new SenderService(utilsServices),
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
