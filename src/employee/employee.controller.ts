import { NextFunction, Router, Request, Response } from "express";
import { IController } from "../interfaces/controller.interface";
import EmployeeService from "./employee.service";
import { IEmployeeCreate } from "./interfaces";

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
    this.router.get(`${this.path}/:id`, this.getEmployeeById);
    this.router.post(this.path, this.createNewEmployee);
  }

  getAllEmployees = async (req: Request, res: Response, next: NextFunction) => {
    const employees = await this.employeeService.getAllEmployees();
    return res.status(200).send({ employees });
  };

  getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const employee = await this.employeeService.getEmployeeById(Number(id));
    return res.status(200).json(employee);
  };

  createNewEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const employeeCreateDto: IEmployeeCreate = req.body;
    const newEmployeeID = await this.employeeService.createEmployee(
      employeeCreateDto
    );
    return res.status(201).json({ id: newEmployeeID });
  };
}

export default EmployeeController;
