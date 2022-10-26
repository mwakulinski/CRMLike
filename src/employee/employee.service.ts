import { IEmployeeRepository } from "./employee.repository";
import { EmployeeType, EmployeeCreateType } from "./interfaces";
import { IRepositories } from "../repositories";

export interface IEmployeeService {
  createEmployee: (employee: EmployeeCreateType) => Promise<EmployeeType>;
  getAllEmployees: () => Promise<EmployeeType[]>;
  getEmployeeById: (id: number) => Promise<EmployeeType | undefined>;
}

class EmployeeService implements IEmployeeService {
  private readonly employeeRepository: IEmployeeRepository;
  constructor({ employeeRepository }: IRepositories) {
    this.employeeRepository = employeeRepository;
  }

  async createEmployee({
    name,
    surname,
    githubAccount,
    employmentType,
  }: EmployeeCreateType) {
    const user = await this.employeeRepository.findUnique(
      "githubAccount",
      githubAccount
    );

    if (user) {
      throw new Error(
        `User with githubAccount: ${githubAccount} already exist`
      ); // TODO change to exceptions latter
    }

    return await this.employeeRepository.createEmployee({
      name,
      surname,
      githubAccount,
      employmentType,
    });
  }

  async getAllEmployees() {
    return await this.employeeRepository.getAllEmployees();
  }

  async getEmployeeById(id: number) {
    return await this.employeeRepository.findUnique("id", id);
  }
}

export default EmployeeService;
