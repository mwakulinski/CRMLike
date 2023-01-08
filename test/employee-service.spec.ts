import EmployeeService, {
  IEmployeeService,
} from "../src/employee/employee.service";
import { IEmployeeRepository } from "../src/employee/employee.repository";
import { expect } from "chai";
import { beforeEach } from "mocha";
import { rejects } from "assert";
import {
  EmployeeCreateType,
  EmployeeType,
  EmployeeUniqueProperty,
} from "../src/employee/interfaces";

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
  let mockEmployeeRepository: IEmployeeRepository;
  class MockEmployeeRepository implements IEmployeeRepository {
    private db: EmployeeType[] = [];
    private id = "a";
    async create(employeeCreate: EmployeeCreateType) {
      const newEmployee = { id: this.id, ...employeeCreate };
      this.db.push(newEmployee);
      this.id += "a";
      return newEmployee;
    }
    async getAll() {
      return this.db;
    }
    async findUnique(
      uniqueProperty: EmployeeUniqueProperty,
      value: number | string
    ) {
      const employee = this.db.find(
        (employee) => employee[uniqueProperty] === value
      );
      if (!employee) {
        return undefined;
      }
      return employee;
    }
  }

  beforeEach(() => {
    mockEmployeeRepository = new MockEmployeeRepository();
    mockEmployeeService = new EmployeeService({
      employeeRepository: mockEmployeeRepository,
    });
  });

  describe("create Employee", () => {
    it("should return created employee with id", async () => {
      expect(await mockEmployeeService.create(mockUser_1)).to.deep.equal({
        id: "a",
        ...mockUser_1,
      });
    });

    it("should throw error when employee with given githubAccount already exist", async () => {
      await mockEmployeeService.create(mockUser_1);

      await rejects(async () => {
        await mockEmployeeService.create(mockUser_1);
      });
    });
  });

  describe("getAll", () => {
    it("should return all employees", async () => {
      //Given two employees in a database
      const mockEmployee1 = await mockEmployeeRepository.create(mockUser_1);
      const mockEmployee2 = await mockEmployeeRepository.create(mockUser_2);
      //when
      //Then all two employees should be returned

      expect(await mockEmployeeService.getAll()).to.deep.equal([
        {
          id: mockEmployee1.id,
          ...mockUser_1,
        },
        {
          id: mockEmployee2.id,
          ...mockUser_2,
        },
      ]);
    });
  });

  describe("getById", () => {
    it("should return unique employee when employee id is passed", async () => {
      //Given employee in a database
      await mockEmployeeRepository.create(mockUser_1);
      //When
      //Then
      expect(await mockEmployeeService.getById("a")).to.deep.equal({
        id: "a",
        ...mockUser_1,
      });
    });

    it("should return undefined when no employee with provided id", async () => {
      expect(await mockEmployeeService.getById("a")).to.equal(undefined);
    });
  });
});
