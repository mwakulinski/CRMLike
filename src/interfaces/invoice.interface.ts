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

export type InvoiceKey = keyof IInvoice;
export type InvoiceValue = IInvoice[keyof IInvoice];
