import React, { useState } from "react";
import ApiService from "../api/service";
import YearDropdown from "../components/YearsDropdown";
import TagSelector from "../components/TagSelector";
import { IYearOverview } from "../models/year_overview";
import { OverviewTable } from "../components/OverviewTable";
import { convertYearDataToGeneric } from "../models/generic_overview";
import { MoneyBoxPlot } from "../components/MoneyBoxPlot";
import { RegressionPlot } from "../components/RegressionPlot";
import { getSpecificRevenue } from "../models/overview";
import { ReviewsThresholdInput } from "../components/ReviewsThresholdInput";
import { ParametersInfo } from "../components/ParametersInfo";

const TrendsPage = () => {
    const [reviewsThreshold, setReviewsThreshold] = useState("");
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
    const [year, setYear] = useState<number>(2024);
    const [trendsOverview, setTrendsOverview] = useState<
        IYearOverview[] | null
    >(null);

    const handleAnalyzeClick = async () => {
        try {
            const data = await ApiService.fetchTrendsOverview(
                reviewsThreshold,
                year,
                selectedTagIds
            );
            setTrendsOverview(data);
        } catch (error) {
            console.error("Failed to fetch data", error);
        }
    };

    const handleYearChange = (year: number) => {
        setYear(year);
    };

    return (
        <>
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <div className="row">
                        <div className="col-sm-12 col-md-9 pb-2">
                            <TagSelector
                                onChange={setSelectedTagIds}
                                placeholder="Tags"
                                limit={10}
                            />
                        </div>
                        <div className="form-group col-sm-12 col-md-3 pb-2">
                            <ReviewsThresholdInput
                                value={reviewsThreshold}
                                onChange={setReviewsThreshold}
                                max={false}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-3 pb-2">
                    <YearDropdown
                        onChange={handleYearChange}
                        initialLabel="Pivot Year"
                        isDescending={true}
                    />
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
            {trendsOverview ? (
                <>
                    <h1>Overview</h1>
                    <div className="row pt-3">
                        <div className="col-sm-12 col-md-4">
                            <h2>Median Reviews</h2>
                            <RegressionPlot
                                categories={trendsOverview.map(
                                    (item) => item.year
                                )}
                                real={trendsOverview.map(
                                    (item) => item.overview.median_reviews
                                )}
                                trend={trendsOverview.map(
                                    (item) => item.regression.median_reviews
                                )}
                                yaxis_title={"Median Reviews"}
                                money={false}
                            />
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <h2>Median Owners</h2>
                            <RegressionPlot
                                categories={trendsOverview.map(
                                    (item) => item.year
                                )}
                                real={trendsOverview.map(
                                    (item) => item.overview.median_owners
                                )}
                                trend={trendsOverview.map(
                                    (item) => item.regression.median_owners
                                )}
                                yaxis_title={"Median Owners"}
                                money={false}
                            />
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <h2>Game Released</h2>
                            <RegressionPlot
                                categories={trendsOverview.map(
                                    (item) => item.year
                                )}
                                real={trendsOverview.map(
                                    (item) => item.overview.total_games
                                )}
                                trend={null}
                                yaxis_title={"Games"}
                                money={false}
                            />
                        </div>
                    </div>
                    <div className="row pt-3">
                        <div className="col-sm-12 col-md-4">
                            <h2>Median Revenue</h2>
                            <RegressionPlot
                                categories={trendsOverview.map(
                                    (item) => item.year
                                )}
                                real={trendsOverview.map((item) =>
                                    getSpecificRevenue(item.overview, 0.5)
                                )}
                                trend={trendsOverview.map(
                                    (item) => item.regression.median_revenue
                                )}
                                yaxis_title={"Median Revenue"}
                                money={true}
                            />
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <h2>Median Price</h2>
                            <RegressionPlot
                                categories={trendsOverview.map(
                                    (item) => item.year
                                )}
                                real={trendsOverview.map(
                                    (item) => item.overview.median_price
                                )}
                                trend={trendsOverview.map(
                                    (item) => item.regression.median_price
                                )}
                                yaxis_title={"Median Price"}
                                money={true}
                            />
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <h2>Revenue Box Chart</h2>
                            <MoneyBoxPlot
                                data={convertYearDataToGeneric(trendsOverview)}
                            />
                        </div>
                    </div>
                    <div className="row pt-3">
                        <h1>Table View</h1>
                        <OverviewTable
                            data={convertYearDataToGeneric(trendsOverview)}
                        />
                    </div>
                </>
            ) : (
                <div className="row flex-fill align-items-center">
                    <div>
                        <ParametersInfo />
                        <ul>
                            <li>Tags (all): ...</li>
                            <li>Min Reviews (10): ...</li>
                            <li>
                                Pivot Year (2024): trends <b>5 years back</b>{" "}
                                from that year will be calculated, e. g. if you
                                select 2023, years: 2019, 2020, 2021, 2022, 2023
                                will be taken into account and each year has an
                                own review multiplier.
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default TrendsPage;
