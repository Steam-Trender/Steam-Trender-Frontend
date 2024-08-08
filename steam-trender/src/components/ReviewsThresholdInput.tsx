import React from "react";
import { Tooltip } from "./Tooltip";

interface ReviewsThresholdInputProps {
    value: string;
    onChange: (value: string) => void;
    max: boolean;
}

export function ReviewsThresholdInput({
    value,
    onChange,
    max,
}: ReviewsThresholdInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const prefix = max ? "Max" : "Min";
    const tooltipText = `${prefix} reviews number that game should have to be sampled.`;
    const placeholderText = `${prefix} Reviews`;

    return (
        <Tooltip text={tooltipText}>
            <input
                type="number"
                min="0"
                className="form-control"
                id="reviewsThreshold"
                value={value}
                onChange={handleChange}
                placeholder={placeholderText}
            />
        </Tooltip>
    );
}
