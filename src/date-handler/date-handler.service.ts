export interface IDateHandlerService {
  getFullDate: (date: Date) => string;
}

class DateHandlerService {
  getFullDate(date: Date) {
    return date.toLocaleDateString();
  }
}

export default DateHandlerService;
