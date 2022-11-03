import EmployeeService, {
  IEmployeeService,
} from "../src/employee/employee.service";
import EmployeeRepository from "../src/employee/employee.repository";
import { expect } from "chai";
import { beforeEach } from "mocha";
import InvoiceRepository from "../src/invoices/invoices.repository";
import { rejects } from "assert";
import { IRepositories } from "../src/repositories";
import { EmployeeCreateType } from "../src/employee/interfaces";

const mockUser_1: EmployeeCreateType = {
  name: "Maria",
  surname: "Antonina",
  githubAccount: "MAExp",
  employmentType: "B2B",
};
const mockUser_2: EmployeeCreateType = {
  name: "Michal",
  surname: "Wak",
  githubAccount: "MichWak",
  employmentType: "B2B",
};
describe("EmployeeService", () => {
  let mockEmployeeService: IEmployeeService;
  let mockRepositories: IRepositories;

  beforeEach(() => {
    mockRepositories = {
      invoicesRepository: new InvoiceRepository(),
      employeeRepository: new EmployeeRepository(),
    };
    mockEmployeeService = new EmployeeService(mockRepositories);
  });

  describe("createEmployee", () => {
    it("should return created employee with id", async () => {
      expect(
        await mockEmployeeService.createEmployee(mockUser_1)
      ).to.deep.equal({
        id: 0,
        ...mockUser_1,
      });
    });

    it("should throw error when employee with given githubAccount already exist", async () => {
      await mockEmployeeService.createEmployee(mockUser_1);

      await rejects(async () => {
        await mockEmployeeService.createEmployee(mockUser_1);
      });
    });
  });

  describe("getAllEmployees", () => {
    it("should return all employees", async () => {
      //Given two employees in a database
      await mockRepositories.employeeRepository.createEmployee(mockUser_1);
      await mockRepositories.employeeRepository.createEmployee(mockUser_2);
      //when
      //Then all two employees should be returned

      expect(await mockEmployeeService.getAllEmployees()).to.deep.equal([
        {
          id: 0,
          ...mockUser_1,
        },
        {
          id: 1,
          ...mockUser_2,
        },
      ]);
    });
  });

  describe("getEmployeeById", () => {
    it("should return unique employee when employee id is passed", async () => {
      //Given employee in a database
      await mockRepositories.employeeRepository.createEmployee(mockUser_1);
      //When
      //Then
      expect(await mockEmployeeService.getEmployeeById(0)).to.deep.equal({
        id: 0,
        ...mockUser_1,
      });
    });

    it("should return undefined when no employee with provided id", async () => {
      expect(await mockEmployeeService.getEmployeeById(1)).to.equal(undefined);
    });
  });
});
