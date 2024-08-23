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
    const [minReviewsThreshold, setMinReviewsThreshold] = useState("");
    const [maxReviewsThreshold, setMaxReviewsThreshold] = useState("");
    const [minYear, setMinYear] = useState<number | null>(null);
    const [maxYear, setMaxYear] = useState<number | null>(null);
    const [tagsOverview, setTagsOverview] = useState<ITagOverview[] | null>(
        null
    );
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
    const tagsLimit = 10;

    const handleAnalyzeClick = async () => {
        if (minYear && maxYear) {
            try {
                const data = await ApiService.fetchTagsOverview(
                    reviewsCoeff,
                    minReviewsThreshold,
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
            <div className="row pb-2">
                <div className="col-12">
                    <label>
                        Tags ({selectedTagIds.length}/{tagsLimit})
                    </label>
                    <TagSelector
                        onChange={setSelectedTagIds}
                        placeholder="Tags"
                        limit={tagsLimit}
                    />
                </div>
            </div>
            <div className="row">
                <div className="form-group col-sm-6 col-md-3 pb-2">
                    <label>Reviews Coefficient</label>
                    <ReviewsCoefficientInput
                        value={reviewsCoeff}
                        onChange={setReviewsCoeff}
                    />
                </div>
                <div className="col-sm-6 col-md-3 pb-2">
                    <div className="row">
                        <div className="form-group col-6 pe-1">
                            <label>Min Reviews</label>
                            <ReviewsThresholdInput
                                value={minReviewsThreshold}
                                onChange={setMinReviewsThreshold}
                                max={false}
                            />
                        </div>
                        <div className="form-group col-6 ps-1">
                            <label>Max Reviews</label>
                            <ReviewsThresholdInput
                                value={maxReviewsThreshold}
                                onChange={setMaxReviewsThreshold}
                                max={true}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-3 pb-2">
                    <div className="row">
                        <div className="col-6 pe-1">
                            <label>Min Year</label>
                            <YearDropdown
                                onChange={handleMinYearChange}
                                initialLabel="Min Year"
                                isDescending={false}
                                defaultYear={2020}
                            />
                        </div>
                        <div className="col-6 ps-1">
                            <label>Max Year</label>
                            <YearDropdown
                                onChange={handleMaxYearChange}
                                initialLabel="Max Year"
                                isDescending={true}
                                defaultYear={2024}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-3 pb-2">
                    <label>Click Here!</label>
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
                        <div className="col-sm-12 col-md-6">
                            <h2>Revenue Box Plot</h2>
                            <MoneyBoxPlot
                                data={convertTagDataToGeneric(tagsOverview)}
                            />
                        </div>
                        <div className="col-sm-12 col-md-6">
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
                                Tags (none)
                                <span className="text-primary fw-bold">*</span>:
                                Select multiple tags to compare trends across
                                different categories. Each tag will be analyzed
                                individually.
                            </li>
                            <li>
                                Reviews Coefficient (30): A multiplier applied
                                to the number of reviews to estimate a
                                game&apos;s revenue.
                            </li>
                            <li>
                                Min Reviews (10): The minimum number of reviews
                                required for a game to be considered.
                            </li>
                            <li>
                                Max Reviews (inf): The maximum number of reviews
                                allowed for a game to be considered.
                            </li>
                            <li>
                                Min Year (2020): The earliest release year a
                                game can have to be included.
                            </li>
                            <li>
                                Max Year (2024): The latest release year a game
                                can have to be included.
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default TagsPage;
