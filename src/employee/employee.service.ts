import { IEmployee, IEmployeeCreate } from "./interfaces";

export class EmployeeService {
  public counter = 1;
  private employees: IEmployee[] = [
    {
      id: 0,
      name: "Michał",
      surname: "Wakulinski",
      githubAccount: "mwakulinski",
      employmentType: "B2B",
    },
  ];

  async createEmployee(employee: IEmployeeCreate) {
    const newEmployee = { id: this.counter, ...employee };
    this.employees.push(newEmployee);
    this.counter++;
    return newEmployee.id;
  }

  async getAllEmployees() {
    return this.employees;
  }
}
