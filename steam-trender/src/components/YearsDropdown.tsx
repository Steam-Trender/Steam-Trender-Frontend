import React, { useState, useEffect } from "react";
import YearStore from "../stores/YearStore";

interface YearDropdownProps {
    onChange: (year: number) => void;
    initialLabel: string;
    descending: boolean;
}

export function YearDropdown({
    initialLabel,
    onChange,
    descending,
}: YearDropdownProps) {
    const [selectedYear, setSelectedYear] = useState<number>();

    useEffect(() => {
        YearStore.fetchYears();
    }, []);

    const handleYearSelect = (year: number) => {
        setSelectedYear(year);
        onChange(year);
    };

    return (
        <div className="dropdown">
            <button
                className="btn btn-primary dropdown-toggle w-100"
                type="button"
                id="yearDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {selectedYear || initialLabel}
            </button>
            <div className="dropdown-menu" aria-labelledby="yearDropdown">
                {YearStore.getYears(descending).map((year) => (
                    <button
                        className="dropdown-item"
                        key={year}
                        type="button"
                        onClick={() => handleYearSelect(year)}
                    >
                        {year}
                    </button>
                ))}
            </div>
        </div>
    );
}
