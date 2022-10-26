import "dotenv/config";
import App from "./app";
import EmployeeController from "./employee/employee.controller";
import InvoicesController from "./invoices/invoices.controller";
import FilesUploaderController from "./uploader/uploader.controller";
import { EnvSetter } from "./env-setter/env-setter";
import { services } from "./services";
import { facades } from "./facades";

const port = EnvSetter.setPort(process.env.PORT, { min: 0, max: 65536 });

const app = new App(
  [
    new EmployeeController(services),
    new FilesUploaderController(services),
    new InvoicesController(facades),
  ],
  port
);

app.start();
