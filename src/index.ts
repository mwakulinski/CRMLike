import "dotenv/config";
import App from "./app";
import EmployeeController from "./employee/employee.controller";
import EmployeeService from "./employee/employee.service";

const port = Number(process.env.PORT);
const app = new App([new EmployeeController(new EmployeeService())], port);

app.start();
