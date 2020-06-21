import dayjs from "dayjs";

export function formatDate(date, format) {
  return dayjs(date).format(format);
}

export function toMoney(value) {
  return `R$ ${value.match(/^-?\d+(?:\.\d{0,4})?/)}`.replace(".", ",");
}

export function justNumbers(num) {
  return num.replace(/[^0-9]/g, "");
}

export function currencyMask(
  value,
  precision = 4,
  decimalSeparator = ",",
  thousandSeparator = ".",
  prefix = "",
  suffix = ""
) {
  if (precision < 0) {
    precision = 0;
  }
  if (precision > 20) {
    precision = 20;
  }

  if (value === null || value === undefined) {
    return {
      value: 0,
      maskedValue: "",
    };
  }

  value = String(value);

  if (value.length === 0) {
    return {
      value: 0,
      maskedValue: "",
    };
  }

  let digits = value.match(/\d/g) || ["0"];

  while (digits.length <= precision) {
    digits.unshift("0");
  }

  if (precision > 0) {
    digits.splice(digits.length - precision, 0, ".");
  }

  digits = Number(digits.join("")).toFixed(precision).split("");

  let decimalpos = digits.length - precision - 1;
  if (precision > 0) {
    digits[decimalpos] = decimalSeparator;
  } else {
    decimalpos = digits.length;
  }

  for (let x = decimalpos - 3; x > 0; x = x - 3) {
    digits.splice(x, 0, thousandSeparator);
  }

  if (prefix.length > 0) {
    digits.unshift(prefix);
  }
  if (suffix.length > 0) {
    digits.push(suffix);
  }

  return digits.join("").trim();
}
