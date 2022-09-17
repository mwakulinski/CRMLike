import { IDatabase } from "../database/database";
import { IEmployee, IEmployeeCreate } from "./interfaces";

export interface IEmployeeService {
  createEmployee: (employee: IEmployeeCreate) => Promise<IEmployee>;
  getAllEmployees: () => Promise<IEmployee[]>;
  getEmployeeById: (id: number) => Promise<IEmployee | undefined>;
}

class EmployeeService implements IEmployeeService {
  private counter = 1;
  private readonly employees: IEmployee[];

  constructor({ employees }: IDatabase) {
    this.employees = employees;
  }

  async createEmployee(employee: IEmployeeCreate) {
    const newEmployee = { id: this.counter, ...employee };
    this.employees.push(newEmployee);
    this.counter++;
    return newEmployee;
  }

  async getAllEmployees() {
    return this.employees;
  }

  async getEmployeeById(id: number) {
    return this.employees.find((employee) => employee.id === id);
  }
}

export default EmployeeService;
