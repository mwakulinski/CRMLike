import DateHandlerService from "../date-handler/date-handler.service";
import { IInvoice } from "../interfaces/invoice.interface";
import SenderService, { ISenderService } from "./sender.service";
describe("SenderService", () => {
  let senderService: ISenderService;
  beforeEach(() => {
    senderService = new SenderService({
      dateHandlerService: new DateHandlerService(),
    });
  });

  describe("Name of the group", () => {
    it("should return message about send invoice", async () => {
      const mockInvoice: IInvoice = {
        id: 0,
        owner: "mwakulinski",
        subject: "Wynagrodzenie za lipiec",
        amountDue: 5000,
        dueDate: new Date("2022-09-01"),
        issueDate: new Date("2022-08-01"),
      };
      expect(await senderService.informAboutNewInvoice(mockInvoice)).toBe(
        `New invoice from: ${
          mockInvoice.owner
        } has been issued.\nAmount to pay: ${
          mockInvoice.amountDue
        }, due date: ${mockInvoice.dueDate.toLocaleDateString()}`
      );
    });
  });
});
