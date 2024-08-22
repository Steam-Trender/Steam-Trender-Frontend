import React, { useState, useEffect } from "react";
import YearStore from "../stores/YearStore";
import { observer } from "mobx-react";

interface YearDropdownProps {
    onChange: (year: number) => void;
    initialLabel: string;
    isDescending: boolean;
    defaultYear: number;
}

const YearDropdown = observer(
    ({
        initialLabel,
        onChange,
        isDescending,
        defaultYear,
    }: YearDropdownProps) => {
        const [selectedYear, setSelectedYear] = useState(defaultYear || null);

        useEffect(() => {
            YearStore.fetchYears();
        }, []);

        const handleYearSelect = (year: number) => {
            setSelectedYear(year);
            onChange(year);
        };

        const displayedYears = !isDescending
            ? [...YearStore.years].reverse()
            : YearStore.years;

        return (
            <div className="dropdown-center">
                <button
                    className="btn btn-outline-secondary dropdown-toggle w-100 d-flex justify-content-between align-items-center"
                    type="button"
                    id="yearDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <span className="text-start">
                        {selectedYear || initialLabel}
                    </span>
                    <span className="dropdown-toggle-icon"></span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="yearDropdown">
                    {displayedYears.map((year) => (
                        <li key={year}>
                            <button
                                className="dropdown-item"
                                type="button"
                                onClick={() => handleYearSelect(year)}
                            >
                                {year}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
);

export default YearDropdown;
