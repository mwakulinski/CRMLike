import "dotenv/config";
import App from "./app";
import EmployeeController from "./employee/employee.controller";
import EmployeeService from "./employee/employee.service";
import FilesUploaderController from "./uploader/uploader.controller";
import FilesUploaderService from "./uploader/uploader.service";

const port = Number(process.env.PORT);
const app = new App(
  [
    new EmployeeController(new EmployeeService()),
    new FilesUploaderController(new FilesUploaderService()),
  ],
  port
);

app.start();
