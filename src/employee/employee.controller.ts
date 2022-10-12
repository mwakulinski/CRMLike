import { NextFunction, Router, Request, Response } from "express";
import { IController } from "../interfaces/controller.interface";
import validationMiddleware from "../middlewares/validation.middleware";
import { EmployeeCreateType } from "./interfaces";
import validate from "./employee.validation";
import { IServices } from "..";
import { IEmployeeService } from "./employee.service";

class EmployeeController implements IController {
  private readonly employeeServices: IEmployeeService;

  constructor(
    { employeeService }: IServices,
    public path: string = "/employees",
    public router: Router = Router()
  ) {
    this.employeeServices = employeeService;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllEmployees);
    this.router.get(`${this.path}/:id`, this.getEmployeeById);
    this.router.post(
      this.path,
      validationMiddleware(validate.employeeCreate),
      this.createNewEmployee
    );
  }

  getAllEmployees = async (req: Request, res: Response, next: NextFunction) => {
    const employees = await this.employeeServices.getAllEmployees();
    return res.status(200).send({ employees });
  };

  getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const employee = await this.employeeServices.getEmployeeById(Number(id));
    return res.status(200).json(employee);
  };

  createNewEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const employeeCreateDto: EmployeeCreateType = req.body;
    const newEmployeeID = await this.employeeServices.createEmployee(
      employeeCreateDto
    );
    return res.status(201).json({ id: newEmployeeID });
  };
}

export default EmployeeController;
