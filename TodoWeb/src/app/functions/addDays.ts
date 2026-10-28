import { reverseDate } from "./reverseDate";

export const addDays = (date: Date | string, days: number) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  };