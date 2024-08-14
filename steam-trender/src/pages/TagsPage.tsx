import React, { useState } from "react";
import { ITagOverview } from "../models/tag_overview";
import ApiService from "../api/service";
import TagSelector from "../components/TagSelector";
import YearDropdown from "../components/YearsDropdown";
import { MoneyBoxPlot } from "../components/MoneyBoxPlot";
import { OverviewTable } from "../components/OverviewTable";
import { convertTagDataToGeneric } from "../models/generic_overview";
import CombinedChart from "../components/CombinedPlot";
import { ReviewsCoefficientInput } from "../components/ReviewsCoefficientInput";
import { ReviewsThresholdInput } from "../components/ReviewsThresholdInput";
import { ParametersInfo } from "../components/ParametersInfo";

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
                <div className="col-12">
                    <TagSelector
                        onChange={setSelectedTagIds}
                        placeholder="Tags"
                        limit={10}
                    />
                </div>
            </div>
            <div className="row pt-2">
                <div className="form-group col-3">
                    <ReviewsCoefficientInput
                        value={reviewsCoeff}
                        onChange={setReviewsCoeff}
                    />
                </div>
                <div className="form-group col-3">
                    <ReviewsThresholdInput
                        value={reviewsThreshold}
                        onChange={setReviewsThreshold}
                        max={false}
                    />
                </div>
                <div className="col-3">
                    <div className="row">
                        <div className="col-6">
                            <YearDropdown
                                onChange={handleMinYearChange}
                                initialLabel="Min Year"
                                isDescending={false}
                            />
                        </div>
                        <div className="col-6">
                            <YearDropdown
                                onChange={handleMaxYearChange}
                                initialLabel="Max Year"
                                isDescending={true}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <button
                        className="btn btn-primary text-uppercase w-100"
                        onClick={handleAnalyzeClick}
                    >
                        Analyze
                    </button>
                </div>
            </div>
            {tagsOverview ? (
                <>
                    <div className="row pt-3">
                        <h1>Overview</h1>
                        <div className="col-6">
                            <h2>Revenue Box Plot</h2>
                            <MoneyBoxPlot
                                data={convertTagDataToGeneric(tagsOverview)}
                            />
                        </div>
                        <div className="col-6">
                            <h2>Games & Median Revenue</h2>
                            <CombinedChart data={tagsOverview} />
                        </div>
                    </div>
                    <div className="row pt-3">
                        <h1>Table View</h1>
                        <OverviewTable
                            data={convertTagDataToGeneric(tagsOverview)}
                        />
                    </div>
                </>
            ) : (
                <div className="row flex-fill align-items-center">
                    <div>
                        <ParametersInfo />
                        <ul>
                            <li>
                                <b>Tags (none): ...</b>
                            </li>
                            <li>Reviews Coeff (30): ...</li>
                            <li>Min Reviews (10): ...</li>
                            <li>Min Year (2020): ...</li>
                            <li>Max Year (2024): ...</li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default TagsPage;
