import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function formatDate(date: string, format?: string): string {
  return dayjs(date).format(format);
}

export function numberToMoney(value: string): string {
  return `R$ ${value.match(/^-?\d+(?:\.\d{0,2})?/)}`;
}
