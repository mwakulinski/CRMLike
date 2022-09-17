import FilesUploaderService, {
  IFilesUploaderService,
} from "./uploader.service";

describe("FilesUploaderService", () => {
  let filesUploaderService: IFilesUploaderService;
  beforeEach(() => {
    filesUploaderService = new FilesUploaderService();
  });

  describe("uploadFile", () => {
    it("should return message when successfully uploaded file", async () => {
      const filePath = "C:/Users/michal/Desktop/invoices/invoice_1.pdf";
      const uploadTo =
        "https://drive.google.com/drive/u/0/folders/1UiU4lsu5-9dr7hAqwUmk4CEL9sjTyAgU";
      expect(
        await filesUploaderService.uploadFile({
          filePath,
          uploadTo,
        })
      ).toBe(`invoice_1.pdf has been successfully uploaded to ${uploadTo}`);
    });
  });
});
