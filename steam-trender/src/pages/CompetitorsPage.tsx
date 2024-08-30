import React, { useEffect } from "react";
import TagSelector from "../components/TagSelector";
import { NumberFormatter } from "../utils/number_formatter";
import { IGame } from "../models/game";
import { getSpecificRevenue } from "../models/overview";
import { GamesTable } from "../components/GamesTable";
import { ReviewsThresholdInput } from "../components/ReviewsThresholdInput";
import { ReviewsCoefficientInput } from "../components/ReviewsCoefficientInput";
import { ITag } from "../models/tag";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ParametersInfo } from "../components/ParametersInfo";
import { useStore } from "../stores/storeContext";
import { observer } from "mobx-react-lite";
import LoadingSpinnder from "../components/LoadingSpinner";

const CompetitorsPage = observer(() => {
    const { competitorsPageStore, tagsStore } = useStore();
    const { competitorsOverview } = competitorsPageStore;

    const tagsLimit = 10;

    useEffect(() => {
        tagsStore.fetchTags();
    }, []);

    const handleAnalyzeClick = async () => {
        await competitorsPageStore.fetchCompetitorsOverview();
    };

    const handleDownload = () => {
        if (competitorsOverview === null) {
            return;
        }

        const csvRows = [];

        const headers = Object.keys(
            competitorsOverview.games[0]
        ) as (keyof IGame)[];
        csvRows.push(headers.join(";"));

        for (const row of competitorsOverview.games) {
            const values = headers.map((header) => {
                let cell = row[header];

                if (header === "tags") {
                    cell = (cell as ITag[]).map((tag) => tag.title).join(",");
                }

                const escaped = ("" + cell).replace(/"/g, "\\\"");
                return `"${escaped}"`;
            });
            csvRows.push(values.join(";"));
        }

        const csvString = csvRows.join("\n");

        const blob = new Blob([csvString], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "steam_trender_competitors_data.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <div className="row">
                <div className="col-sm-12 col-md-6 pb-2">
                    <label>
                        Included Tags (
                        {competitorsPageStore.includedTagIds.length}/{tagsLimit}
                        )
                    </label>
                    <TagSelector
                        onChange={(ids) =>
                            competitorsPageStore.setIncludedTagIds(ids)
                        }
                        placeholder="Any"
                        limit={tagsLimit}
                        tags={tagsStore.tags}
                        selectedTagIds={competitorsPageStore.includedTagIds}
                    />
                </div>
                <div className="col-sm-12 col-md-6 pb-2">
                    <label>
                        Excluded Tags (
                        {competitorsPageStore.excludedTagIds.length}/{tagsLimit}
                        )
                    </label>
                    <TagSelector
                        onChange={(ids) =>
                            competitorsPageStore.setExcludedTagIds(ids)
                        }
                        placeholder="None"
                        limit={tagsLimit}
                        tags={tagsStore.tags}
                        selectedTagIds={competitorsPageStore.excludedTagIds}
                    />
                </div>
            </div>
            <div className="row pb-3">
                <div className="form-group col-sm-6 col-md-3 pb-2">
                    <label>Reviews Coefficient</label>
                    <ReviewsCoefficientInput
                        value={competitorsPageStore.reviewsCoeff}
                        onChange={(value) =>
                            competitorsPageStore.setReviewsCoeff(value)
                        }
                    />
                </div>
                <div className="col-sm-6 col-md-3 pb-2">
                    <div className="row">
                        <div className="form-group col-6 pe-1">
                            <label>Min Reviews</label>
                            <ReviewsThresholdInput
                                value={competitorsPageStore.minReviewsThreshold}
                                onChange={(value) =>
                                    competitorsPageStore.setMinReviewsThreshold(
                                        value
                                    )
                                }
                                max={false}
                            />
                        </div>
                        <div className="form-group col-6 ps-1">
                            <label>Max Reviews</label>
                            <ReviewsThresholdInput
                                value={competitorsPageStore.maxReviewsThreshold}
                                onChange={(value) =>
                                    competitorsPageStore.setMaxReviewsThreshold(
                                        value
                                    )
                                }
                                max={true}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-md-3 pb-2">
                    <div className="row">
                        <div className="col-6 pe-1">
                            <label>Min Date</label>
                            <DatePicker
                                selected={competitorsPageStore.minDate}
                                onChange={(value) =>
                                    competitorsPageStore.setMinDate(value)
                                }
                                dateFormat="yyyy-MM-dd"
                                className="form-control w-100"
                                placeholderText="Min Date"
                            />
                        </div>
                        <div className="col-6 ps-1">
                            <label>Max Date</label>
                            <DatePicker
                                selected={competitorsPageStore.maxDate}
                                onChange={(value) =>
                                    competitorsPageStore.setMaxDate(value)
                                }
                                dateFormat="yyyy-MM-dd"
                                className="form-control w-100"
                                placeholderText="Max Date"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-3 pb-2">
                    <label>Click Here!</label>
                    <button
                        className="btn btn-primary w-100 text-uppercase"
                        onClick={handleAnalyzeClick}
                        disabled={competitorsPageStore.isFetching}
                    >
                        Analyze
                    </button>
                </div>
            </div>
            {competitorsOverview ? (
                <>
                    <div className="row">
                        <h1>Overview</h1>
                        <p>
                            <b>Total Games: </b>
                            <NumberFormatter
                                value={competitorsOverview.overview.total_games}
                            />
                            ,<b> Median Revenue: </b>
                            $
                            <NumberFormatter
                                value={getSpecificRevenue(
                                    competitorsOverview.overview,
                                    0.5
                                )}
                            />
                            ,<b> Median Reviews: </b>
                            <NumberFormatter
                                value={
                                    competitorsOverview.overview.median_reviews
                                }
                            />
                            ,<b> Median Owners: </b>
                            <NumberFormatter
                                value={
                                    competitorsOverview.overview.median_owners
                                }
                            />
                            ,<b> Median Launch Price: </b>$
                            {competitorsOverview.overview.median_price}
                        </p>
                    </div>
                    <div className="row">
                        <h1>Competitors Table</h1>
                        <div className="col-sm-12 col-md-9 pb-2">
                            <p className="my-0">
                                <i>
                                    NB: only the first 100 games (or less) are
                                    listed below, sorted by the number of
                                    reviews. Nevertheless, all were taken into
                                    account in the calculation of aggregate
                                    values. You can download up to 1 000 rows.
                                </i>
                            </p>
                        </div>
                        <div className="col-sm-12 col-md-3 pb-2">
                            <button
                                className="btn btn-outline-primary w-100 text-uppercase"
                                onClick={handleDownload}
                            >
                                Download
                            </button>
                        </div>
                        <div className="col-12">
                            <GamesTable games={competitorsOverview.games} />
                        </div>
                    </div>
                </>
            ) : (
                <div className="row flex-fill align-items-center">
                    {!competitorsPageStore.isFetching ? (
                        <div>
                            <ParametersInfo />
                            <ul>
                                <li>
                                    Included Tags (any): Tags that must{" "}
                                    <b>all</b> be present for a game to be
                                    considered in the sample.
                                </li>
                                <li>
                                    Excluded Tags (none): Tags that, if present,
                                    will exclude a game from the sample (
                                    <b>any</b> one is enough for exclusion).
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
                                    Min Date (2020-01-01): The earliest release
                                    date a game can have to be included.
                                </li>
                                <li>
                                    Max Date (2024-12-31): The latest release
                                    date a game can have to be included.
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

export default CompetitorsPage;
