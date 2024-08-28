import React, { useEffect, useState } from "react";
import { Markdown } from "../components/Markdown";
import { GamesTable } from "../components/GamesTable";
import { ICompetitors } from "../models/competitors";
import ApiService from "../api/service";

const HomePage = () => {
    const [competitorOverview, setCompetitorOverview] =
        useState<ICompetitors | null>(null);

    useEffect(() => {
        const fetchCompetitorOverview = async () => {
            try {
                const maxDate = new Date();
                const minDate = new Date();
                minDate.setMonth(maxDate.getMonth() - 2);
                const data = await ApiService.fetchCompetitorsOverview({
                    reviewsCoeff: "30",
                    minReviews: "1000",
                    maxReviews: "2000",
                    minDate: minDate,
                    maxDate: maxDate,
                    includedTags: [],
                    excludedTags: [],
                });
                setCompetitorOverview(data);
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };

        fetchCompetitorOverview();
    }, []);

    return (
        <>
            <Markdown file={"home"} />
            <h2>Trending</h2>
            {competitorOverview && (
                <GamesTable games={competitorOverview.games} />
            )}
        </>
    );
};

export default HomePage;
