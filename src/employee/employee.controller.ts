import { NextFunction, Router, Request, Response } from "express";
import { IController } from "../interfaces/controller.interface";
import validationMiddleware from "../middlewares/validation.middleware";
import { EmployeeCreateType } from "./interfaces";
import validate from "./employee.validation";
import { IEmployeeService } from "./employee.service";
import { IServices } from "../services";

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
    this.router.get(this.path, this.getAll);
    this.router.get(`${this.path}/:id`, this.getById);
    this.router.post(
      this.path,
      validationMiddleware(validate.employeeCreate),
      this.create
    );
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const employees = await this.employeeServices.getAll();
    return res.status(200).send({ employees });
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const employee = await this.employeeServices.getById(Number(id));
    return res.status(200).json(employee);
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    const employeeCreateDto: EmployeeCreateType = req.body;
    const newEmployeeID = await this.employeeServices.create(employeeCreateDto);
    return res.status(201).json({ id: newEmployeeID.id });
  };
}

export default EmployeeController;
