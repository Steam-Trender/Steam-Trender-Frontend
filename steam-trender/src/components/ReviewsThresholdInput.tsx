import React from "react";
import { Tooltip } from "./Tooltip";

interface ReviewsThresholdInputProps {
    value: string;
    onChange: (value: string) => void;
}

export function ReviewsThresholdInput({
    value,
    onChange,
}: ReviewsThresholdInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <Tooltip text="Minimum number of reviews a game should have to be sampled.">
            <input
                type="number"
                min="0"
                className="form-control"
                id="reviewsThreshold"
                value={value}
                onChange={handleChange}
                placeholder="Enter Reviews Threshold"
            />
        </Tooltip>
    );
}
