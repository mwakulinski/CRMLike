import { IDatabase } from "../database/database";
import InvoiceService, { IInvoicesService } from "./invoices.service";
describe("InvoiceService", () => {
  let mockInvoiceService: IInvoicesService;
  let mockDataBase: IDatabase;
  beforeEach(() => {
    mockDataBase = {
      employees: [],
      invoices: [],
    };
    mockInvoiceService = new InvoiceService(mockDataBase);
  });

  describe("saveNewInvoiceInformation", () => {
    it("should return id of created invoice entry", async () => {
      expect(
        await mockInvoiceService.saveNewInvoiceInformation({
          fileUrl: "C:/Users/michal/Desktop/invoices/invoice_1.pdf",
          uploadTo:
            "https://drive.google.com/drive/u/0/folders/1UiU4lsu5-9dr7hAqwUmk4CEL9sjTyAgU",
          details: {
            owner: "Michal Wakulinski",
            amountDue: 3000,
            dueDate: new Date("2022-09-01"),
            issueDate: new Date("2022-10-01"),
            subject: "Wynagrodzenie na podstawie umowy z dnia 10.01.2020",
          },
        })
      ).toEqual({ invoiceId: 0 });
    });
  });
});
