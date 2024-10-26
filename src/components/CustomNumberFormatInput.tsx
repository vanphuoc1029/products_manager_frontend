import { NumericFormat } from "react-number-format";

const CustomCurrencyInput = ({ field, ...props }) => {
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
