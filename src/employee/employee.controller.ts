import { NextFunction, Router, Request, Response } from "express";
import { IController } from "../interfaces/controller.interface";
import EmployeeService from "./employee.service";

class EmployeeController implements IController {
  constructor(
    private employeeService: EmployeeService,
    public path: string = "/employees",
    public router: Router = Router()
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllEmployees);
  }

  getAllEmployees = async (req: Request, res: Response, next: NextFunction) => {
    const employees = await this.employeeService.getAllEmployees();
    return res.status(200).send({ employees });
  };
}

export default EmployeeController;
