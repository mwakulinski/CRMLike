export type InvoiceType = {
  id?: string;
  owner: string;
  amountDue: number;
  dueDate: Date;
  issueDate: Date;
  subject: string;
};

export type InvoiceToUploadType = {
  fileUrl: string;
  uploadTo: string;
  details: InvoiceType;
};

export type InvoiceUploadedType = {
  id: string;
  fileUrl: string;
  uploadTo: string;
  details: InvoiceType;
};

export type InvoiceKeys = keyof InvoiceType;
export type InvoiceValues = InvoiceType[keyof InvoiceType];
