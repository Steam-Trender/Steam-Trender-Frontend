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
                minDate.setMonth(minDate.getMonth() - 2);
                const data = await ApiService.fetchCompetitorOverview(
                    "1000",
                    "2000",
                    "30",
                    minDate,
                    maxDate,
                    [],
                    []
                );
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
            <h1>Trending</h1>
            {competitorOverview && (
                <GamesTable games={competitorOverview.games} />
            )}
        </>
    );
};

export default HomePage;
