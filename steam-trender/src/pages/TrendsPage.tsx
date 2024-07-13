import React, { useState } from "react";
import ApiService from "../api/service";
import { YearDropdown } from "../components/YearsDropdown";
import TagSelector from "../components/TagSelector";
import { IYearOverview } from "../models/year_overview";
import { OverviewTable } from "../components/OverviewTable";
import { convertYearDataToGeneric } from "../models/generic_overview";
import { MoneyBoxPlot } from "../components/MoneyBoxPlot";
import { RegressionPlot } from "../components/RegressionPlot";
import { getSpecificRevenue } from "../models/overview";

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
                <div className="form-group col-3">
                    <input
                        type="number"
                        min="0"
                        className="form-control"
                        id="reviewsThreshold"
                        value={reviewsThreshold}
                        onChange={(e) => setReviewsThreshold(e.target.value)}
                        placeholder="Enter Reviews Threshold"
                    />
                </div>
                <div className="col-3">
                    <YearDropdown
                        onChange={handleYearChange}
                        initialLabel="Select Year"
                        descending={true}
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
            <div className="row pt-2">
                <div className="col-6">
                    <TagSelector
                        onChange={setSelectedTagIds}
                        placeholder="Tags"
                        limit={10}
                    />
                </div>
            </div>
            <div className="row pt-2">
                <p className="my-0">
                    <i>
                        Note: When you select a year, trends <b>5 years back</b>{" "}
                        from that year will be calculated. For example, if you
                        select 2023, years: 2019, 2020, 2021, 2022, 2023 will be
                        taken into account. Each year has a different review
                        multiplier.
                    </i>
                </p>
            </div>
            {trendsOverview && (
                <>
                    <h1>Overview</h1>
                    <div className="row pt-3">
                        <div className="col-4">
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
                            />
                        </div>
                        <div className="col-4">
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
                            />
                        </div>
                        <div className="col-4">
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
                            />
                        </div>
                    </div>
                    <div className="row pt-3">
                        <div className="col-4">
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
                            />
                        </div>
                        <div className="col-4">
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
                            />
                        </div>
                        <div className="col-4">
                            <h2>Revenue Box Chart</h2>
                            <MoneyBoxPlot
                                data={convertYearDataToGeneric(trendsOverview)}
                            />
                        </div>
                    </div>
                    <div className="row pt-3">
                        <h1>Raw Data</h1>
                        <OverviewTable
                            data={convertYearDataToGeneric(trendsOverview)}
                        />
                    </div>
                </>
            )}
        </>
    );
};

export default TrendsPage;
