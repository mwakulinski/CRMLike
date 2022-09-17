import { number } from "joi";

export interface IDateHandlerService {
  getFullDate: (date: Date) => string;
}

class DateHandlerService {
  getFullDate(date: Date) {
    console.log(date);

    return date.toLocaleDateString();
  }
}

export default DateHandlerService;
