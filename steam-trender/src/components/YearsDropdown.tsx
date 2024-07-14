import React, { useState, useEffect } from "react";
import YearStore from "../stores/YearStore";
import { observer } from "mobx-react";

interface YearDropdownProps {
    onChange: (year: number) => void;
    initialLabel: string;
    isDescending: boolean;
}

const YearDropdown = observer(
    ({ initialLabel, onChange, isDescending }: YearDropdownProps) => {
        const [selectedYear, setSelectedYear] = useState<number>();

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
                    {displayedYears.map((year) => (
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
);

export default YearDropdown;
