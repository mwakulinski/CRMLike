import e from "express";
import mongoose, { Mongoose } from "mongoose";
import { employeeModelType } from "../db/mongoose/models/employee-model";
import { modelsTypes } from "../models";
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
  private readonly employees: EmployeeType[] = [];
  private employee: employeeModelType;

  constructor({ employee }: modelsTypes) {
    this.employee = employee;
  }

  async create(employeeCreate: EmployeeCreateType): Promise<EmployeeType> {
    const newEmployee = await this.employee.create(employeeCreate);
    const employeeResponse = newEmployee.toObject({
      transform: function (doc, ret, options) {
        (ret.id = ret._id.toString()), delete ret._id;
      },
      versionKey: false,
    }) as EmployeeType;

    return employeeResponse;
  }

  async getAll() {
    const allEmployees = await this.employee
      .find()
      .lean()
      .transform((docs) => {
        return docs.map((doc) => {
          return {
            id: doc._id.toString(),
            name: doc.name,
            surname: doc.surname,
            githubAccount: doc.githubAccount,
            employmentType: doc.employmentType,
          };
        });
      });
    console.log(allEmployees);
    console.log(typeof allEmployees);
    console.log(allEmployees[0] instanceof mongoose.Document);

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
