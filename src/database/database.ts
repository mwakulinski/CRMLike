import { IEmployee, IEmployeeCreate } from "../employee/interfaces";
import { IInvoice } from "../interfaces/invoice.interface";

export interface IDatabase {
  employees: IEmployee[];
  invoices: IInvoice[];
}

const database: IDatabase = {
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

export default database;
