import EmployeeService, {
  IEmployeeService,
} from "../src/employee/employee.service";
import EmployeeRepository from "../src/employee/employee.repository";
import { expect } from "chai";
import { beforeEach } from "mocha";
import InvoiceRepository from "../src/invoices/invoices.repository";
import { rejects } from "assert";
import { IRepositories } from "../src/repositories";

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
        await mockEmployeeService.createEmployee({
          name: "Maria",
          surname: "Antonina",
          githubAccount: "MAExp",
          employmentType: "B2B",
        })
      ).to.deep.equal({
        id: 0,
        name: "Maria",
        surname: "Antonina",
        githubAccount: "MAExp",
        employmentType: "B2B",
      });
    });

    it("should throw error when employee with given githubAccount already exist", async () => {
      await mockEmployeeService.createEmployee({
        name: "Maria",
        surname: "Antonina",
        githubAccount: "MAExp",
        employmentType: "B2B",
      });

      await rejects(async () => {
        await mockEmployeeService.createEmployee({
          name: "Maria",
          surname: "Antonina",
          githubAccount: "MAExp",
          employmentType: "B2B",
        });
      });
    });
  });

  describe("getAllEmployees", () => {
    it("should return empty array when no employees are added", async () => {
      expect(await mockEmployeeService.getAllEmployees()).to.deep.equal([]);
    });

    it("should return all employees", async () => {
      //Given two employees in a database
      await mockRepositories.employeeRepository.createEmployee({
        name: "Maria",
        surname: "Antonina",
        githubAccount: "MAExp",
        employmentType: "B2B",
      });

      await mockRepositories.employeeRepository.createEmployee({
        name: "Michal",
        surname: "Wak",
        githubAccount: "MichWak",
        employmentType: "B2B",
      });
      //when

      //Then all two employees should be returned

      expect(await mockEmployeeService.getAllEmployees()).to.deep.equal([
        {
          id: 0,
          name: "Maria",
          surname: "Antonina",
          githubAccount: "MAExp",
          employmentType: "B2B",
        },
        {
          id: 1,
          name: "Michal",
          surname: "Wak",
          githubAccount: "MichWak",
          employmentType: "B2B",
        },
      ]);
    });
  });

  describe("getEmployeeById", () => {
    it("should return unique employee when employee id is passed", async () => {
      //Given employee in a database
      await mockRepositories.employeeRepository.createEmployee({
        name: "Maria",
        surname: "Antonina",
        githubAccount: "MAExp",
        employmentType: "B2B",
      });
      //When
      //Then
      expect(await mockEmployeeService.getEmployeeById(0)).to.deep.equal({
        id: 0,
        name: "Maria",
        surname: "Antonina",
        githubAccount: "MAExp",
        employmentType: "B2B",
      });
    });

    it("should return undefined when no employee with provided id", async () => {
      expect(await mockEmployeeService.getEmployeeById(1)).to.equal(undefined);
    });
  });
});
