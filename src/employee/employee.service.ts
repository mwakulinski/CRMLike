import { IEmployeeRepository } from "./employee.repository";
import { EmployeeType, EmployeeCreateType } from "./interfaces";
import { IRepositories } from "../repositories";

export interface IEmployeeService {
  create: (employee: EmployeeCreateType) => Promise<EmployeeType>;
  getAll: () => Promise<EmployeeType[]>;
  getById: (id: number) => Promise<EmployeeType | undefined>;
}

class EmployeeService implements IEmployeeService {
  private readonly employeeRepository: IEmployeeRepository;
  constructor({ employeeRepository }: IRepositories) {
    this.employeeRepository = employeeRepository;
  }

  async create({
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


    return await this.employeeRepository.create({
      name,
      surname,
      githubAccount,
      employmentType,
    });
  }

  async getAll() {
    return await this.employeeRepository.getAll();
  }

  async getById(id: number) {
    return await this.employeeRepository.findUnique("id", id);
  }
}

export default EmployeeService;
