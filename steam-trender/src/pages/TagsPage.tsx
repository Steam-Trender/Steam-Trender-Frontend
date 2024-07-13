import React, { useState } from "react";
import { ITagOverview } from "../models/tag_overview";
import ApiService from "../api/service";
import { TagSelector } from "../components/TagSelector";
import { YearDropdown } from "../components/YearsDropdown";
import { MoneyBoxPlot } from "../components/MoneyBoxPlot";
import { OverviewTable } from "../components/OverviewTable";
import { convertTagDataToGeneric } from "../models/generic_overview";
import CombinedChart from "../components/CombinedPlot";

const TagsPage = () => {
    const [reviewsCoeff, setReviewsCoeff] = useState("");
    const [reviewsThreshold, setReviewsThreshold] = useState("");
    const [minYear, setMinYear] = useState<number | null>(null);
    const [maxYear, setMaxYear] = useState<number | null>(null);
    const [tagsOverview, setTagsOverview] = useState<ITagOverview[] | null>(
        null
    );
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

    const handleAnalyzeClick = async () => {
        if (minYear && maxYear) {
            try {
                const data = await ApiService.fetchTagsOverview(
                    reviewsCoeff,
                    reviewsThreshold,
                    minYear,
                    maxYear,
                    selectedTagIds
                );
                setTagsOverview(data);
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        } else {
            alert("Please select both a minimum and maximum year.");
        }
    };

    const handleMinYearChange = (year: number) => {
        setMinYear(year);
    };

    const handleMaxYearChange = (year: number) => {
        setMaxYear(year);
    };

    return (
        <>
            <div className="row">
                <div className="form-group col-3">
                    <input
                        type="number"
                        className="form-control"
                        id="reviewsCoeff"
                        value={reviewsCoeff}
                        onChange={(e) => setReviewsCoeff(e.target.value)}
                        placeholder="Enter Reviews Coefficient"
                    />
                </div>
                <div className="form-group col-3">
                    <input
                        type="number"
                        className="form-control"
                        id="reviewsThreshold"
                        value={reviewsThreshold}
                        onChange={(e) => setReviewsThreshold(e.target.value)}
                        placeholder="Enter Reviews Threshold"
                    />
                </div>

                <div className="col-3">
                    <YearDropdown
                        onChange={handleMinYearChange}
                        initialLabel="Select Min Year"
                        descending={false}
                    />
                </div>
                <div className="col-3">
                    <YearDropdown
                        onChange={handleMaxYearChange}
                        initialLabel="Select Max Year"
                        descending={true}
                    />
                </div>
            </div>
            <div className="row pt-2">
                <div className="col-6">
                    <TagSelector
                        onChange={setSelectedTagIds}
                        placeholder="Tags"
                        limit={10}
                    />
                </div>
                <div className="col-3">
                    <button
                        className="btn btn-primary text-uppercase w-100"
                        onClick={handleAnalyzeClick}
                    >
                        Analyze
                    </button>
                </div>
                <div className="col-3">
                    <button
                        className="btn btn-primary text-uppercase w-100"
                        onClick={handleAnalyzeClick}
                    >
                        Download
                    </button>
                </div>
            </div>
            {tagsOverview && (
                <>
                    <div className="row pt-3">
                        <h1>Overview</h1>
                        <div className="col-6">
                            <h2>Revenue Box Plot</h2>
                            <MoneyBoxPlot data={tagsOverview} />
                        </div>
                        <div className="col-6">
                            <h2>Games & Median Revenue</h2>
                            <CombinedChart data={tagsOverview} />
                        </div>
                    </div>
                    <div className="row pt-3">
                        <h1>Raw Data</h1>
                        <OverviewTable
                            data={convertTagDataToGeneric(tagsOverview)}
                        />
                    </div>
                </>
            )}
        </>
    );
};

export default TagsPage;
