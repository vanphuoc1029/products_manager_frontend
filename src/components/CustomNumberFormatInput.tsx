import { NumericFormat } from "react-number-format";

import { InputHTMLAttributes } from "react";

interface CustomCurrencyInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  field: any;
}

const CustomCurrencyInput = ({ field, ...props }: CustomCurrencyInputProps) => {
  return (
    <NumericFormat
      {...field}
      {...props}
      thousandSeparator=","
      decimalSeparator="."
      prefix="₫"
      allowNegative={false}
      isNumericString
      customInput={(inputProps) => <input {...inputProps} />}
    />
  );
};

export default CustomCurrencyInput;
