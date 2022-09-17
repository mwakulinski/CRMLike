import DateHandlerService, {
  IDateHandlerService,
} from "./date-handler.service";
describe("DateHandlerService", () => {
  let mockDateHandlerService: IDateHandlerService;
  beforeAll(() => {
    mockDateHandlerService = new DateHandlerService();
  });

  describe("getFullDate", () => {
    it("should return date string in format day.month.year when date passed", () => {
      const today = new Date();
      expect(mockDateHandlerService.getFullDate(today)).toBe(
        today.toLocaleDateString()
      );
    });
  });
});
