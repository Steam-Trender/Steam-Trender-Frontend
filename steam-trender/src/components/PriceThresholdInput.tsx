import React from "react";
import { Tooltip } from "./Tooltip";

interface PriceThresholdInputProps {
    value: string;
    onChange: (value: string) => void;
    max: boolean;
}

export function PriceThresholdInput({
    value,
    onChange,
    max,
}: PriceThresholdInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const prefix = max ? "Max" : "Min";
    const tooltipText = `${prefix} price that game should have to be sampled.`;
    const placeholderText = max ? "∞" : "0.00";

    return (
        <>
            <Tooltip text={tooltipText}>
                <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                        type="number"
                        min="0"
                        className="form-control"
                        id="priceThreshold"
                        value={value}
                        onChange={handleChange}
                        placeholder={placeholderText}
                    />
                </div>
            </Tooltip>
        </>
    );
}
