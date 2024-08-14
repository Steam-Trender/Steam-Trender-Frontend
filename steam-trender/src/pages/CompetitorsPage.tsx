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
    const [minYear, setMinYear] = useState<Date | null>(null);
    const [maxYear, setMaxYear] = useState<Date | null>(null);
    const [competitorOverview, setCompetitorOverview] =
        useState<ICompetitors | null>(null);
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
    const [bannedTagIds, setBannedTagIds] = useState<number[]>([]);

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
        setMinYear(date);
    };

    const handleMaxYearChange = (date: Date | null) => {
        setMaxYear(date);
    };

    return (
        <>
            <div className="row">
                <div className="col-6">
                    <TagSelector
                        onChange={setSelectedTagIds}
                        placeholder="Avaialbe Tags"
                        limit={10}
                    />
                </div>
                <div className="col-6">
                    <TagSelector
                        onChange={setBannedTagIds}
                        placeholder="Banned Tags"
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
                <div className="col-3">
                    <div className="row">
                        <div className="form-group col-6 pe-1">
                            <ReviewsThresholdInput
                                value={minReviewsThreshold}
                                onChange={setMinReviewsThreshold}
                                max={false}
                            />
                        </div>
                        <div className="form-group col-6 ps-1">
                            <ReviewsThresholdInput
                                value={maxReviewsThreshold}
                                onChange={setMaxReviewsThreshold}
                                max={true}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="row">
                        <div className="col-6">
                            <DatePicker
                                selected={minYear}
                                onChange={handleMinYearChange}
                                dateFormat="yyyy-MM-dd"
                                className="form-control"
                                placeholderText="Min Date"
                            />
                        </div>
                        <div className="col-6">
                            <DatePicker
                                selected={maxYear}
                                onChange={handleMaxYearChange}
                                dateFormat="yyyy-MM-dd"
                                className="form-control"
                                placeholderText="Max Date"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-3">
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
                    <div className="row pt-4">
                        <h1>Overview</h1>
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
                    <div className="row pt-2">
                        <h1>Competitors Table</h1>
                        <div className="col-9">
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
                        <div className="col-3">
                            <button
                                className="btn btn-outline-primary w-100 text-uppercase"
                                onClick={handleDownload}
                            >
                                Download
                            </button>
                        </div>
                        <div className="col-12 pt-2">
                            <GamesTable games={competitorOverview.games} />
                        </div>
                    </div>
                </>
            ) : (
                <div className="row flex-fill align-items-center">
                    <div>
                        <ParametersInfo />
                        <ul>
                            <li>Available Tags (all): ...</li>
                            <li>Banned Tags (none): ...</li>
                            <li>Reviews Coeff (30): ...</li>
                            <li>Min Reviews (0): ...</li>
                            <li>Max Reviews (inf): ...</li>
                            <li>Min Date (2020-01-01): ...</li>
                            <li>Max Date (2024-31-12): ...</li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default CompetitorsPage;
