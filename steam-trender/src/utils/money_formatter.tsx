import React from "react";

interface NumberFormatterProps {
    value: number;
}

export function MoneyFormatter({ value }: NumberFormatterProps) {
    const formattedNumber = new Intl.NumberFormat("en-US", {
        style: "decimal",
        maximumFractionDigits: 0,
        useGrouping: true,
    }).format(value);

    return <span>{formattedNumber.replace(/,/g, " ")}</span>;
}
