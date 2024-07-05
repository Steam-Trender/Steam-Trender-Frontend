import React, { useState, useEffect } from "react";
import ApiService from "../api/service";

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
    const [years, setYears] = useState<number[]>([]);
    const [selectedYear, setSelectedYear] = useState<number>();

    useEffect(() => {
        const fetchYears = async (descending: boolean) => {
            try {
                const response = await ApiService.fetchYears();
                let years = [2020, 2021, 2022, 2023];
                if (descending) {
                    years = Array.from(
                        { length: response.max_year - response.min_year + 1 },
                        (v, k) => response.max_year - k
                    );
                } else {
                    years = Array.from(
                        { length: response.max_year - response.min_year + 1 },
                        (v, k) => response.min_year + k
                    );
                }
                setYears(years);
            } catch (error) {
                console.error("Failed to fetch years:", error);
            }
        };

        fetchYears(descending);
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
