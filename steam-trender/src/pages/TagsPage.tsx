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
            <div className="row pb-2">
                <div className="col-12">
                    <TagSelector
                        onChange={setSelectedTagIds}
                        placeholder="Tags"
                        limit={10}
                    />
                </div>
            </div>
            <div className="row">
                <div className="form-group col-sm-6 col-md-3 pb-2">
                    <ReviewsCoefficientInput
                        value={reviewsCoeff}
                        onChange={setReviewsCoeff}
                    />
                </div>
                <div className="col-sm-6 col-md-3 pb-2">
                    <div className="row">
                        <div className="form-group col-6 pe-1">
                            <ReviewsThresholdInput
                                value={reviewsThreshold}
                                onChange={setReviewsThreshold}
                                max={false}
                            />
                        </div>
                        <div className="form-group col-6 ps-1">
                            <ReviewsThresholdInput
                                value={reviewsThreshold}
                                onChange={setReviewsThreshold}
                                max={true}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-3 pb-2">
                    <div className="row">
                        <div className="col-6 pe-1">
                            <YearDropdown
                                onChange={handleMinYearChange}
                                initialLabel="Min Year"
                                isDescending={false}
                                defaultYear={2020}
                            />
                        </div>
                        <div className="col-6 ps-1">
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
                                <b>Tags (none): ...</b>
                            </li>
                            <li>Reviews Coeff (30): ...</li>
                            <li>Min Reviews (10): ...</li>
                            <li>Max Reviews (inf): ...</li>
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
