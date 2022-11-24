import mongoose from "mongoose";
import { employeeModelType } from "../db/mongoose/models/employee-model";
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

// export type mongooseDocumentResponse<T> = Document<unknown, any, T> &
//   T & { _id: mongoose.Types.ObjectId };

// export interface IMongoDbAdapterMapper<T, K> {
//   // mapDomainToDAO: (domainObject: T) => Promise<Model<T>>;
//   mapDAOToDomain: (
//     DAO: Document<unknown, any, T> & T & { _id: mongoose.Types.ObjectId }
//   ) => Promise<K>;
// }

// class MongoDbAdapterMapper<T, K> implements IMongoDbAdapterMapper<T, K> {
//   // async mapDomainToDAO(domainObject: T):Promise<mongoose.Model<T, {}, {}, {}, any>>{}
//   async mapDAOToDomain(
//     DAO: Document<unknown, any, T> & T & { _id: mongoose.Types.ObjectId }
//   ): Promise<K> {
//     const plainObject = DAO.toObject({ versionKey: false });
//     console.log(plainObject);
//     return plainObject as K;
//   }
// }

class EmployeeRepository implements IEmployeeRepository {
  private readonly employees: EmployeeType[] = [];
  private employee: employeeModelType;

  constructor({ employee }: { employee: employeeModelType }) {
    this.employee = employee;
  }

  async create(employeeCreate: EmployeeCreateType): Promise<EmployeeType> {
    const newEmployee = await this.employee.create(employeeCreate);
    return this.mapToDomain(newEmployee);
  }

  async getAll() {
    const allEmployees = await this.employee.find();
    return allEmployees.map((employee) => this.mapToDomain(employee));
  }

  async findUnique(
    uniqueProperty: EmployeeUniqueProperty,
    value: number | string
  ) {
    const employee = await this.employee.findOne({ [uniqueProperty]: value });
    if (!employee) {
      return undefined;
    }
    return this.mapToDomain(employee);
  }

  private mapToDomain(
    DAO: mongoose.Document<unknown, any, EmployeeCreateType> &
      EmployeeCreateType & {
        _id: mongoose.Types.ObjectId;
      }
  ): EmployeeType {
    const plainObject = DAO.toObject({ versionKey: false });
    const { _id, ...domainObject } = plainObject;
    return { ...domainObject, id: _id.toString() };
  }
}

export default EmployeeRepository;
