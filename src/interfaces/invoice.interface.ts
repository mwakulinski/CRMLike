export interface IInvoice {
  owner: string;
  customer: string;
  amountDue: number;
  dueDate: Date;
  issueDate: Date;
  subject: string;
}
