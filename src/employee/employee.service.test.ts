import { IDatabase } from "../database/database";
import EmployeeService, { IEmployeeService } from "./employee.service";
describe("EmployeeService", () => {
  let mockEmployeeService: IEmployeeService;
  const mockDataBase: IDatabase = {
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
  beforeEach(() => {
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
});
