import React, { useState, useEffect } from "react";
import ApiService from "../api/service";

interface YearDropdownProps {
    onChange: (year: number) => void;
    initialLabel: string;
}

export function YearDropdown({ initialLabel, onChange }: YearDropdownProps) {
    const [years, setYears] = useState<number[]>([]);
    const [selectedYear, setSelectedYear] = useState<number>();

    useEffect(() => {
        const fetchYears = async () => {
            try {
                const response = await ApiService.fetchYears();
                const years = Array.from(
                    { length: response.max_year - response.min_year + 1 },
                    (v, k) => response.max_year - k
                );
                setYears(years);
            } catch (error) {
                console.error("Failed to fetch years:", error);
            }
        };

        fetchYears();
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
                {years.map((year) => (
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
