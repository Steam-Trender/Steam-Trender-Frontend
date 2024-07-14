import React from "react";
import { Tooltip } from "./Tooltip";

interface ReviewsCoefficientInputProps {
    value: string;
    onChange: (value: string) => void;
}

export function ReviewsCoefficientInput({
    value,
    onChange,
}: ReviewsCoefficientInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <Tooltip text="The coeff by which the number of reviews a game has is multiplied. The default is 30.">
            <input
                type="number"
                min="1"
                className="form-control"
                id="reviewsThreshold"
                value={value}
                onChange={handleChange}
                placeholder="Enter Reviews Threshold"
            />
        </Tooltip>
    );
}
