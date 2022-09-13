export type IInvoice = {
  id?: number;
  owner: string;
  amountDue: number;
  dueDate: Date;
  issueDate: Date;
  subject: string;
};

export type IInvoiceToUpload = {
  fileUrl: string;
  uploadTo: string;
  details: IInvoice;
};
