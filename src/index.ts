import "dotenv/config";
import App from "./app";
import DateHandlerService, {
  IDateHandlerService,
} from "./date-handler/date-handler.service";
import EmployeeController from "./employee/employee.controller";
import EmployeeRepository, {
  IEmployeeRepository,
} from "./employee/employee.repository";
import EmployeeService, { IEmployeeService } from "./employee/employee.service";
import InvoicesController from "./invoices/invoices.controller";
import InvoicesService, { IInvoiceFacade } from "./invoices/invoices.service";
import InvoiceRepository, {
  IInvoicesRepository,
} from "./invoices/invoices.repository";
import SenderService, { ISenderService } from "./sender/sender.service";
import FilesUploaderController from "./uploader/uploader.controller";
import FilesUploaderService, {
  IFilesUploaderService,
} from "./uploader/uploader.service";
import { EnvSetter } from "./env-setter/env-setter";

const port = EnvSetter.setPort(process.env.PORT, { min: 0, max: 65536 });

export interface IUtilsServices {
  dateHandlerService: IDateHandlerService;
}

const utilsServices = {
  dateHandlerService: new DateHandlerService(),
};

export interface IRepositories {
  invoicesRepository: IInvoicesRepository;
  employeeRepository: IEmployeeRepository;
}

export const repositories: IRepositories = {
  invoicesRepository: new InvoiceRepository(),
  employeeRepository: new EmployeeRepository(),
};

export interface IServices {
  employeeService: IEmployeeService;
  filesUploaderService: IFilesUploaderService;
  senderService: ISenderService;
}
const services: IServices = {
  employeeService: new EmployeeService(repositories),
  filesUploaderService: new FilesUploaderService(),
  senderService: new SenderService(utilsServices),
};

export interface IFacades {
  invoiceFacade: IInvoiceFacade;
}

const facades: IFacades = {
  invoiceFacade: new InvoicesService(services, repositories),
};

const app = new App(
  [
    new EmployeeController(services),
    new FilesUploaderController(services),
    new InvoicesController(facades),
  ],
  port
);

app.start();
