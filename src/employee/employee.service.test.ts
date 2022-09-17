import { IDatabase } from "../database/database";
import EmployeeService, { IEmployeeService } from "./employee.service";
describe("EmployeeService", () => {
  let mockEmployeeService: IEmployeeService;
  let mockDataBase: IDatabase;
  beforeEach(() => {
    mockDataBase = {
      employees: [
        {
          id: 0,
          name: "Michał",
          surname: "Wakulinski",
          githubAccount: "mwakulinski",
          employmentType: "B2B",
        },
      ],
      invoices: [],
    };
    mockEmployeeService = new EmployeeService(mockDataBase);
  });

  describe("createEmployee", () => {
    it("should return created employee with id", async () => {
      expect(
        await mockEmployeeService.createEmployee({
          name: "Maria",
          surname: "Antonina",
          githubAccount: "MAExp",
          employmentType: "B2B",
        })
      ).toEqual({
        name: "Maria",
        surname: "Antonina",
        githubAccount: "MAExp",
        employmentType: "B2B",
        id: expect.any(Number),
      });
    });
  });

  describe("getAllEmployees", () => {
    it("should return all employees", async () => {
      expect(await mockEmployeeService.getAllEmployees()).toEqual([
        {
          id: 0,
          name: "Michał",
          surname: "Wakulinski",
          githubAccount: "mwakulinski",
          employmentType: "B2B",
        },
      ]);
    });
  });

  describe("getEmployeeById", () => {
    it("should return employee when employee id passed", async () => {
      expect(await mockEmployeeService.getEmployeeById(0)).toEqual({
        id: 0,
        name: "Michał",
        surname: "Wakulinski",
        githubAccount: "mwakulinski",
        employmentType: "B2B",
      });
    });

    it("should return undefined when no employee with provided id", async () => {
      expect(await mockEmployeeService.getEmployeeById(1));
    });
  });
});
