import InvoiceRepository, {
  IInvoicesRepository,
} from "./invoices/invoices.repository";
import EmployeeRepository, {
  IEmployeeRepository,
} from "./employee/employee.repository";
import { models } from "./models";

export interface IRepositories {
  invoicesRepository: IInvoicesRepository;
  employeeRepository: IEmployeeRepository;
}

export const repositories: IRepositories = {
  invoicesRepository: new InvoiceRepository(),
  employeeRepository: new EmployeeRepository(models),
};
