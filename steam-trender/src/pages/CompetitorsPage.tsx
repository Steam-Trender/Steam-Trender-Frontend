import React, { useState } from "react";
import { ICompetitors } from "../models/competitors";
import ApiService from "../api/service";
import { TagSelector } from "../components/TagSelector";

const CompetitorsPage = () => {
    const [reviewsCoeff, setReviewsCoeff] = useState("");
    const [reviewsThreshold, setReviewsThreshold] = useState("");
    const [minYear, setMinYear] = useState<number | null>(null);
    const [maxYear, setMaxYear] = useState<number | null>(null);
    const [competitorOverview, setCompetitorOverview] =
        useState<ICompetitors | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
    const [bannedTagIds, setBannedTagIds] = useState<number[]>([]);

    const handleAnalyzeClick = async () => {
        if (minYear && maxYear) {
            setLoading(true);
            try {
                const data = await ApiService.fetchCompetitorOverview(
                    minYear,
                    maxYear,
                    selectedTagIds,
                    bannedTagIds
                );
                setCompetitorOverview(data);
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
            setLoading(false);
        } else {
            alert("Please select both a minimum and maximum year.");
        }
    };

    return (
        <>
            <div className="row">
                <div className="form-group col p-0 mx-1">
                    <input
                        type="number"
                        className="form-control"
                        id="reviewsCoeff"
                        value={reviewsCoeff}
                        onChange={(e) => setReviewsCoeff(e.target.value)}
                        placeholder="Enter Reviews Coefficient"
                    />
                </div>
                <div className="form-group col p-0 mx-1">
                    <input
                        type="number"
                        className="form-control"
                        id="reviewsThreshold"
                        value={reviewsThreshold}
                        onChange={(e) => setReviewsThreshold(e.target.value)}
                        placeholder="Enter Reviews Threshold"
                    />
                </div>
                <div className="dropdown col p-0 mx-1">
                    <button
                        className="btn btn-primary dropdown-toggle w-100"
                        type="button"
                        id="minYearDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {minYear || "Select Min Year"}
                    </button>
                    <div
                        className="dropdown-menu"
                        aria-labelledby="minYearDropdown"
                    >
                        {[2010, 2011, 2012, 2013, 2014, 2015].map((year) => (
                            <a
                                className="dropdown-item"
                                key={year}
                                href="#"
                                onClick={() => setMinYear(year)}
                            >
                                {year}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="dropdown col p-0 mx-1">
                    <button
                        className="btn btn-primary dropdown-toggle w-100"
                        type="button"
                        id="maxYearDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {maxYear || "Select Max Year"}
                    </button>
                    <div
                        className="dropdown-menu"
                        aria-labelledby="maxYearDropdown"
                    >
                        {[2016, 2017, 2018, 2019, 2020, 2021].map((year) => (
                            <a
                                className="dropdown-item"
                                key={year}
                                href="#"
                                onClick={() => setMaxYear(year)}
                            >
                                {year}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="col p-0 mx-1">
                    <TagSelector
                        onChange={setSelectedTagIds}
                        placeholder="Avaialbe Tags"
                    />
                </div>
                <div className="col p-0 mx-1">
                    <TagSelector
                        onChange={setBannedTagIds}
                        placeholder="Banned Tags"
                    />
                </div>
            </div>
            <div className="d-flex">
                <button
                    className="btn btn-primary"
                    onClick={handleAnalyzeClick}
                >
                    Analyze
                </button>
            </div>
        </>
    );
};

export default CompetitorsPage;
