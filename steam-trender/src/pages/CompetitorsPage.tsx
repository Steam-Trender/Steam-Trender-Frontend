import React, { useState } from "react";
import { ICompetitors } from "../models/competitors";
import ApiService from "../api/service";
import { TagSelector } from "../components/TagSelector";
import { MoneyFormatter } from "../utils/money_formatter";
import { YearDropdown } from "../components/YearsDropdown";
import { IGame } from "../models/game";

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
                    />
                </div>
                <div className="col-6">
                    <TagSelector
                        onChange={setBannedTagIds}
                        placeholder="Banned Tags"
                    />
                </div>
            </div>
            <div className="row pt-2">
                <div className="col-6">
                    <button
                        className="btn btn-primary w-100"
                        onClick={handleAnalyzeClick}
                    >
                        Analyze
                    </button>
                </div>
                <div className="col-6">
                    <button
                        className="btn btn-primary w-100"
                        onClick={handleDownload}
                    >
                        Download
                    </button>
                </div>
            </div>
            {competitorOverview && (
                <>
                    <div className="row pt-4">
                        <p>
                            <b>Total Games: </b>
                            {competitorOverview.overview.total_games},
                            <b> Median Revenue: </b>
                            {competitorOverview.overview.median_revenue},
                            <b> Median Reviews: </b>
                            {competitorOverview.overview.median_reviews},
                            <b> Median Owners: </b>
                            {competitorOverview.overview.median_owners},
                            <b> Median Launch Price: </b>$
                            {competitorOverview.overview.median_price}
                        </p>
                    </div>
                    <div className="row pt-2">
                        <small>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Reviews Total</th>
                                        <th scope="col">Reviews Score Fancy</th>
                                        <th scope="col">Release Date</th>
                                        <th scope="col">Launch Price</th>
                                        <th scope="col">Tags</th>
                                        <th scope="col">Owners Estimated</th>
                                        <th scope="col">Revenue Estimated</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {competitorOverview.games.map((game) => (
                                        <tr key={game.id}>
                                            <td>
                                                <a
                                                    href={`https://store.steampowered.com/app/${game.appid}`}
                                                >
                                                    {game.title}
                                                </a>
                                            </td>
                                            <td>{game.reviews}</td>
                                            <td>{game.reviews_score}%</td>
                                            <td>{game.release_date}</td>
                                            <td>${game.price}</td>
                                            <td>
                                                {game.tags
                                                    .map((tag) => tag.title)
                                                    .join(", ")}
                                            </td>
                                            <td>{game.owners}</td>
                                            <td>
                                                $
                                                <MoneyFormatter
                                                    value={game.revenue}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </small>
                    </div>
                </>
            )}
        </>
    );
};

export default CompetitorsPage;
