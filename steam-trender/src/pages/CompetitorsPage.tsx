import React, { useState } from "react";
import { ICompetitors } from "../models/competitors";
import ApiService from "../api/service";
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

const CompetitorsPage = () => {
    const [reviewsCoeff, setReviewsCoeff] = useState("");
    const [minReviewsThreshold, setMinReviewsThreshold] = useState("");
    const [maxReviewsThreshold, setMaxReviewsThreshold] = useState("");
    const [minYear, setMinYear] = useState(new Date("2020-01-01"));
    const [maxYear, setMaxYear] = useState(new Date("2024-12-31"));
    const [competitorOverview, setCompetitorOverview] =
        useState<ICompetitors | null>(null);
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
    const [bannedTagIds, setBannedTagIds] = useState<number[]>([]);
    const tagsLimit = 10;

    const handleAnalyzeClick = async () => {
        try {
            const data = await ApiService.fetchCompetitorOverview(
                minReviewsThreshold,
                maxReviewsThreshold,
                reviewsCoeff,
                minYear,
                maxYear,
                selectedTagIds,
                bannedTagIds
            );
            setCompetitorOverview(data);
        } catch (error) {
            console.error("Failed to fetch data", error);
        }
    };

    const handleDownload = () => {
        if (competitorOverview === null) {
            return;
        }

        const csvRows = [];

        const headers = Object.keys(
            competitorOverview.games[0]
        ) as (keyof IGame)[];
        csvRows.push(headers.join(";"));

        for (const row of competitorOverview.games) {
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

    const handleMinYearChange = (date: Date | null) => {
        if (date === null) {
            setMinYear(new Date("2020-01-01"));
        } else {
            setMinYear(date);
        }
    };

    const handleMaxYearChange = (date: Date | null) => {
        if (date === null) {
            setMaxYear(new Date("2024-31-12"));
        } else {
            setMaxYear(date);
        }
    };

    return (
        <>
            <div className="row">
                <div className="col-sm-12 col-md-6 pb-2">
                    <label>
                        Included Tags ({selectedTagIds.length}/{tagsLimit})
                    </label>
                    <TagSelector
                        onChange={setSelectedTagIds}
                        placeholder="Any"
                        limit={tagsLimit}
                    />
                </div>
                <div className="col-sm-12 col-md-6 pb-2">
                    <label>
                        Excluded Tags ({bannedTagIds.length}/{tagsLimit})
                    </label>
                    <TagSelector
                        onChange={setBannedTagIds}
                        placeholder="None"
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
                <div className="col-sm-6 col-md-3 pb-2">
                    <div className="row">
                        <div className="col-6 pe-1">
                            <label>Min Date</label>
                            <DatePicker
                                selected={minYear}
                                onChange={handleMinYearChange}
                                dateFormat="yyyy-MM-dd"
                                className="form-control w-100"
                                placeholderText="Min Date"
                            />
                        </div>
                        <div className="col-6 ps-1">
                            <label>Max Date</label>
                            <DatePicker
                                selected={maxYear}
                                onChange={handleMaxYearChange}
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
                    >
                        Analyze
                    </button>
                </div>
            </div>
            {competitorOverview ? (
                <>
                    <div className="row">
                        <h1 className="text-uppercase">Overview</h1>
                        <p>
                            <b>Total Games: </b>
                            <NumberFormatter
                                value={competitorOverview.overview.total_games}
                            />
                            ,<b> Median Revenue: </b>
                            $
                            <NumberFormatter
                                value={getSpecificRevenue(
                                    competitorOverview.overview,
                                    0.5
                                )}
                            />
                            ,<b> Median Reviews: </b>
                            <NumberFormatter
                                value={
                                    competitorOverview.overview.median_reviews
                                }
                            />
                            ,<b> Median Owners: </b>
                            <NumberFormatter
                                value={
                                    competitorOverview.overview.median_owners
                                }
                            />
                            ,<b> Median Launch Price: </b>$
                            {competitorOverview.overview.median_price}
                        </p>
                    </div>
                    <div className="row">
                        <h1 className="text-uppercase">Competitors Table</h1>
                        <div className="col-sm-12 col-md-9 pb-2">
                            <p className="my-0">
                                <i>
                                    NB: only the first 100 games (or less) are
                                    listed below, sorted by the number of
                                    reviews. Nevertheless, all were taken into
                                    account in the calculation of aggregate
                                    values. You can download up to 10 000 rows.
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
                            <GamesTable games={competitorOverview.games} />
                        </div>
                    </div>
                </>
            ) : (
                <div className="row flex-fill align-items-center">
                    <div>
                        <ParametersInfo />
                        <ul>
                            <li>
                                Included Tags (any): Tags that must all be
                                present for a game to be considered in the
                                sample.
                            </li>
                            <li>
                                Excluded Tags (none): Tags that, if present,
                                will exclude a game from the sample (any one is
                                enough for exclusion).
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
                                Min Date (2020-01-01): The earliest release date
                                a game can have to be included.
                            </li>
                            <li>
                                Max Date (2024-12-31): The latest release date a
                                game can have to be included.
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default CompetitorsPage;
