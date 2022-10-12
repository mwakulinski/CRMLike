import {
  EmployeeType,
  EmployeeCreateType,
  EmployeeUniqueProperty,
  EmploymentType,
} from "./interfaces";

export interface IEmployeeRepository {
  createEmployee: (employee: EmployeeCreateType) => Promise<EmployeeType>;
  getAllEmployees: () => Promise<EmployeeType[]>;
  findUnique: (
    uniqueProperty: EmployeeUniqueProperty,
    value: number | string
  ) => Promise<EmployeeType | undefined>;
}

class EmployeeRepository implements IEmployeeRepository {
  private counter = 1;
  private readonly employees: EmployeeType[] = [];

  async createEmployee(employee: EmployeeCreateType) {
    const newEmployee = { id: this.counter, ...employee };
    this.employees.push(newEmployee);
    this.counter++;
    return newEmployee;
  }

  async getAllEmployees() {
    return this.employees;
  }

  async findUnique(
    uniqueProperty: EmployeeUniqueProperty,
    value: number | string
  ) {
    return this.employees.find(
      (employee) => employee[uniqueProperty] === value
    );
  }
}

export default EmployeeRepository;
