import { formatAmount } from "@/lib/utils";
import React from "react";

interface PriceProps {
  amount: string;
  className?: string;
  currencyCode?: string;
  currencyCodeClassName?: string;
}

const Price: React.FC<PriceProps> = ({
  amount,
  className = "",
  currencyCode = "VND",
  currencyCodeClassName = "",
}) => {
  const formattedAmount = formatAmount(amount, currencyCode)

  const combinedClassName = `${className} ${
    currencyCodeClassName ? "ml-1 inline" : ""
  }`.trim();

  return (
    <p className={className}>
      {formattedAmount}
      <span className={combinedClassName}>{currencyCode}</span>
    </p>
  );
};

export default Price;
