import React from "react";
import { Tooltip } from "./Tooltip";

interface TagsThresholdInputProps {
    value: string;
    onChange: (value: string) => void;
}

export function TagsThresholdInput({
    value,
    onChange,
}: TagsThresholdInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <Tooltip text="N first tags to look up for." placement="bottom">
            <input
                type="range"
                min="1"
                max="20"
                className="form-range mt-2"
                id="tagsThreshold"
                value={value}
                onChange={handleChange}
                placeholder="10"
            />
        </Tooltip>
    );
}
