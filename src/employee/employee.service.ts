import { IEmployeeRepository } from "./employee.repository";
import { EmployeeType, EmployeeCreateType } from "./interfaces";

export interface IEmployeeService {
  create: (employee: EmployeeCreateType) => Promise<EmployeeType>;
  getAll: () => Promise<EmployeeType[]>;
  getById: (id: string) => Promise<EmployeeType | undefined>;
}

class EmployeeService implements IEmployeeService {
  private readonly employeeRepository: IEmployeeRepository;
  constructor({
    employeeRepository,
  }: {
    employeeRepository: IEmployeeRepository;
  }) {
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

  async getById(id: string) {
    return await this.employeeRepository.findUnique("id", id);
  }
}

export default EmployeeService;
