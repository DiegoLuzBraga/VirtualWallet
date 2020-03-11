import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function formatDate(date: string, format?: string): string {
  return dayjs(date).format(format);
}

export function toMoney(value: string): string {
  return `R$ ${value.match(/^-?\d+(?:\.\d{0,2})?/)}`.replace(".", ",");
}

export function numberToMoney(num: number, symbol: string = "R$") {
  return `${symbol} ${(num / 100).toLocaleString("pt-br", {
    minimumFractionDigits: 2
  })}`;
}
