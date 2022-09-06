export interface IInvoice {
  id?: number;
  owner: string;
  customer: string;
  amountDue: number;
  dueDate: Date;
  issueDate: Date;
  subject: string;
}

export interface IUploadedInvoice {
  fileUrl: string;
  details: IInvoice;
}
