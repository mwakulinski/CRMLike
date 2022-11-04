import {
  EmployeeType,
  EmployeeCreateType,
  EmployeeUniqueProperty,
} from "./interfaces";

export interface IEmployeeRepository {
  create: (employee: EmployeeCreateType) => Promise<EmployeeType>;
  getAll: () => Promise<EmployeeType[]>;
  findUnique: (
    uniqueProperty: EmployeeUniqueProperty,
    value: number | string
  ) => Promise<EmployeeType | undefined>;
}

class EmployeeRepository implements IEmployeeRepository {
  private counter = 0;
  private readonly employees: EmployeeType[] = [];

  async create(employee: EmployeeCreateType) {
    const newEmployee = { id: this.counter, ...employee };
    this.employees.push(newEmployee);
    this.counter++;
    return newEmployee;
  }

  async getAll() {
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
