import React, { useState } from "react";
import { ICompetitors } from "../models/competitors";
import ApiService from "../api/service";
import TagSelector from "../components/TagSelector";
import { NumberFormatter } from "../utils/number_formatter";
import { YearDropdown } from "../components/YearsDropdown";
import { IGame } from "../models/game";
import { getSpecificRevenue } from "../models/overview";
import { GamesTable } from "../components/GamesTable";

const CompetitorsPage = () => {
    const [reviewsCoeff, setReviewsCoeff] = useState("");
    const [reviewsThreshold, setReviewsThreshold] = useState("");
    const [minYear, setMinYear] = useState<number | null>(null);
    const [maxYear, setMaxYear] = useState<number | null>(null);
    const [competitorOverview, setCompetitorOverview] =
        useState<ICompetitors | null>(null);
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
    const [bannedTagIds, setBannedTagIds] = useState<number[]>([]);

    const handleAnalyzeClick = async () => {
        if (minYear && maxYear) {
            try {
                const data = await ApiService.fetchCompetitorOverview(
                    reviewsThreshold,
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
        } else {
            alert("Please select both a minimum and maximum year.");
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
        csvRows.push(headers.join(","));

        for (const row of competitorOverview.games) {
            const values = headers.map((header) => {
                const cell = row[header];
                const escaped = ("" + cell).replace(/"/g, "\\\"");
                return `"${escaped}"`;
            });
            csvRows.push(values.join(","));
        }

        const csvString = csvRows.join("\n");

        const blob = new Blob([csvString], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "table_data.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                <div className="form-group col-3">
                    <input
                        type="number"
                        min="1"
                        className="form-control"
                        id="reviewsCoeff"
                        value={reviewsCoeff}
                        onChange={(e) => setReviewsCoeff(e.target.value)}
                        placeholder="Enter Reviews Coefficient"
                    />
                </div>
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
                        onChange={handleMinYearChange}
                        initialLabel="Select Min Year"
                        descending={false}
                    />
                </div>
                <div className="col-3">
                    <YearDropdown
                        onChange={handleMaxYearChange}
                        initialLabel="Select Max Year"
                        descending={true}
                    />
                </div>
            </div>
            <div className="row pt-2">
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
                <div className="col-6">
                    <button
                        className="btn btn-primary w-100 text-uppercase"
                        onClick={handleAnalyzeClick}
                    >
                        Analyze
                    </button>
                </div>
                <div className="col-6">
                    <button
                        className="btn btn-primary w-100 text-uppercase"
                        onClick={handleDownload}
                    >
                        Download
                    </button>
                </div>
            </div>
            {competitorOverview && (
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
                        <p className="my-0">
                            <i>
                                Note: only the first 100 games (or less) are
                                listed below, sorted by the number of reviews,
                                that fit the selected parameters. Nevertheless,
                                all were taken into account in the calculation
                                of aggregate values.
                            </i>
                        </p>
                        <GamesTable games={competitorOverview.games} />
                    </div>
                </>
            )}
        </>
    );
};

export default CompetitorsPage;
