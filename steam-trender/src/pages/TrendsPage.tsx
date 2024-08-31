import React, { useEffect } from "react";
import YearDropdown from "../components/YearsDropdown";
import TagSelector from "../components/TagSelector";
import { OverviewTable } from "../components/OverviewTable";
import { convertYearDataToGeneric } from "../models/generic_overview";
import { MoneyBoxPlot } from "../components/MoneyBoxPlot";
import { RegressionPlot } from "../components/RegressionPlot";
import { getSpecificRevenue, IOverview } from "../models/overview";
import { ReviewsThresholdInput } from "../components/ReviewsThresholdInput";
import { ParametersInfo } from "../components/ParametersInfo";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/storeContext";
import LoadingSpinnder from "../components/LoadingSpinner";

const TrendsPage = observer(() => {
    const { trendsPageStore, tagsStore } = useStore();
    const { trendsOverview } = trendsPageStore;

    const tagsLimit = 10;

    useEffect(() => {
        tagsStore.fetchTags();
    }, []);

    const handleAnalyzeClick = async () => {
        await trendsPageStore.fetchTrendsOverview();
    };

    return (
        <>
            <div className="row pb-3">
                <div className="col-sm-12 col-md-6 pb-2">
                    <label>
                        Included Tags ({trendsPageStore.selectedTagIds.length}/
                        {tagsLimit})
                    </label>
                    <TagSelector
                        onChange={(ids) =>
                            trendsPageStore.setSelectedTagIds(ids)
                        }
                        placeholder="Any"
                        limit={tagsLimit}
                        tags={tagsStore.tags}
                        selectedTagIds={trendsPageStore.selectedTagIds}
                    />
                </div>
                <div className="col-sm-12 col-md-3">
                    <div className="row">
                        <div className="form-group col-sm-12 col-md-6 pb-2">
                            <label>Min Reviews</label>
                            <ReviewsThresholdInput
                                value={trendsPageStore.reviewsThreshold}
                                onChange={(value) =>
                                    trendsPageStore.setReviewsThreshold(value)
                                }
                                max={false}
                            />
                        </div>
                        <div className="col-sm-12 col-md-6 pb-2">
                            <label>Pivot Year</label>
                            <YearDropdown
                                onChange={(year) =>
                                    trendsPageStore.setYear(year)
                                }
                                initialLabel="Pivot Year"
                                isDescending={true}
                                defaultYear={trendsPageStore.year}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-3 pb-2">
                    <label>Click Here!</label>
                    <button
                        className="btn btn-primary text-uppercase w-100"
                        onClick={handleAnalyzeClick}
                        disabled={trendsPageStore.isFetching}
                    >
                        Analyze
                    </button>
                </div>
            </div>
            {trendsOverview ? (
                <>
                    <h1>Overview</h1>
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <h2>Median Revenue</h2>
                            <RegressionPlot
                                categories={trendsOverview.map(
                                    (item: { year: string }) => item.year
                                )}
                                real={trendsOverview.map(
                                    (item: { overview: IOverview }) =>
                                        getSpecificRevenue(item.overview, 0.5)
                                )}
                                trend={trendsOverview.map(
                                    (item: {
                                        regression: { median_revenue: number };
                                    }) => item.regression.median_revenue
                                )}
                                yaxis_title={"Median Revenue"}
                                money={true}
                            />
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <h2>Revenue Box Chart</h2>
                            <MoneyBoxPlot
                                data={convertYearDataToGeneric(trendsOverview)}
                            />
                        </div>
                    </div>
                    <div className="row pt-3">
                        <div className="col-sm-12 col-md-6">
                            <h2>Game Released</h2>
                            <RegressionPlot
                                categories={trendsOverview.map(
                                    (item: { year: string }) => item.year
                                )}
                                real={trendsOverview.map(
                                    (item: {
                                        overview: { total_games: number };
                                    }) => item.overview.total_games
                                )}
                                trend={null}
                                yaxis_title={"Games"}
                                money={false}
                            />
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <h2>Median Reviews</h2>
                            <RegressionPlot
                                categories={trendsOverview.map(
                                    (item: { year: string }) => item.year
                                )}
                                real={trendsOverview.map(
                                    (item: {
                                        overview: { median_reviews: number };
                                    }) => item.overview.median_reviews
                                )}
                                trend={trendsOverview.map(
                                    (item: {
                                        regression: { median_reviews: number };
                                    }) => item.regression.median_reviews
                                )}
                                yaxis_title={"Median Reviews"}
                                money={false}
                            />
                        </div>
                    </div>
                    <div className="row pt-3">
                        <div className="col-sm-12 col-md-6">
                            <h2>Median Owners</h2>
                            <RegressionPlot
                                categories={trendsOverview.map(
                                    (item: { year: string }) => item.year
                                )}
                                real={trendsOverview.map(
                                    (item: {
                                        overview: { median_owners: number };
                                    }) => item.overview.median_owners
                                )}
                                trend={trendsOverview.map(
                                    (item: {
                                        regression: { median_owners: number };
                                    }) => item.regression.median_owners
                                )}
                                yaxis_title={"Median Owners"}
                                money={false}
                            />
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <h2>Median Price</h2>
                            <RegressionPlot
                                categories={trendsOverview.map(
                                    (item: { year: string }) => item.year
                                )}
                                real={trendsOverview.map(
                                    (item: {
                                        overview: { median_price: number };
                                    }) => item.overview.median_price
                                )}
                                trend={trendsOverview.map(
                                    (item: {
                                        regression: { median_price: number };
                                    }) => item.regression.median_price
                                )}
                                yaxis_title={"Median Price"}
                                money={true}
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
                    {!trendsPageStore.isFetching ? (
                        <div>
                            <ParametersInfo />
                            <ul>
                                <li>
                                    Included Tags (any): Tags that must{" "}
                                    <b>all</b> be present for a game to be
                                    considered in the sample.
                                </li>
                                <li>
                                    Min Reviews (10): The minimum number of
                                    reviews required for a game to be
                                    considered.
                                </li>
                                <li>
                                    Pivot Year (2024)
                                    <span className="text-primary fw-bold">
                                        *
                                    </span>
                                    : trends <b>5 years back</b> from that year
                                    will be calculated, e.g. if you select 2023,
                                    years: 2019, 2020, 2021, 2022 & 2023 will be
                                    taken into account and{" "}
                                    <b>
                                        each year has an own review multiplier
                                    </b>
                                    .
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <LoadingSpinnder />
                    )}
                </div>
            )}
        </>
    );
});

export default TrendsPage;
