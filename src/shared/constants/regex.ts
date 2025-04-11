export const REGEX = {
  Contact_Number: /^(9|639|09)\d{9}$/,
  Digits_Only: /^0*?[1-9]\d*$/,
  Email: /\S+@\S+\.\S+/,
  Decimal_Only: /^\d+\.\d+$/,
} as const;
