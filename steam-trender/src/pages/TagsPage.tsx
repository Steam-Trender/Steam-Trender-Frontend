import React, { useEffect } from "react";
import TagSelector from "../components/TagSelector";
import YearDropdown from "../components/YearsDropdown";
import { MoneyBoxPlot } from "../components/MoneyBoxPlot";
import { OverviewTable } from "../components/OverviewTable";
import { convertTagDataToGeneric } from "../models/generic_overview";
import CombinedChart from "../components/CombinedPlot";
import { ReviewsCoefficientInput } from "../components/ReviewsCoefficientInput";
import { ReviewsThresholdInput } from "../components/ReviewsThresholdInput";
import { ParametersInfo } from "../components/ParametersInfo";
import { useStore } from "../stores/storeContext";
import { observer } from "mobx-react-lite";
import LoadingSpinnder from "../components/LoadingSpinner";

const TagsPage = observer(() => {
    const { tagsPageStore, tagsStore } = useStore();
    const { tagsOverview } = tagsPageStore;

    const tagsLimit = 10;

    useEffect(() => {
        tagsStore.fetchTags();
    }, []);

    const handleAnalyzeClick = async () => {
        await tagsPageStore.fetchTagsOverview();
    };

    return (
        <>
            <div className="row pb-2">
                <div className="col-12">
                    <label>
                        Tags<span className="text-primary fw-bold">*</span> (
                        {tagsPageStore.selectedTagIds.length}/{tagsLimit})
                    </label>
                    <TagSelector
                        onChange={(ids) => tagsPageStore.setSelectedTagIds(ids)}
                        placeholder="Tags"
                        limit={tagsLimit}
                        tags={tagsStore.tags}
                        selectedTagIds={tagsPageStore.selectedTagIds}
                    />
                </div>
            </div>
            <div className="row">
                <div className="form-group col-sm-6 col-md-3 pb-2">
                    <label>Reviews Coefficient</label>
                    <ReviewsCoefficientInput
                        value={tagsPageStore.reviewsCoeff}
                        onChange={(value) =>
                            tagsPageStore.setReviewsCoeff(value)
                        }
                    />
                </div>
                <div className="col-sm-6 col-md-3 pb-2">
                    <div className="row">
                        <div className="form-group col-6 pe-1">
                            <label>Min Reviews</label>
                            <ReviewsThresholdInput
                                value={tagsPageStore.minReviewsThreshold}
                                onChange={(value) =>
                                    tagsPageStore.setMinReviewsThreshold(value)
                                }
                                max={false}
                            />
                        </div>
                        <div className="form-group col-6 ps-1">
                            <label>Max Reviews</label>
                            <ReviewsThresholdInput
                                value={tagsPageStore.maxReviewsThreshold}
                                onChange={(value) =>
                                    tagsPageStore.setMaxReviewsThreshold(value)
                                }
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
                                onChange={(year) =>
                                    tagsPageStore.setMinYear(year)
                                }
                                initialLabel="Min Year"
                                isDescending={false}
                                defaultYear={2020}
                            />
                        </div>
                        <div className="col-6 ps-1">
                            <label>Max Year</label>
                            <YearDropdown
                                onChange={(year) =>
                                    tagsPageStore.setMaxYear(year)
                                }
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
                        disabled={tagsPageStore.isFetching}
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
                    {!tagsPageStore.isFetching ? (
                        <div>
                            <ParametersInfo />
                            <ul>
                                <li>
                                    Tags (none)
                                    <span className="text-primary fw-bold">
                                        *
                                    </span>
                                    : Select multiple tags to compare trends
                                    across different categories, each one will
                                    be analyzed individually.
                                </li>
                                <li>
                                    Reviews Coefficient (30): The multiplier
                                    applied to the number of reviews to estimate
                                    a game&apos;s revenue.
                                </li>
                                <li>
                                    Min Reviews (10): The minimum number of
                                    reviews required for a game to be
                                    considered.
                                </li>
                                <li>
                                    Max Reviews (inf): The maximum number of
                                    reviews allowed for a game to be considered.
                                </li>
                                <li>
                                    Min Year (2020): The earliest release year a
                                    game can have to be included.
                                </li>
                                <li>
                                    Max Year (2024): The latest release year a
                                    game can have to be included.
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

export default TagsPage;
