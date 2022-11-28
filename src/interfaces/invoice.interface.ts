export type InvoiceType = {
  id?: number;
  owner: string;
  amountDue: number;
  dueDate: Date;
  issueDate: Date;
  subject: string;
};

export type InvoiceUploadType = {
  fileUrl: string;
  uploadTo: string;
  details: InvoiceType;
};

export type InvoiceKeys = keyof InvoiceType;
export type InvoiceValues = InvoiceType[keyof InvoiceType];
